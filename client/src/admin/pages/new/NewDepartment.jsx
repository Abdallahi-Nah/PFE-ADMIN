import { DriveFolderUploadOutlined } from "@mui/icons-material";
import "./NewDepartment.scss";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";

const NewDepartment = () => {
  const [formData, setFormData] = useState({
    nom: "",
  });
  const { backendUrl, fetchDepartments } = useContext(AppContext);
  const navigate = useNavigate();
  const param = useParams();

  console.log("Param : ", param.idDep);

  const getDepartment = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/departement/get/${param.idDep}`
      );
      console.log("Department : ", res.data.data.nom);
      setFormData({ ...formData, nom: res.data.data.nom });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNewDepartment = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/departement/create",
        formData
      );
      console.log("new department : ", res);
      navigate("/admin/department", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDepartment = async () => {
    try {
      const res = await axios.put(
        backendUrl + `/departement/update/${param.idDep}`,
        formData
      );
      console.log("updated department : ", res);
      navigate("/admin/department", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = async (e) => {
    try {
      e.preventDefault();
      if (param.idDep) {
        await handleUpdateDepartment();
        await fetchDepartments();
      } else {
        await handleAddNewDepartment();
        await fetchDepartments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Ajouter ou Modifier un département</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form onSubmit={Submit}>
                <div className="formInput">
                  <label htmlFor="fullname">Nom du département</label>
                  <input
                    type="text"
                    onChange={handleFormData}
                    value={formData.nom}
                    id="fullname"
                    placeholder="Math-Infos"
                    name="nom"
                    required
                  />
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

export default NewDepartment;
