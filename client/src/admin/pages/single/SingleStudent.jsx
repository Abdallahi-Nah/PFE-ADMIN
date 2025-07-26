import { useParams } from "react-router-dom";
import "./SingleStudent.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

const SingleStudent = () => {
  const { backendUrl } = useContext(AppContext);
  const param = useParams();

  console.log("param id : ", param.idStud);

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
    creditAccumulee: 0,
    moyAnnuelle: 0,
  });

  console.log("form data : ", formData);

  const getStudent = async () => {
    try {
      const res = await axios.get(backendUrl + `/etudiant/get/${param.idStud}`);
      const student = res.data.data;

      const specialiteNom = await axios.get(
        backendUrl + `/specialite/get/${student.specialite}`
      );

      // Mise à jour des données
      setFormData({
        nom: student.nom || "",
        prenom: student.prenom || "",
        email: student.email || "",
        telephone: student.telephone || "",
        adresse: student.adresse || "",
        dateNaissance: student.dateNaissance
          ? student.dateNaissance.slice(0, 10)
          : "",
        specialite: specialiteNom.data.data.nom || "",
        matricule: student.matricule || "",
        profileImg: student.profileImg || "",
        creditAccumulee: student.creditAccumulee || 0,
        moyAnnuelle: student.moyAnnuelle || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (param.idStud) {
      getStudent();
    }
  }, [param.idStud]);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Les informations d'un étudiant</h1>
        </div>
        <div className="bottom">
          <div className="imageContainer">
            <img
              src={formData.profileImg || "/images/teaher-1.jpg"}
              alt="student"
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
                <label htmlFor="speciality">Spécialité</label>
                <input
                  type="text"
                  id="speciality"
                  value={formData.specialite}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="matricule">Matricule</label>
                <input
                  type="text"
                  id="matricule"
                  value={formData.matricule}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="creditCumulatif">Crédit cumulatif</label>
                <input
                  type="text"
                  id="creditCumulatif"
                  value={formData.creditAccumulee}
                  readOnly
                />
              </div>
              <div className="formInput">
                <label htmlFor="moyenneAnnuelle">Moyenne annuelle</label>
                <input
                  type="text"
                  id="moyenneAnnuelle"
                  value={formData.moyAnnuelle}
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

export default SingleStudent;
