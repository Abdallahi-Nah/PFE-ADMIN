const cloudinary = require("../configs/cloudinary");
const bcrypt = require("bcryptjs");
const factory = require("./handlersFactory");
const ApiError = require("../utils/ApiErrors.utils");
const Etudiant = require("../models/etudiant.model");
const ContratPedagogique = require("../models/contratPedagogique.model");
const Module = require("../models/module.model");
const Matiere = require("../models/matiere.model");
const sendEmail = require("../utils/sendEmail"); 

exports.setSpecialiteIdToBody = (req, res, next) => {
  // Nested route
  if (!req.body.specialite) req.body.specialite = req.params.specialiteId;
  next();
};

// exports.createEtudiant = factory.createOne(Etudiant, "Etudiant");

exports.createEtudiant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Aucune image de profil n'est fournie",
      });
    }

    const etudiantData = {
      ...req.body,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "etudiants" },
      async (error, result) => {
        if (error || !result) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({
            success: false,
            message: "Échec de l'upload de l'image",
          });
        }

        etudiantData.profileImg = result.secure_url;

        try {
          // Génération du mot de passe
          const password = Math.floor(
            100000 + Math.random() * 900000
          ).toString();
          const hashedPassword = await bcrypt.hash(password, 10);

          etudiantData.motDePasse = hashedPassword;
          etudiantData.role = "etudiant";
          etudiantData.emailUniv = `${etudiantData.nom}.${etudiantData.prenom}@etu.fst-univ.mr`;

          const newEtudiant = await Etudiant.create(etudiantData);

          // Récupérer les modules et matières selon la spécialité
          const modules = await Module.find({
            specialite: newEtudiant.specialite,
          });
          const modulesIds = modules.map((m) => m._id);

          let matieresIds = [];
          for (const moduleId of modulesIds) {
            const matieres = await Matiere.find({ module: moduleId });
            matieresIds.push(...matieres.map((m) => m._id));
          }

          // Créer contrat pédagogique
          await ContratPedagogique.create({
            specialite: newEtudiant.specialite,
            etudiant: newEtudiant._id,
            matieresAValides: matieresIds,
          });

          const message = `Objet : Création de votre compte étudiant - Plateforme Universitaire \n \n
Cher(e) étudiant(e), \n
Votre compte sur la plateforme universitaire a été créé avec succès. \n \n 

Identifiants de connexion :

Adresse e-mail universitaire : ${newEtudiant.emailUniv}
Mot de passe : ${password}

Pour toute assistance, contactez l'équipe technique.

Cordialement,
Service Informatique - Faculté des Sciences et Techniques`;

          await sendEmail({
            email: newEtudiant.email,
            subject: "Plateforme Universitaire - Email et Mot de passe",
            message,
          });

          res.status(201).json({
            success: true,
            message: "Étudiant créé avec succès",
            data: newEtudiant,
          });
        } catch (err) {
          console.error("Erreur création étudiant:", err);
          res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement de l'étudiant",
          });
        }
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Erreur générale :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.specialiteId) {
    filterObject = { specialite: req.params.specialiteId };
  }
  req.filterObj = filterObject;
  next();
};

exports.getEtudiants = factory.getAll(Etudiant);

exports.getEtudiant = factory.getOne(Etudiant);

// exports.updateEtudiant = asyncHandler(async (req, res, next) => {
//   // 1. Récupérer l'étudiant avant modification pour vérifier si la spécialité change
//   const oldEtudiant = await Etudiant.findById(req.params.id);

//   // 2. Mettre à jour l'étudiant
//   const document = await Etudiant.findByIdAndUpdate(
//     req.params.id,
//     {
//       nom: req.body.nom,
//       prenom: req.body.prenom,
//       email: req.body.email,
//       telephone: req.body.telephone,
//       adresse: req.body.adresse,
//       dateNaissance: req.body.dateNaissance,
//       profileImg: req.body.profileImg,
//       matricule: req.body.matricule,
//       specialite: req.body.specialite, // Ajout du champ specialite
//       role: "etudiant"
//     },
//     { new: true }
//   );

//   if (!document) {
//     return next(new ApiError(`No document for this id ${req.params.id}`, 404));
//   }

//   // 3. Vérifier si la spécialité a été modifiée
//   if (req.body.specialite && oldEtudiant.specialite.toString() !== req.body.specialite) {
//     // 4. Trouver le contrat pédagogique existant
//     const contrat = await ContratPedagogique.findOne({ etudiant: req.params.id });

//     if (contrat) {
//       // 5. Récupérer les nouveaux modules et matières pour la nouvelle spécialité
//       const modules = await Module.find({ specialite: req.body.specialite });
//       const modulesIds = modules.map(module => module._id);

//       let matieresIds = [];
//       for (const moduleId of modulesIds) {
//         const matieres = await Matiere.find({ module: moduleId });
//         matieresIds.push(...matieres.map(matiere => matiere._id));
//       }

//       // 6. Mettre à jour le contrat pédagogique
//       contrat.specialite = req.body.specialite;
//       contrat.matieresAValides = matieresIds;
//       await contrat.save();

//       console.log('Contrat pédagogique mis à jour avec les nouvelles matières');
//     } else {
//       // 7. Si aucun contrat existant, en créer un nouveau (comme dans createOne)
//       const modules = await Module.find({ specialite: req.body.specialite });
//       const modulesIds = modules.map(module => module._id);

//       let matieresIds = [];
//       for (const moduleId of modulesIds) {
//         const matieres = await Matiere.find({ module: moduleId });
//         matieresIds.push(...matieres.map(matiere => matiere._id));
//       }

//       await ContratPedagogique.create({
//         specialite: req.body.specialite,
//         etudiant: req.params.id,
//         matieresAValides: matieresIds
//       });

//       console.log('Nouveau contrat pédagogique créé');
//     }
//   }

//   res.status(200).json({ data: document });
// });

exports.updateEtudiant = async (req, res, next) => {
  try {
    const etudiantId = req.params.id;
    const oldEtudiant = await Etudiant.findById(etudiantId);
    if (!oldEtudiant) {
      return next(new ApiError(`Aucun étudiant avec l'id ${etudiantId}`, 404));
    }

    const updateData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      adresse: req.body.adresse,
      dateNaissance: req.body.dateNaissance,
      matricule: req.body.matricule,
      specialite: req.body.specialite,
      role: "etudiant",
    };

    const updateEtudiantInDB = async () => {
      const document = await Etudiant.findByIdAndUpdate(
        etudiantId,
        updateData,
        { new: true }
      );

      if (!document) {
        return next(
          new ApiError(`Aucun document pour l'id ${etudiantId}`, 404)
        );
      }

      if (
        req.body.specialite &&
        oldEtudiant.specialite.toString() !== req.body.specialite
      ) {
        const contrat = await ContratPedagogique.findOne({
          etudiant: etudiantId,
        });

        const modules = await Module.find({ specialite: req.body.specialite });
        const modulesIds = modules.map((m) => m._id);

        let matieresIds = [];
        for (const moduleId of modulesIds) {
          const matieres = await Matiere.find({ module: moduleId });
          matieresIds.push(...matieres.map((m) => m._id));
        }

        if (contrat) {
          contrat.specialite = req.body.specialite;
          contrat.matieresAValides = matieresIds;
          await contrat.save();
          console.log("Contrat pédagogique mis à jour");
        } else {
          await ContratPedagogique.create({
            specialite: req.body.specialite,
            etudiant: etudiantId,
            matieresAValides: matieresIds,
          });
          console.log("Nouveau contrat pédagogique créé");
        }
      }

      res.status(200).json({ data: document });
    };

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "etudiants" },
        async (error, result) => {
          if (error || !result) {
            console.error("Cloudinary error:", error);
            return res.status(500).json({
              success: false,
              message: "Erreur lors de l'upload de l'image",
            });
          }

          updateData.profileImg = result.secure_url;
          await updateEtudiantInDB();
        }
      );

      uploadStream.end(req.file.buffer);
    } else {
      await updateEtudiantInDB();
    }
  } catch (error) {
    console.error("Erreur updateEtudiant :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteEtudiant = factory.deleteOne(Etudiant, "Etudiant");

// Students Enrolled Courses With Lecture Links
// export const userEnrolledCourses = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const userData = await User.findById(userId).populate("enrolledCourses");

//     if (!userData) {
//       return res.json({ success: false, message: "User Not Found" });
//     }

//     res.json({ success: true, enrolledCourses: userData.enrolledCourses });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// Update Student Course Progress
// export const updateUserCourseProgress = async (req, res) => {
//   try {
//     const userId = req.auth.userId;
//     const { courseId, lectureId } = req.body;

//     const progressData = await CourseProgress.findOne({ userId, courseId });

//     if (progressData) {
//       if (progressData.lectureCompleted.includes(lectureId)) {
//         return res.json({
//           success: true,
//           message: "Lecture already completed",
//         });
//       }

//       progressData.lectureCompleted.push(lectureId);
//       await progressData.save();
//     } else {
//       await CourseProgress.create({
//         userId,
//         courseId,
//         lectureCompleted: [lectureId],
//       });
//     }

//     res.json({ success: true, message: "Progress Updated" });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// get Student Course Progress

exports.getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add student ratings to course
// export const addUserRating = async (req, res) => {
//   const userId = req.auth.userId;
//   const { courseId, rating } = req.body;

//   if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
//     return res.json({ success: false, message: "Invalid Details" });
//   }

//   try {
//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.json({ success: false, message: "Course not found" });
//     }

//     const user = await User.findById(userId);

//     if (!user || !user.enrolledCourses.includes(courseId)) {
//       return res.json({
//         success: false,
//         message: "User has not purchased this course",
//       });
//     }

//     const existingRatingIndex = course.courseRatings.findIndex(
//       (r) => r.userId === userId
//     );

//     if (existingRatingIndex > -1) {
//       course.courseRatings[existingRatingIndex].rating = rating;
//     } else {
//       course.courseRatings.push({ userId, rating });
//     }

//     await course.save();

//     return res.json({ success: true, message: "Rating Added" });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };
