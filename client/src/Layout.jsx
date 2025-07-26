import { Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  Department,
  NewDepartment,
  NewSpeciality,
  Speciality,
  NewModule,
  NewMatiere,
  NewTeacher,
  NewStudent,
  AjouterModifierEmplois,
  Mod,
  Single,
  SingleSpeciality,
  SingleModule,
  SingleTeacher,
  SingleStudent,
  Matiere,
  Emplois,
  Teacher,
  Student,
} from "./admin/index/index";
import Login from "./common/login/Login";
import Sidebar from "./admin/components/sidebar/Sidebar";
import RequireAuth from "./admin/pages/auth/RequireAuth";
import Cookie from "cookie-universal";

function Layout() {
  const location = useLocation();
  console.log("location : ", location.pathname);
  const cookies = Cookie();

  return (
    <div className="home">
      {location.pathname !== "/" &&
        cookies.get("token") !== "" &&
        cookies.get("role") === "admin" && <Sidebar />}
      <div className="homeContainer">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="admin/department" element={<Department />} />
            <Route
              path="admin/department/new-department"
              element={<NewDepartment />}
            />
            <Route
              path="admin/department/new-department/:idDep"
              element={<NewDepartment />}
            />
            <Route path="admin/speciality" element={<Speciality />} />
            <Route
              path="admin/speciality/new-speciality"
              element={<NewSpeciality />}
            />
            <Route
              path="admin/speciality/new-speciality/:idSpec"
              element={<NewSpeciality />}
            />
            <Route path="admin/module" element={<Mod />} />
            <Route path="admin/module/new-module" element={<NewModule />} />
            <Route
              path="admin/module/new-module/:idMod"
              element={<NewModule />}
            />
            <Route path="admin/department/single/:idDep" element={<Single />} />
            <Route
              path="admin/speciality/single/:idSpec"
              element={<SingleSpeciality />}
            />
            <Route
              path="admin/module/single/:idMod"
              element={<SingleModule />}
            />
            <Route
              path="admin/teacher/single/:idTeach"
              element={<SingleTeacher />}
            />
            <Route
              path="admin/student/single/:idStud"
              element={<SingleStudent />}
            />
            <Route path="admin/matiere" element={<Matiere />} />
            <Route path="admin/matiere/new-matiere" element={<NewMatiere />} />
            <Route
              path="admin/matiere/new-matiere/:idMat"
              element={<NewMatiere />}
            />
            <Route path="admin/emplois" element={<Emplois />} />
            <Route
              path="admin/emplois/new-emplois"
              element={<AjouterModifierEmplois />}
            />
            <Route
              path="admin/emplois/new-emplois/:id"
              element={<AjouterModifierEmplois />}
            />
            <Route path="admin/teacher" element={<Teacher />} />
            <Route path="admin/teacher/new-teacher" element={<NewTeacher />} />
            <Route
              path="admin/teacher/new-teacher/:idTeach"
              element={<NewTeacher />}
            />
            <Route path="admin/student" element={<Student />} />
            <Route path="admin/student/new-student" element={<NewStudent />} />
            <Route
              path="admin/student/new-student/:idStud"
              element={<NewStudent />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default Layout;
