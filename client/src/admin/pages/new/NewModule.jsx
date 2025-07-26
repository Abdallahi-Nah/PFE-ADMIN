import { useContext, useEffect, useState } from "react";
import "./NewModule.scss";
import { AppContext } from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewModule = () => {
  const { backendUrl, specialities, fetchSpecialities, fetchModules } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    nom: "",
    semestre: "",
    specialite: "",
  });
  const navigate = useNavigate();
  const param = useParams();

  console.log("Form data : ", formData);

  const semestres = [
    { id: 1, nom: "S1" },
    { id: 2, nom: "S2" },
    { id: 3, nom: "S3" },
    { id: 4, nom: "S4" },
    { id: 5, nom: "S5" },
    { id: 6, nom: "S6" },
  ];

  console.log("Param : ", param.idMod);

  const getModule = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/module/get/${param.idMod}`
      );
      console.log(
        "Module : ",
        res.data.data.nom,
        res.data.data.semestre,
        res.data.data.specialite._id
      );
      setFormData({
        ...formData,
        nom: res.data.data.nom,
        semestre: res.data.data.semestre,
        specialite: res.data.data.specialite._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewModule = async () => {
    try {
      const res = await axios.post(backendUrl + "/module/create", formData);
      console.log("new module : ", res);
      navigate("/admin/module", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModule = async () => {
    try {
      const res = await axios.put(
        backendUrl + `/module/update/${param.idMod}`,
        formData
      );
      console.log("updated module : ", res);
      navigate("/admin/module", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpecialities();
  }, []);

  const Submit = async (e) => {
    try {
      e.preventDefault();
      if (param.idMod) {
        await handleUpdateModule();
        await fetchSpecialities();
        await fetchModules();
      } else {
        await handleAddNewModule();
        await fetchSpecialities();
        await fetchModules();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModule();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Ajouter ou Modifier un module</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={Submit}>
                <div className="formInputs">
                  <div className="formInput">
                    <label htmlFor="fullname">Nom du module</label>
                    <input
                      type="text"
                      id="fullname"
                      placeholder="Mathématiques Fondamentales"
                      onChange={handleFormData}
                      value={formData.nom}
                      name="nom"
                      required
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="semestre">Semestre</label>
                    <select
                      onChange={handleFormData}
                      value={formData.semestre}
                      name="semestre"
                      required
                      id="semestre"
                    >
                      <option value="" disabled>
                        -- Choisir un semestre --
                      </option>
                      {semestres.map((semestre) => (
                        <option key={semestre.id} value={semestre.nom}>
                          {semestre.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="formInput">
                    <label htmlFor="speciality">Spécialité</label>
                    <select
                      onChange={handleFormData}
                      value={formData.specialite}
                      name="specialite"
                      required
                      id="speciality"
                    >
                      <option value="" disabled>-- Choisir une spécialité --</option>
                      {specialities.map((speciality) => (
                        <option key={speciality._id} value={speciality._id}>
                          {speciality.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit">Enregistrer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewModule;
