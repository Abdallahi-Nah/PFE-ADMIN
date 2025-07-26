// import { DriveFolderUploadOutlined } from "@mui/icons-material";
// import "./NewStudent.scss";
// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../../context/AppContext";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const NewStudent = () => {
//   const [file, setFile] = useState(null);
//   const { backendUrl, specialities, fetchSpecialities, fetchEtudiants } =
//     useContext(AppContext);
//   const navigate = useNavigate();
//   const param = useParams();

//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     telephone: "",
//     adresse: "",
//     dateNaissance: "",
//     specialite: "",
//     matricule: "",
//     profileImg: "",
//   });

//   const getStudent = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/etudiant/get/${param.idStud}`);
//       const student = res.data.data;

//       setFormData({
//         nom: student.nom || "",
//         prenom: student.prenom || "",
//         email: student.email || "",
//         telephone: student.telephone || "",
//         adresse: student.adresse || "",
//         dateNaissance: student.dateNaissance?.substring(0, 10) || "",
//         specialite: student.specialite?._id || "",
//         matricule: student.matricule || "",
//         profileImg: student.profileImg || "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setFormData((prev) => ({ ...prev, profileImg: selectedFile }));
//   };

//   const handleAddNewStudent = async () => {
//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) data.append(key, value);
//       });
//       if (file) data.append("profileImg", file);

//       const res = await axios.post(`${backendUrl}/etudiant/create`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         await fetchEtudiants();
//         navigate("/admin/student");
//       } else {
//         alert("Échec de l'enregistrement");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(`Erreur: ${error.response?.data?.message || "Erreur inconnue"}`);
//     }
//   };

//   const handleUpdateStudent = async () => {
//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value) data.append(key, value);
//       });
//       if (file) data.append("profileImg", file);

//       const res = await axios.put(
//         `${backendUrl}/etudiant/update/${param.idStud}`,
//         data,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res.data.success) {
//         await fetchEtudiants();
//         navigate("/admin/student");
//       } else {
//         alert("Échec de la mise à jour");
//       }
//     } catch (error) {
//       console.error(error);
//       alert(`Erreur: ${error.response?.data?.message || "Erreur inconnue"}`);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.nom ||
//       !formData.prenom ||
//       !formData.email ||
//       !formData.specialite ||
//       !formData.matricule
//     ) {
//       alert("Merci de remplir tous les champs obligatoires");
//       return;
//     }

//     if (param.idStud) {
//       await handleUpdateStudent();
//     } else {
//       await handleAddNewStudent();
//     }
//   };

//    useEffect(() => {
//      fetchSpecialities();
//      if (param.idStud) getStudent();
//    }, [param.idStud]);

//   // return (
//   //   <div className="new">
//   //     <div className="newContainer">
//   //       <div className="top">
//   //         <h1>Ajouter ou Modifier un étudiant</h1>
//   //       </div>
//   //       <div className="bottom">
//   //         <div className="imageContainer">
//   //           <img
//   //             src={file ? URL.createObjectURL(file) : "/images/teaher-1.jpg"}
//   //             alt="student"
//   //             className="image"
//   //           />
//   //           <div className="uploadSection">
//   //             <label htmlFor="file">
//   //               <DriveFolderUploadOutlined
//   //                 className="icon"
//   //                 style={{
//   //                   cursor: "pointer",
//   //                 }}
//   //               />
//   //             </label>
//   //             <input
//   //               type="file"
//   //               id="file"
//   //               style={{ display: "none" }}
//   //               onChange={(e) => setFile(e.target.files[0])}
//   //             />
//   //           </div>
//   //         </div>

//   //         <div className="formContainer">
//   //           <form>
//   //             <div className="formInput">
//   //               <label htmlFor="nom">Nom</label>
//   //               <input type="text" id="nom" placeholder="Diallo" />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="prenom">Prenom</label>
//   //               <input type="text" id="prenom" placeholder="Moussa" />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="email">Email</label>
//   //               <input
//   //                 type="email"
//   //                 id="email"
//   //                 placeholder="moussa.diallo@univ.edu"
//   //               />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="tel">Téléphone</label>
//   //               <input type="text" id="tel" placeholder="22123456789" />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="address">Adresse</label>
//   //               <input
//   //                 type="text"
//   //                 id="address"
//   //                 placeholder="Al jedide, Boutilimitt"
//   //               />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="dateNaissance">Date Naissance</label>
//   //               <input
//   //                 type="text"
//   //                 id="dateNaissance"
//   //                 placeholder="1999-05-15"
//   //               />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="speciality">Spécialité</label>
//   //               <input
//   //                 type="text"
//   //                 id="speciality"
//   //                 placeholder="Mathématiques"
//   //               />
//   //             </div>
//   //             <div className="formInput">
//   //               <label htmlFor="matricule">Matricule</label>
//   //               <input type="text" id="matricule" placeholder="C16655" />
//   //             </div>
//   //             <div
//   //               style={{
//   //                 gridColumn: "1 / -1",
//   //                 display: "flex",
//   //                 justifyContent: "center",
//   //                 marginTop: "20px",
//   //               }}
//   //             >
//   //               <button type="submit">Enregistrer</button>
//   //             </div>
//   //           </form>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//    return (
//      <div className="new">
//        <div className="newContainer">
//          <div className="top">
//            <h1>
//              {param.idStud ? "Modifier un étudiant" : "Ajouter un étudiant"}
//            </h1>
//          </div>
//          <div className="bottom">
//            <div className="imageContainer">
//              <img
//                src={
//                  file
//                    ? URL.createObjectURL(file)
//                    : formData.profileImg
//                    ? formData.profileImg
//                    : "/images/teaher-1.jpg"
//                }
//                alt="student"
//                className="image"
//              />
//              <div className="uploadSection">
//                <label htmlFor="file">
//                  <DriveFolderUploadOutlined
//                    className="icon"
//                    style={{ cursor: "pointer" }}
//                  />
//                </label>
//                <input
//                  type="file"
//                  id="file"
//                  style={{ display: "none" }}
//                  onChange={handleFileChange}
//                />
//              </div>
//            </div>

