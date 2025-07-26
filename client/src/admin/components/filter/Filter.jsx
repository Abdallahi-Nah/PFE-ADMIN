// import { useContext, useEffect, useState } from "react";
// import "./Filter.scss";
// import { AppContext } from "../../../context/AppContext";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const Filter = ({title}) => {
//   const {
//     backendUrl,
//     // specialities
//     departments,
//     fetchDepartments,
//     setSpecialities,
//     // modules
//     fetchSpecialities,
//     specialities,
//     setModules,
//     // matieres
//     fetchModules,
//     modules,
//     setMatieres,
//     // Etudiant
//     setEtudiants,
//     etudiants,
//   } = useContext(AppContext);
//   const location = useLocation();
//   const [results, setResults] = useState([]);
//   const [keyword, setKeyword] = useState("");

//   const handleSearch = async (e) => {
//     const selectedId = e.target.value;
//     setKeyword(selectedId);

//     try {
//       let url;

//       if (location.pathname === "/admin/speciality") {
//         if (!selectedId) {
//           url = `${backendUrl}/specialite/get`;
//         } else {
//           url = `${backendUrl}/departement/${selectedId}/specialite/get`;
//         }

//         const res = await axios.get(url);
//         setSpecialities(res.data.data);
//         console.log("Specialités :", res.data.data);
//       } else if (location.pathname === "/admin/module") {
//         if (!selectedId) {
//           url = `${backendUrl}/module/get`;
//         } else {
//           url = `${backendUrl}/specialite/${selectedId}/module/get`;
//         }

//         const res = await axios.get(url);
//         setModules(res.data.data);
//         console.log("Modules :", res.data.data);
//       } else if (location.pathname === "/admin/matiere") {
//         if (!selectedId) {
//           url = `${backendUrl}/matiere/get`;
//         } else {
//           url = `${backendUrl}/module/${selectedId}/matiere/get`;
//         }

//         const res = await axios.get(url);
//         setMatieres(res.data.data);
//         console.log("Matieres :", res.data.data);
//       } else {
//         if (!selectedId) {
//           url = `${backendUrl}/etudiant/get`;
//         } else {
//           url = `${backendUrl}/specialite/${selectedId}/etudiant/get`;
//         }

//         const res = await axios.get(url);
//         setEtudiants(res.data.data);
//         console.log("Etudiants :", res.data.data);
//       }
//     } catch (err) {
//       console.error("Erreur API :", err);
//     }
//   };


//   console.log("results : ", results);

//   useEffect(() => {
//     if (location.pathname === "/admin/speciality") {
//       fetchDepartments();
//     } else if (location.pathname === "/admin/module") {
//       fetchSpecialities();
//     } else if (location.pathname === "/admin/matiere") {
//       fetchModules();
//     } else {
//       fetchSpecialities();
//     }
//   }, []);

//   useEffect(() => {
//     if (location.pathname === "/admin/speciality") {
//       setResults(departments);
//     } else if (location.pathname === "/admin/module") {
//       setResults(specialities);
//     } else if (location.pathname === "/admin/matiere") {
//       setResults(modules);
//     } else {
//       setResults(specialities);
//     }
//   }, [departments, specialities, etudiants]);


//   return (
//     <div className="filter">
//       <select id="filter" onChange={handleSearch}>
//         <option value="" style={{ color: "#616161" }}>
//           Filtrer par {title}
//         </option>
//         {results.map((result) => (
//           <option key={result._id} value={result._id}>
//             {result.nom}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Filter;

import { useContext, useEffect, useState } from "react";
import "./Filter.scss";
import { AppContext } from "../../../context/AppContext";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Filter = ({ title }) => {
  const {
    backendUrl,
    departments,
    fetchDepartments,
    setSpecialities,
    fetchSpecialities,
    specialities,
    setModules,
    fetchModules,
    modules,
    setMatieres,
    etudiants,
    setEtudiants, // ✅
  } = useContext(AppContext);

  const location = useLocation();
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    const selectedId = e.target.value;
    setKeyword(selectedId);

    try {
      let url;

      if (location.pathname === "/admin/speciality") {
        url = selectedId
          ? `${backendUrl}/departement/${selectedId}/specialite/get`
          : `${backendUrl}/specialite/get`;

        const res = await axios.get(url);
        setSpecialities(res.data.data);
        console.log("Specialités :", res.data.data);
      } else if (location.pathname === "/admin/module") {
        url = selectedId
          ? `${backendUrl}/specialite/${selectedId}/module/get`
          : `${backendUrl}/module/get`;

        const res = await axios.get(url);
        setModules(res.data.data);
        console.log("Modules :", res.data.data);
      } else if (location.pathname === "/admin/matiere") {
        url = selectedId
          ? `${backendUrl}/module/${selectedId}/matiere/get`
          : `${backendUrl}/matiere/get`;

        const res = await axios.get(url);
        setMatieres(res.data.data);
        console.log("Matières :", res.data.data);
      } else {
        url = selectedId
          ? `${backendUrl}/specialite/${selectedId}/etudiant/get`
          : `${backendUrl}/etudiant/get`;

        const res = await axios.get(url);
        setEtudiants(res.data.data); // ✅ correct ici
        console.log("Étudiants :", res.data.data);
      }
    } catch (err) {
      console.error("Erreur API :", err);
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin/speciality") {
      fetchDepartments();
    } else if (location.pathname === "/admin/module") {
      fetchSpecialities();
    } else if (location.pathname === "/admin/matiere") {
      fetchModules();
    } else {
      fetchSpecialities(); // pour filtrer les étudiants par spécialité
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/admin/speciality") {
      setResults(departments);
    } else if (location.pathname === "/admin/module") {
      setResults(specialities);
    } else if (location.pathname === "/admin/matiere") {
      setResults(modules);
    } else {
      setResults(specialities); // ✅ permet de filtrer les étudiants par spécialité
    }
  }, [departments, specialities, modules, etudiants]);

  return (
    <div className="filter">
      <select id="filter" onChange={handleSearch}>
        <option value="" style={{ color: "#616161" }}>
          Filtrer par {title}
        </option>
        {results.map((result) => (
          <option key={result._id} value={result._id}>
            {result.nom}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
