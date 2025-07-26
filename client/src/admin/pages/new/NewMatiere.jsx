import { useContext, useEffect, useState } from "react";
import "./NewMatiere.scss";
import { AppContext } from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewMatiere = () => {
  const { backendUrl, modules, fetchModules, fetchMatieres } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    code: "",
    nom: "",
    credit: 1,
    hasTp: false,
    module: "",
  });
  const navigate = useNavigate();
  const param = useParams();

  console.log("Form data : ", formData);

  const getMatiere = async () => {
    try {
      const res = await axios.get(backendUrl + `/matiere/get/${param.idMat}`);
      console.log("Matiere : ", res.data.data);
      setFormData({
        ...formData,
        code: res.data.data.code,
        nom: res.data.data.nom,
        credit: res.data.data.credit,
        hasTp: res.data.data.hasTp,
        module: res.data.data.module._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "credit"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleAddNewMatiere = async () => {
    try {
      const res = await axios.post(backendUrl + "/matiere/create", formData);
      console.log("new matiere : ", res);
      navigate("/admin/matiere", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateMatiere = async () => {
    try {
      const res = await axios.put(
        backendUrl + `/matiere/update/${param.idMat}`,
        formData
      );
      console.log("updated matiere : ", res);
      navigate("/admin/matiere", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const Submit = async (e) => {
    try {
      e.preventDefault();
      if (param.idMat) {
        await handleUpdateMatiere();
        await fetchModules();
        await fetchMatieres();
      } else {
        await handleAddNewMatiere();
        await fetchModules();
        await fetchMatieres();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatiere();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Ajouter ou Modifier une matière</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={Submit}>
                <div className="formInputs">
                  <div className="formInput">
                    <label htmlFor="code">Code Matière</label>
                    <input
                      onChange={handleFormData}
                      value={formData.code}
                      type="text"
                      id="code"
                      placeholder="MF345"
                      name="code"
                      required
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="fullname">Nom du matière</label>
                    <input
                      onChange={handleFormData}
                      value={formData.nom}
                      type="text"
                      id="fullname"
                      name="nom"
                      placeholder="Mathématiques Fondamentales"
                      required
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="credit">Crédit</label>
                    <input
                      onChange={handleFormData}
                      value={formData.credit}
                      type="number"
                      min="1"
                      max="30"
                      id="credit"
                      name="credit"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="tp" style={{ marginTop: "7px" }}>
                      Avec TP
                    </label>
                    <input
                      onChange={handleFormData}
                      checked={formData.hasTp}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginTop: "14px",
                        cursor: "pointer",
                      }}
                      name="hasTp"
                      type="checkbox"
                      id="tp"
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="module">Module</label>
                    <select
                      onChange={handleFormData}
                      value={formData.module}
                      name="module"
                      id="module"
                      required
                    >
                      <option value="" disabled>
                        -- Choisir un module --
                      </option>
                      {modules.map((mod) => (
                        <option key={mod._id} value={mod._id}>
                          {mod.nom}
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

export default NewMatiere;