//            <div className="formContainer">
//              <form onSubmit={handleSubmit}>
//                {[
//                  { name: "nom", placeholder: "Diallo" },
//                  { name: "prenom", placeholder: "Moussa" },
//                  {
//                    name: "email",
//                    placeholder: "moussa.diallo@univ.edu",
//                    type: "email",
//                  },
//                  { name: "telephone", placeholder: "22123456789" },
//                  { name: "adresse", placeholder: "Nouakchott" },
//                  { name: "dateNaissance", type: "date" },
//                  { name: "matricule", placeholder: "C12345" },
//                ].map(({ name, type = "text", placeholder }) => (
//                  <div className="formInput" key={name}>
//                    <label htmlFor={name}>
//                      {name.charAt(0).toUpperCase() + name.slice(1)}
//                    </label>
//                    <input
//                      type={type}
//                      name={name}
//                      value={formData[name]}
//                      onChange={handleChange}
//                      placeholder={placeholder}
//                    />
//                  </div>
//                ))}

//                <div className="formInput">
//                  <label htmlFor="specialite">Spécialité</label>
//                  <select
//                    name="specialite"
//                    value={formData.specialite}
//                    onChange={handleChange}
//                  >
//                    <option value="">-- Choisir une spécialité --</option>
//                    {specialities.map((spec) => (
//                      <option key={spec._id} value={spec._id}>
//                        {spec.nom}
//                      </option>
//                    ))}
//                  </select>
//                </div>

//                <div
//                  style={{
//                    gridColumn: "1 / -1",
//                    display: "flex",
//                    justifyContent: "center",
//                    marginTop: "20px",
//                  }}
//                >
//                  <button type="submit">Enregistrer</button>
//                </div>
//              </form>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
// };

// export default NewStudent;

import React, { useState, useEffect, useContext } from "react";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import "./NewStudent.scss";

const NewStudent = () => {
  const { backendUrl, specialities, fetchSpecialities, fetchEtudiants } =
    useContext(AppContext);
  const navigate = useNavigate();
  const param = useParams();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    dateNaissance: "",
    specialite: "",
    matricule: "",
    profileImg: "",
  });

  console.log("form data : ", formData);

  useEffect(() => {
    fetchSpecialities();
    if (param.idStud) {
      axios
        .get(`${backendUrl}/etudiant/get/${param.idStud}`)
        .then((res) => {
          const s = res.data.data;
          setFormData({
            nom: s.nom || "",
            prenom: s.prenom || "",
            email: s.email || "",
            telephone: s.telephone || "",
            adresse: s.adresse || "",
            dateNaissance: s.dateNaissance
              ? s.dateNaissance.slice(0, 10)
              : "",
            specialite: s.specialite || "",
            matricule: s.matricule || "",
            profileImg: s.profileImg || "",
          });
        })
        .catch(console.error);
    }
  }, [param.idStud]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setFormData((p) => ({ ...p, profileImg: f }));
  };

  const submitForm = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v && k !== "profileImg") data.append(k, v);
      });
      if (file) data.append("profileImg", file);

      const res = param.idStud
        ? await axios.put(
            `${backendUrl}/etudiant/update/${param.idStud}`,
            data,
            { headers: { "Content-Type": "multipart/form-data" } }
          )
        : await axios.post(`${backendUrl}/etudiant/create`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (res.data && Object.keys(res.data).length > 0) {
        await fetchEtudiants();
        navigate("/admin/student");
      } else {
        alert(
          param.idStud ? "Échec de la mise à jour" : "Échec de l'enregistrement"
        );
      }
    } catch (err) {
      alert(`Erreur: ${err.response?.data?.message || "Erreur inconnue"}`);
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.specialite ||
      !formData.matricule
    ) {
      alert("Merci de remplir tous les champs obligatoires");
      return;
    }
    submitForm();
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>
            {param.idStud ? "Modifier un étudiant" : "Ajouter un étudiant"}
          </h1>
        </div>
        <div className="bottom">
          <div className="imageContainer">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : formData.profileImg || "/images/teaher-1.jpg"
              }
              alt="teacher"
              className="image"
            />
            <div className="uploadSection">
              <label htmlFor="file">
                <DriveFolderUploadOutlined
                  className="icon"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                name="profileImg"
              />
            </div>
          </div>
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              {[
                { name: "nom", placeholder: "Diallo" },
                { name: "prenom", placeholder: "Moussa" },
                {
                  name: "email",
                  placeholder: "moussa.diallo@univ.edu",
                  type: "email",
                },
                { name: "telephone", placeholder: "22123456789" },
                { name: "adresse", placeholder: "Nouakchott" },
                { name: "dateNaissance", type: "date" },
                { name: "matricule", placeholder: "C12345" },
              ].map(({ name, type = "text", placeholder }) => (
                <div className="formInput" key={name}>
                  <label htmlFor={name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label htmlFor="specialite">Spécialité</label>
                <select
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleChange}
                >
                  <option value="">-- Choisir une spécialité --</option>
                  {specialities.map((spec) => (
                    <option key={spec._id} value={spec._id}>
                      {spec.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <button type="submit">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
