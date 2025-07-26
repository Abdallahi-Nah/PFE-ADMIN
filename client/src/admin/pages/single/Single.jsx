// import { useParams } from "react-router-dom";
// import "./Single.scss";
// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../../context/AppContext";
// import axios from "axios";

// const Single = () => {
//   const [formData, setFormData] = useState({
//     nom: "",
//     specialities: [],
//   });
//   const { backendUrl } = useContext(AppContext);
//   const param = useParams();

//   console.log("form data : ", formData);

//   const getDepartment = async () => {
//     try {
//       const res = await axios.get(
//         backendUrl + `/departement/get/${param.idDep}`
//       );

//       const res2 = await axios.get(
//         backendUrl + `/departement/${param.idDep}/specialite/get`
//       );

//       console.log("Department : ", res.data.data.nom);
//       console.log("Specialites : ", res2.data.data);
//       setFormData({
//         ...formData,
//         nom: res.data.data.nom,
//         specialities: res2.data.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getDepartment();
//   }, []);

//   const specialitiesShow = formData.specialities.map((speciality, index) => (
//     <div key={index} className="speciality">
//       <h2 className="subtitle">{speciality.nom}</h2>
//     </div>
//   ));

//   return (
//     <>
//       <div className="single">
//         <div className="singleContainer">
//           <div className="top">
//             <h1 className="title">Département : {formData.nom}</h1>
//           </div>
//           <div className="bottom">
//             <h1 className="subtitle">Les spécialités du département</h1>
//             <div className="specialities">
//               {specialitiesShow ? specialitiesShow : "Pas des spécialités"}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Single;

import { useParams } from "react-router-dom";
import "./Single.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import Loader from "../../components/utils/Loader";

const Single = () => {
  const [formData, setFormData] = useState({
    nom: "",
    specialities: [],
  });

  const [loading, setLoading] = useState(true);
  const [hasSpecialities, setHasSpecialities] = useState(true);

  const { backendUrl } = useContext(AppContext);
  const param = useParams();

  const getDepartment = async () => {
    try {
      const res = await axios.get(
        backendUrl + `/departement/get/${param.idDep}`
      );

      const res2 = await axios.get(
        backendUrl + `/departement/${param.idDep}/specialite/get`
      );

      const specialities = res2.data.data;

      setFormData({
        nom: res.data.data.nom,
        specialities: specialities,
      });

      setHasSpecialities(specialities.length > 0);
    } catch (error) {
      console.log(error);
      setHasSpecialities(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const specialitiesShow = formData.specialities.map((speciality, index) => (
    <div key={index} className="speciality">
      <h2 className="subtitle">{speciality.nom}</h2>
    </div>
  ));

  return (
    <div className="single">
      <div className="singleContainer">
        <div className="top">
          <h1 className="title">Département : {formData.nom}</h1>
        </div>
        <div className="bottom">
          <h1 className="subtitle">Les spécialités du département</h1>
          <div className="specialities">
            {loading ? (
              <Loader />
            ) : hasSpecialities ? (
              specialitiesShow
            ) : (
              <p className="no-specialities">Aucune spécialité trouvée.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
