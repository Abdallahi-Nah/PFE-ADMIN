const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const factory = require("./handlersFactory");
const ApiError = require("../utils/ApiErrors.utils");
const createToken = require("../utils/createToken");
const Enseignant = require("../models/enseignant.model");
const Course = require("../models/Course.js");
const cloudinary = require("../configs/cloudinary");
const sendEmail = require("../utils/sendEmail");

exports.getEnseignants = factory.getAll(Enseignant);

exports.getEnseignant = factory.getOne(Enseignant);

exports.createEnseignant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Aucune image de profil n'est fournie",
      });
    }

    const enseignantData = {
      ...req.body,
    };

    // Upload Cloudinary SANS await ici
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "enseignants" },
      async (error, result) => {
        if (error || !result) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({
            success: false,
            message: "Échec de l'upload de l'image",
          });
        }

        // Si résultat Cloudinary reçu
        enseignantData.profileImg = result.secure_url;

        try {
          const newEnseignant = await Enseignant.create(enseignantData);

          // generate password
          const password = Math.floor(
            100000 + Math.random() * 900000
          ).toString();
          const hashedPassword = await bcrypt.hash(password, 10);

          newEnseignant.motDePasse = hashedPassword;
          newEnseignant.role = "enseignant";

          newEnseignant.emailUniv = `${newEnseignant.nom}.${newEnseignant.prenom}@fst-univ.mr`;

          await newEnseignant.save();

          const message = `Objet : Création de votre compte enseignant - Plateforme Universitaire \n \n
Cher(e) enseignant(e), \n
Votre compte sur la plateforme universitaire a été créé avec succès. \n \n 

Vous trouverez ci-dessous vos identifiants de connexion :

Adresse e-mail universitaire : ${newEnseignant.emailUniv}
\n
Mot de passe  : ${password}
\n \n
Pour toute assistance, n'hésitez pas à contacter l'équipe technique.

Cordialement,\n
Service Informatique - Faculté des Sciences et Techniques`;
          await sendEmail({
            email: newEnseignant.email,
            subject: "Plateforme Universitaire - Email et Mot de passe",
            message,
          });

          res.status(201).json({
            success: true,
            message: "Enseignant créé avec succès",
            data: newEnseignant,
          });
        } catch (err) {
          console.error("Erreur création enseignant:", err);
          res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement",
          });
        }
      }
    );

    // Très important : appeler .end()
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("❌ Erreur générale :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateEnseignant = async (req, res) => {
  try {
    // On récupère l'id du doc à mettre à jour
    const enseignantId = req.params.id;

    // Données à mettre à jour (extraites du body)
    const {
      nom,
      prenom,
      email,
      telephone,
      adresse,
      dateNaissance,
      diplomes,
      specialite,
      anneesExperience,
      matieresEnseignes,
      disponibilites,
      preferencesPedagogiques,
    } = req.body;

    // Objet update de base sans image pour l'instant
    const updateData = {
      nom,
      prenom,
      email,
      telephone,
      adresse,
      dateNaissance,
      diplomes: Array.isArray(diplomes) ? diplomes : [diplomes],
      specialite,
      anneesExperience,
      matieresEnseignes: Array.isArray(matieresEnseignes)
        ? matieresEnseignes
        : [matieresEnseignes],
      disponibilites,
      preferencesPedagogiques,
      role: "enseignant",
    };

    if (req.file) {
      // Si une nouvelle image est envoyée, upload sur Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "enseignants" },
        async (error, result) => {
          if (error || !result) {
            console.error("❌ Cloudinary error:", error);
            return res.status(500).json({
              success: false,
              message: "Échec de l'upload de l'image",
            });
          }

          // Mettre à jour l'URL de l'image dans les données
          updateData.profileImg = result.secure_url;

          // Mettre à jour dans la base
          try {
            const updatedEnseignant = await Enseignant.findByIdAndUpdate(
              enseignantId,
              updateData,
              { new: true }
            );

            if (!updatedEnseignant) {
              return res.status(404).json({
                success: false,
                message: `Aucun enseignant avec cet id ${enseignantId}`,
              });
            }

            res.status(200).json({
              success: true,
              message: "Enseignant mis à jour avec succès",
              data: updatedEnseignant,
            });
          } catch (err) {
            console.error("❌ Erreur update enseignant:", err);
            res.status(500).json({
              success: false,
              message: "Erreur lors de la mise à jour",
            });
          }
        }
      );

      // Lance l'upload Cloudinary avec buffer
      uploadStream.end(req.file.buffer);
    } else {
      // Pas d'image, on update directement
      const updatedEnseignant = await Enseignant.findByIdAndUpdate(
        enseignantId,
        updateData,
        { new: true }
      );

      if (!updatedEnseignant) {
        return res.status(404).json({
          success: false,
          message: `Aucun enseignant avec cet id ${enseignantId}`,
        });
      }

      res.status(200).json({
        success: true,
        message: "Enseignant mis à jour avec succès",
        data: updatedEnseignant,
      });
    }
  } catch (error) {
    console.error("❌ Erreur générale update :", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.changeEnseignantPassword = asyncHandler(async (req, res, next) => {
  const document = await Enseignant.findByIdAndUpdate(
    req.params.id,
    {
      motDePasse: await bcrypt.hash(req.body.motDePasse, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.deleteEnseignant = factory.deleteOne(Enseignant);

exports.getLoggedEnseignantData = asyncHandler(async (req, res, next) => {
  req.params.id = req.enseignant._id;
  next();
});

exports.updateLoggedEnseignantPassword = asyncHandler(
  async (req, res, next) => {
    // 1) Update user password based user payload (req.enseignant._id)
    const enseignant = await Enseignant.findByIdAndUpdate(
      req.enseignant._id,
      {
        motDePasse: await bcrypt.hash(req.body.motDePasse, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      }
    );

    // 2) Generate token
    const token = createToken(enseignant._id);

    res.status(200).json({ data: enseignant, token });
  }
);

exports.deactivateLoggedEnseignant = asyncHandler(async (req, res, next) => {
  const enseignant = await Enseignant.findByIdAndUpdate(
    req.enseignant._id,
    { active: false },
    { new: true }
  );
  if (!enseignant) {
    return next(new ApiError("Pas d'enseignant", 404));
  }
  const token = createToken(enseignant._id);

  res.status(200).json({
    message: "enseignant desactivèe avec succèe",
    data: enseignant,
    token,
  });
});

exports.activateLoggedEnseignant = asyncHandler(async (req, res, next) => {
  const enseignant = await Enseignant.findByIdAndUpdate(
    req.enseignant._id,
    { active: true },
    { new: true }
  );
  if (!enseignant) {
    return next(new ApiError("Pas d'enseignant", 404));
  }
  const token = createToken(enseignant._id);

  res.status(200).json({
    message: "enseignant activateè avec succèe",
    data: enseignant,
    token,
  });
});

// Get Educator Courses

exports.addCourse = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Thumbnail Not Attached" });
    }

    // Utilisez directement req.body si vous envoyez en form-data
    const courseData = {
      ...req.body,
      educator: "6807995415366c19744d377a", // À remplacer par l'ID dynamique plus tard
    };

    // Upload image to Cloudinary from buffer
    const imageUpload = await cloudinary.uploader
      .upload_stream({ resource_type: "image" }, async (error, result) => {
        if (error) {
          console.error("❌ Cloudinary upload error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Image upload failed" });
        }

        courseData.courseThumbnail = result.secure_url;
        const newCourse = await Course.create(courseData);

        res.status(201).json({
          success: true,
          message: "Cours ajouté",
          courseId: newCourse._id,
        });
      })
      .end(req.file.buffer);
  } catch (error) {
    console.error("❌ Error in addCourse:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEducatorCourses = async (req, res) => {
  try {
    const educator = "6807995415366c19744d377a";

    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
