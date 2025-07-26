import { useContext, useEffect, useState } from "react";
import "./NewSpeciality.scss";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const NewSpeciality = () => {
  const { backendUrl, departments, fetchDepartments, fetchSpecialities } =
    useContext(AppContext);
  const [formData, setFormData] = useState({
    nom: "",
    departement: "",
  });
  const navigate = useNavigate();
  const param = useParams();

  console.log("Param : ", param.idSpec);

  const getSpeciality = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/specialite/get/${param.idSpec}`
      );
      console.log(
        "Speciality : ",
        res.data.data.nom,
        res.data.data.departement._id
      );
      setFormData({
        ...formData,
        nom: res.data.data.nom,
        departement: res.data.data.departement._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewSpeciality = async () => {
    try {
      const res = await axios.post(backendUrl + "/specialite/create", formData);
      console.log("new speciality : ", res);
      navigate("/admin/speciality", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSpeciality = async () => {
    try {
      const res = await axios.put(
        backendUrl + `/specialite/update/${param.idSpec}`,
        formData
      );
      console.log("updated speciality : ", res);
      navigate("/admin/speciality", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const Submit = async (e) => {
    try {
      e.preventDefault();
      if (param.idSpec) {
        await handleUpdateSpeciality();
        await fetchDepartments();
        await fetchSpecialities();
      } else {
        await handleAddNewSpeciality();
        await fetchDepartments();
        await fetchSpecialities();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpeciality();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Ajouter ou Modifier une spécialité</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={Submit}>
                <div className="formInputs">
                  <div className="formInput">
                    <label htmlFor="fullname">Nom du spécialité</label>
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
                    <label htmlFor="department">Département</label>
                    <select
                      onChange={handleFormData}
                      value={formData.departement}
                      id="department"
                      name="departement"
                      required
                    >
                      <option value="" disabled>
                        -- Choisir un département --
                      </option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.nom}
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

export default NewSpeciality;
