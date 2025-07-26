

import { DriveFolderUploadOutlined } from "@mui/icons-material";
import "./NewTeacher.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NewTeacher = () => {
  const [file, setFile] = useState(null);
  const { backendUrl, matieres, fetchMatieres, fetchEnseignants } =
    useContext(AppContext);
  const navigate = useNavigate();
  const param = useParams();

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
    matieresEnseignes: [],
    profileImg: "",
  });

  const getTeacher = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/enseignant/get/${param.idTeach}`
      );
      const enseignant = res.data.data;
      setFormData({
        nom: enseignant.nom || "",
        prenom: enseignant.prenom || "",
        email: enseignant.email || "",
        telephone: enseignant.telephone || "",
        adresse: enseignant.adresse || "",
        dateNaissance: enseignant.dateNaissance
          ? enseignant.dateNaissance.substring(0, 10)
          : "",
        diplomes: Array.isArray(enseignant.diplomes)
          ? enseignant.diplomes
          : ["", "", ""],
        specialite: enseignant.specialite || "",
        anneesExperience: enseignant.anneesExperience || "",
        matieresEnseignes: Array.isArray(enseignant.matieresEnseignes)
          ? enseignant.matieresEnseignes.map((m) => m._id)
          : [],
        profileImg: enseignant.profileImg || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = (e) => {
    const { name, value, options } = e.target;

    if (name === "matieresEnseignes") {
      const selectedValues = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDiplomeChange = (index, value) => {
    const updatedDiplomes = [...formData.diplomes];
    updatedDiplomes[index] = value;
    setFormData((prev) => ({ ...prev, diplomes: updatedDiplomes }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFormData((prev) => ({ ...prev, profileImg: selectedFile }));
  };

  const handleAddNewTeacher = async () => {
    try {
      if (!formData.nom || !formData.prenom || !formData.email) {
        alert("Merci de remplir au moins le nom, prénom et email !");
        return;
      }
      if (!formData.matieresEnseignes.length) {
        alert("Merci de choisir au moins une matière !");
        return;
      }

      const data = new FormData();
      data.append("nom", formData.nom);
      data.append("prenom", formData.prenom);
      data.append("email", formData.email);
      data.append("telephone", formData.telephone);
      data.append("adresse", formData.adresse);
      data.append("dateNaissance", formData.dateNaissance);
      data.append("specialite", formData.specialite);
      data.append("anneesExperience", formData.anneesExperience);
      formData.diplomes.forEach((diplome, i) =>
        data.append(`diplomes[${i}]`, diplome || "")
      );
      formData.matieresEnseignes.forEach((id) =>
        data.append("matieresEnseignes[]", id)
      );
      if (file) data.append("profileImg", file);

      const res = await axios.post(backendUrl + "/enseignant/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) navigate("/admin/teacher");
      else alert("Échec de la création de l'enseignant");
    } catch (error) {
      console.error(error);
      alert(`Erreur: ${error.response?.data?.message || "Erreur de création"}`);
    }
  };

  const handleUpdateNewTeacher = async () => {
    try {
      const data = new FormData();
      data.append("nom", formData.nom);
      data.append("prenom", formData.prenom);
      data.append("email", formData.email);
      data.append("telephone", formData.telephone);
      data.append("adresse", formData.adresse);
      data.append("dateNaissance", formData.dateNaissance);
      data.append("specialite", formData.specialite);
      data.append("anneesExperience", formData.anneesExperience);
      formData.diplomes.forEach((diplome, i) =>
        data.append(`diplomes[${i}]`, diplome || "")
      );
      formData.matieresEnseignes.forEach((id) =>
        data.append("matieresEnseignes[]", id)
      );
      if (file) data.append("profileImg", file);

      const res = await axios.put(
        backendUrl + `/enseignant/update/${param.idTeach}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) navigate("/admin/teacher");
      else alert("Échec de la mise à jour");
    } catch (error) {
      console.error(error);
      alert(
        `Erreur: ${error.response?.data?.message || "Erreur de mise à jour"}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (param.idTeach) await handleUpdateNewTeacher();
    else await handleAddNewTeacher();
    await fetchMatieres();
    await fetchEnseignants();
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  useEffect(() => {
    if (param.idTeach) getTeacher();
  }, [param.idTeach]);

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Ajouter ou Modifier un enseignant</h1>
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
              />
            </div>
          </div>

          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              {/* Champs classiques */}
              <div className="formInput">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleFormData}
                />
              </div>

              <div className="formInput">
                <label htmlFor="prenom">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleFormData}
                />
              </div>

              <div className="formInput">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormData}
                />
              </div>

              <div className="formInput">
                <label htmlFor="telephone">Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleFormData}
                />
              </div>

              <div className="formInput">
                <label htmlFor="adresse">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleFormData}
                />
              </div>

              <div className="formInput">
                <label htmlFor="dateNaissance">Date de Naissance</label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleFormData}
                />
              </div>

              <div className="formInput">
                <label>Les diplômes</label>
                {formData.diplomes.map((diplome, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Diplôme ${i + 1}`}
                    value={diplome}
                    onChange={(e) => handleDiplomeChange(i, e.target.value)}
                    style={{ marginTop: i > 0 ? "10px" : 0 }}
                  />
                ))}
              </div>

              <div className="formInput">
                <label htmlFor="specialite">Spécialité</label>
                <input
                  type="text"
                  name="specialite"
                  value={formData.specialite}
                  onChange={handleFormData}
                />
              </div>

              {/* Sélection multiple des matières */}
              <div className="formInput">
                <label htmlFor="matieresEnseignes">Matières enseignées</label>
                <select
                  name="matieresEnseignes"
                  multiple
                  value={formData.matieresEnseignes}
                  onChange={handleFormData}
                  size={5}
                  style={{ height: "auto", minHeight: "100px" }}
                >
                  {matieres.map((mat) => (
                    <option key={mat._id} value={mat._id}>
                      {mat.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  marginTop: "20px",
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

export default NewTeacher;

