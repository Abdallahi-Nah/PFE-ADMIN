import { useContext, useEffect, useState } from "react";
import "./SingleModule.scss";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/utils/Loader";

const SingleModule = () => {
  const [formData, setFormData] = useState({
    nom: "",
    matieres: [],
  });
  const [loading, setLoading] = useState(true);
  const [hasMatieres, setHasMatieres] = useState(true);
  const { backendUrl } = useContext(AppContext);
  const param = useParams();

  const getModule = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/module/get/${param.idMod}`
      );

      const res2 = await axios.get(
        backendUrl + `/module/${param.idMod}/matiere/get`
      );

      const matieres = res2.data.data;

      setFormData({
        nom: res.data.data.nom,
        matieres: matieres,
      });

      setHasMatieres(matieres.length > 0);
    } catch (error) {
      console.log(error);
      setHasMatieres(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModule();
  }, []);

  const showMatieres = formData.matieres.map((matiere, index) => (
    <div key={index} className="module">
      <h2 className="subtitle">{matiere.nom}</h2>
    </div>
  ));

  return (
    <>
      <div className="single">
        <div className="singleContainer">
          <div className="top">
            <h1 className="title">Module : {formData.nom}</h1>
          </div>
          <div className="bottom">
            <h1 className="subtitle">
              Les matières de la module : {formData.nom}
            </h1>
            <div className="modules">
              {loading ? (
                <Loader />
              ) : hasMatieres ? (
                showMatieres
              ) : (
                <p className="no-specialities">Aucune matiere trouvée.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleModule;