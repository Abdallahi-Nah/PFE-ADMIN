import { useParams } from "react-router-dom";
import "./SingleTeacher.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

const SingleTeacher = () => {
  const { backendUrl } = useContext(AppContext);
  const param = useParams();

  console.log("param id : ", param.idTeach);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    dateNaissance: "",
    diplomes: ["", "", ""],
    specialite: "",
    anneesExperience: "",
    matieresEnseignes: "",
    profileImg: "",
  });

  console.log("form data : ", formData);

  const getTeacher = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/enseignant/get/${param.idTeach}`
      );
      const teacher = res.data.data;

      // Récupération des IDs des matières
      const matiereIds = Array.isArray(teacher.matieresEnseignes)
        ? teacher.matieresEnseignes.map((m) =>
            typeof m === "object" ? m._id : m
          )
        : [];

      // Récupération des noms des matières depuis les IDs
      const matieres = await Promise.all(
        matiereIds.map(async (id) => {
          const resMatiere = await axios.get(backendUrl + `/matiere/get/${id}`);
          return resMatiere.data.data.nom || "Inconnue";
        })
      );

      // Mise à jour des données
      setFormData({
        nom: teacher.nom || "",
        prenom: teacher.prenom || "",
        email: teacher.email || "",
        telephone: teacher.telephone || "",
        adresse: teacher.adresse || "",
        dateNaissance: teacher.dateNaissance
          ? teacher.dateNaissance.substring(0, 10)
          : "",
        diplomes: Array.isArray(teacher.diplomes)
          ? teacher.diplomes
          : ["", "", ""],
        specialite: teacher.specialite || "",
        anneesExperience: teacher.anneesExperience || "",
        matieresEnseignes: matieres, // tableau de noms
        profileImg: teacher.profileImg || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (param.idTeach) {
      getTeacher();
    }
  }, [param.idTeach]);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Les informations d'un enseignant</h1>
        </div>
        <div className="bottom">
          <div className="imageContainer">
            <img
              src={formData.profileImg || "/images/teaher-1.jpg"}
              alt="teacher"
              className="image"
            />
          </div>
          <div className="formContainer">
            <form>
              <div className="formInput">
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" value={formData.nom} readOnly />
              </div>
              <div className="formInput">
                <label htmlFor="prenom">Prenom</label>
                <input
                  type="text"
                  id="prenom"
                  value={formData.prenom}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="tel">Téléphone</label>
                <input
                  type="text"
                  id="tel"
                  value={formData.telephone}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  id="address"
                  value={formData.adresse}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="dateNaissance">Date Naissance</label>
                <input
                  type="text"
                  id="dateNaissance"
                  value={formData.dateNaissance}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="diplomes">Les diplômes</label>
                {formData.diplomes.map((diplome, index) => (
                  <input
                    key={index}
                    style={index !== 0 ? { marginTop: "26px" } : {}}
                    type="text"
                    id={`diplomes-${index}`}
                    value={diplome}
                    readOnly
                  />
                ))}
              </div>
              <div className="formInput">
                <label htmlFor="specialite">Spécialité</label>
                <input
                  type="text"
                  id="specialite"
                  value={formData.specialite}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="matieres">Les matières qu'il enseigne</label>
                <input
                  type="text"
                  id="matieres"
                  value={formData.matieresEnseignes}
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SingleTeacher;
