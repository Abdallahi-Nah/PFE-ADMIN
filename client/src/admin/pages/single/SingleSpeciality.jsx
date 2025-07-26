import { useContext, useEffect, useState } from "react";
import "./SingleSpeciality.scss";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/utils/Loader";

const SingleSpeciality = () => {
  const [formData, setFormData] = useState({
    nom: "",
    modules: [],
  });
  const [loading, setLoading] = useState(true);
  const [hasModules, setHasModules] = useState(true);

  const { backendUrl } = useContext(AppContext);
  const param = useParams();

  const getSpeciality = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/specialite/get/${param.idSpec}`
      );

      const res2 = await axios.get(
        backendUrl + `/specialite/${param.idSpec}/module/get`
      );

      const modules = res2.data.data;

      setFormData({
        nom: res.data.data.nom,
        modules: modules,
      });

      setHasModules(modules.length > 0);
    } catch (error) {
      console.log(error);
      setHasModules(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpeciality();
  }, []);

  const showModules = formData.modules.map((mod, index) => (
    <div key={index} className="speciality">
      <h2 className="subtitle">{mod.nom}</h2>
    </div>
  ));

  return (
    <>
      <div className="single">
        <div className="singleContainer">
          <div className="top">
            <h1 className="title">Spécialité : {formData.nom}</h1>
          </div>
          <div className="bottom">
            <h1 className="subtitle">
              Les modules de la spécialité : {formData.nom}
            </h1>
            <div className="specialities">
              {loading ? (
                <Loader />
              ) : hasModules ? (
                showModules
              ) : (
                <p className="no-specialities">Aucun module trouvée.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleSpeciality;
