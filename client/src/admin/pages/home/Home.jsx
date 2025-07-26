// import React, { useEffect, useState } from "react";
// import "./Home.scss";
// import Widget from "../../components/widget/Widget";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import SchoolIcon from "@mui/icons-material/School";
// import ViewModuleIcon from "@mui/icons-material/ViewModule";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import GroupIcon from "@mui/icons-material/Group";
// import HailIcon from "@mui/icons-material/Hail";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import axios from "axios";
// import CountUp from "react-countup";

// const Home = () => {
//   const [stats, setStats] = useState({
//     departments: 0,
//     specialties: 0,
//     modules: 0,
//     matieres: 0,
//     enseignants: 0,
//     etudiants: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [deptRes, specRes, modRes, matRes, ensRes, etuRes] =
//           await Promise.all([
//             axios.get("http://localhost:4000/departement/get"),
//             axios.get("http://localhost:4000/specialite/get"),
//             axios.get("http://localhost:4000/module/get"),
//             axios.get("http://localhost:4000/matiere/get"),
//             axios.get("http://localhost:4000/enseignant/get"),
//             axios.get("http://localhost:4000/etudiant/get"),
//           ]);

//         setStats({
//           departments: deptRes.data?.results || 0,
//           specialties: specRes.data?.results || 0,
//           modules: modRes.data?.results || 0,
//           matieres: matRes.data?.results || 0,
//           enseignants: ensRes.data?.results || 0,
//           etudiants: etuRes.data?.results || 0,
//         });
//       } catch (error) {
//         console.error("Erreur lors de la récupération des stats :", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div>
//       <div>
//         <div className="widgets">
//           <Widget
//             title="LES DEPARTEMENTS"
//             counter={<CountUp end={stats.departments} duration={2} />}
//             icon={<ApartmentIcon className="icon" />}
//           />
//           <Widget
//             title="LES SPECIALITES"
//             counter={<CountUp end={stats.specialties} duration={2} />}
//             icon={<SchoolIcon className="icon" />}
//           />
//           <Widget
//             title="LES MODULES"
//             counter={<CountUp end={stats.modules} duration={2} />}
//             icon={<ViewModuleIcon className="icon" />}
//           />
//           <Widget
//             title="LES MATIERES"
//             counter={<CountUp end={stats.matieres} duration={2} />}
//             icon={<MenuBookIcon className="icon" />}
//           />
//           <Widget
//             title="LES ENSEIGNANTS"
//             counter={<CountUp end={stats.enseignants} duration={2} />}
//             icon={<HailIcon className="icon" />}
//           />
//           <Widget
//             title="LES ETUDIANTS"
//             counter={<CountUp end={stats.etudiants} duration={2} />}
//             icon={<GroupIcon className="icon" />}
//           />
//         </div>
//         <div className="charts">
//           <Featured />
//           <Chart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

"use client";

import { useEffect, useState } from "react";
import "./Home.scss";
import Widget from "../../components/widget/Widget";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SchoolIcon from "@mui/icons-material/School";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import HailIcon from "@mui/icons-material/Hail";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import axios from "axios";
import CountUp from "react-countup";

const Home = () => {
  const [stats, setStats] = useState({
    departments: 0,
    specialties: 0,
    modules: 0,
    matieres: 0,
    enseignants: 0,
    etudiants: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [deptRes, specRes, modRes, matRes, ensRes, etuRes] =
          await Promise.all([
            axios.get("http://localhost:4000/departement/get"),
            axios.get("http://localhost:4000/specialite/get"),
            axios.get("http://localhost:4000/module/get"),
            axios.get("http://localhost:4000/matiere/get"),
            axios.get("http://localhost:4000/enseignant/get"),
            axios.get("http://localhost:4000/etudiant/get"),
          ]);

        setStats({
          departments: deptRes.data?.results || 0,
          specialties: specRes.data?.results || 0,
          modules: modRes.data?.results || 0,
          matieres: matRes.data?.results || 0,
          enseignants: ensRes.data?.results || 0,
          etudiants: etuRes.data?.results || 0,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des stats :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget
            title="LES DEPARTEMENTS"
            counter={<CountUp end={stats.departments} duration={2} />}
            icon={<ApartmentIcon className="icon" />}
          />
          <Widget
            title="LES SPECIALITES"
            counter={<CountUp end={stats.specialties} duration={2} />}
            icon={<SchoolIcon className="icon" />}
          />
          <Widget
            title="LES MODULES"
            counter={<CountUp end={stats.modules} duration={2} />}
            icon={<ViewModuleIcon className="icon" />}
          />
          <Widget
            title="LES MATIERES"
            counter={<CountUp end={stats.matieres} duration={2} />}
            icon={<MenuBookIcon className="icon" />}
          />
          <Widget
            title="LES ENSEIGNANTS"
            counter={<CountUp end={stats.enseignants} duration={2} />}
            icon={<HailIcon className="icon" />}
          />
          <Widget
            title="LES ETUDIANTS"
            counter={<CountUp end={stats.etudiants} duration={2} />}
            icon={<GroupIcon className="icon" />}
          />
        </div>

        <div className="charts">
          <Featured />
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Home;
