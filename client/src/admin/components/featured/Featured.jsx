// // import "./Featured.scss";
// // import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
// // import ChangingProgressProvider from "./ChangingProgressProvider";
// // import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// // import "react-circular-progressbar/dist/styles.css";
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const Featured = () => {
// //   const [totalCourses, setTotalCourses] = useState(0);
// //   const [lastWeekCount, setLastWeekCount] = useState(0);
// //   const [lastMonthCount, setLastMonthCount] = useState(0);

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:4000/course/all");
// //         const courses = res.data.courses;

// //         setTotalCourses(courses.length);

// //         const now = new Date();
// //         const oneWeekAgo = new Date(now);
// //         oneWeekAgo.setDate(now.getDate() - 7);

// //         const oneMonthAgo = new Date(now);
// //         oneMonthAgo.setMonth(now.getMonth() - 1);

// //         const weekCount = courses.filter(
// //           (course) => new Date(course.createdAt) >= oneWeekAgo
// //         ).length;
// //         const monthCount = courses.filter(
// //           (course) => new Date(course.createdAt) >= oneMonthAgo
// //         ).length;

// //         setLastWeekCount(weekCount);
// //         setLastMonthCount(monthCount);
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération des cours:", error);
// //       }
// //     };

// //     fetchCourses();
// //   }, []);

// //   const percentage =
// //     totalCourses === 0
// //       ? 0
// //       : Math.min(100, Math.round((lastMonthCount / totalCourses) * 100));

// //   return (
// //     <div className="featured">
// //       <div className="top">
// //         <h1 className="title">Nombre total de cours</h1>
// //         <AssignmentOutlinedIcon className="icon" fontSize="small" />
// //       </div>
// //       <div className="bottom">
// //         <div className="featuredChart">
// //           <ChangingProgressProvider values={[percentage]}>
// //             {(val) => (
// //               <CircularProgressbar
// //                 value={val}
// //                 text={`${val}%`}
// //                 styles={buildStyles({
// //                   pathTransitionDuration: 0.95,
// //                   trailColor: "#82ca9d",
// //                   pathColor: "#210876",
// //                   textColor: "#210876",
// //                 })}
// //               />
// //             )}
// //           </ChangingProgressProvider>
// //         </div>
// //         <p className="title">Total de cours</p>
// //         <p className="amount">{totalCourses}</p>
// //         <p className="desc">Statistiques</p>
// //         <div className="summary">
// //           <div className="item">
// //             <div className="itemTitle">Target</div>
// //             <div className="itemResult positive">
// //               <span className="resultAmount">10000</span>
// //             </div>
// //           </div>
// //           <div className="item">
// //             <div className="itemTitle">Last Week</div>
// //             <div className="itemResult">
// //               <span className="resultAmount">{lastWeekCount}</span>
// //             </div>
// //           </div>
// //           <div className="item">
// //             <div className="itemTitle">Last Month</div>
// //             <div className="itemResult">
// //               <span className="resultAmount">{lastMonthCount}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Featured;

// import "./Featured.scss";
// import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
// import ChangingProgressProvider from "./ChangingProgressProvider";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Featured = () => {
//   const [totalCourses, setTotalCourses] = useState(0);
//   const [lastWeekCount, setLastWeekCount] = useState(0);
//   const [lastMonthCount, setLastMonthCount] = useState(0);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/course/all");
//         const courses = res.data.courses;

//         setTotalCourses(courses.length);

//         const now = new Date();
//         const oneWeekAgo = new Date(now);
//         oneWeekAgo.setDate(now.getDate() - 7);

//         const oneMonthAgo = new Date(now);
//         oneMonthAgo.setMonth(now.getMonth() - 1);

//         const weekCount = courses.filter(
//           (course) => new Date(course.createdAt) >= oneWeekAgo
//         ).length;
//         const monthCount = courses.filter(
//           (course) => new Date(course.createdAt) >= oneMonthAgo
//         ).length;

//         setLastWeekCount(weekCount);
//         setLastMonthCount(monthCount);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des cours:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div className="featured">
//       <div className="top">
//         <h1 className="title">Nombre total de cours</h1>
//         <AssignmentOutlinedIcon className="icon" fontSize="small" />
//       </div>
//       <div className="bottom">
//         <div className="featuredChart">
//           <ChangingProgressProvider>
//             {(value) => (
//               <CircularProgressbar
//                 value={value}
//                 text={`${value}%`}
//                 styles={buildStyles({
//                   pathTransitionDuration: 0.75,
//                   trailColor: "#e0e0e0",
//                   pathColor: "#210876",
//                   textColor: "#210876",
//                 })}
//               />
//             )}
//           </ChangingProgressProvider>
//         </div>
//         <p className="title">Total de cours</p>
//         <p className="amount">{totalCourses}</p>
//         <p className="desc">Statistiques</p>
//         <div className="summary">
//           <div className="item">
//             <div className="itemTitle">Target</div>
//             <div className="itemResult positive">
//               <span className="resultAmount">10000</span>
//             </div>
//           </div>
//           <div className="item">
//             <div className="itemTitle">Last Week</div>
//             <div className="itemResult">
//               <span className="resultAmount">{lastWeekCount}</span>
//             </div>
//           </div>
//           <div className="item">
//             <div className="itemTitle">Last Month</div>
//             <div className="itemResult">
//               <span className="resultAmount">{lastMonthCount}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Featured;

"use client";

import "./Featured.scss";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [totalCourses, setTotalCourses] = useState(0);
  const [lastWeekCount, setLastWeekCount] = useState(0);
  const [lastMonthCount, setLastMonthCount] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:4000/course/all");
        const courses = res.data.courses;
        setTotalCourses(courses.length);

        const now = new Date();
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);

        const weekCount = courses.filter(
          (course) => new Date(course.createdAt) >= oneWeekAgo
        ).length;

        const monthCount = courses.filter(
          (course) => new Date(course.createdAt) >= oneMonthAgo
        ).length;

        setLastWeekCount(weekCount);
        setLastMonthCount(monthCount);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      }
    };

    fetchCourses();
  }, []);

  const percentage =
    totalCourses === 0
      ? 0
      : Math.min(100, Math.round((lastMonthCount / totalCourses) * 100));

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Nombre total de cours</h1>
        <AssignmentOutlinedIcon className="icon" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <ChangingProgressProvider values={[percentage]}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                  pathTransitionDuration: 0.75,
                  trailColor: "#e0e0e0",
                  pathColor: "#0a9048",
                  textColor: "#0a9048",
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
        <p className="course-title">Total de cours</p>
        <p className="amount">{totalCourses}</p>
        <p className="desc">Statistiques mensuelles</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Objectif</div>
            <div className="itemResult positive">
              <span className="resultAmount">10000</span>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Semaine</div>
            <div className="itemResult">
              <span className="resultAmount">{lastWeekCount}</span>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mois</div>
            <div className="itemResult">
              <span className="resultAmount">{lastMonthCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
