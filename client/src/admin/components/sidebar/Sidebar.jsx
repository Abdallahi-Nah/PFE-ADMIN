"use client";

import { useState, useEffect } from "react";
import {
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  School as SchoolIcon,
  ViewModule as ViewModuleIcon,
  MenuBook as MenuBookIcon,
  CalendarMonth as CalendarMonthIcon,
  Group as GroupIcon,
  Hail as HailIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import Swal from "sweetalert2";
import Cookie from "cookie-universal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const cookies = Cookie();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Sur petit écran : fermer par défaut
      if (mobile) {
        setIsOpen(false);
      }
      // Sur grand écran : ouvrir par défaut
      else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // État initial selon la taille d'écran
    if (isMobile) {
      setIsOpen(false); // Fermé par défaut sur mobile
    } else {
      setIsOpen(true); // Ouvert par défaut sur desktop
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleDisconnect = () => {
    cookies.remove("token");
    cookies.remove("role");

    // Rechargement complet de la page vers l'accueil
    window.location.href = "/";
  };

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebarOnMobile} />
      )}

      {/* Burger Menu - Toujours visible, icône change selon l'état */}
      <div className="burger-menu" onClick={toggleSidebar}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "open" : "closed"} ${
          isMobile ? "mobile" : "desktop"
        }`}
      >
        <div className="top">
          <span className="logo">
            <img src="/images/4-UN (1).jpg" alt="Logo" className="logo-image" />
          </span>
        </div>

        <div className="bottom">
          <ul>
            <p className="title">Main</p>
            <li>
              <HomeIcon className="icon" />
              <span>
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Accueil
                </NavLink>
              </span>
            </li>

            <p className="title">Gestion Académique</p>
            <li>
              <ApartmentIcon className="icon" />
              <span>
                <NavLink
                  to="admin/department"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Les Départements
                </NavLink>
              </span>
            </li>
            <li>
              <SchoolIcon className="icon" />
              <span>
                <NavLink
                  to="admin/speciality"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Les Spécialités
                </NavLink>
              </span>
            </li>
            <li>
              <ViewModuleIcon className="icon" />
              <span>
                <NavLink
                  to="admin/module"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Les Modules
                </NavLink>
              </span>
            </li>
            <li>
              <MenuBookIcon className="icon" />
              <span>
                <NavLink
                  to="admin/matiere"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Les Matières
                </NavLink>
              </span>
            </li>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>
                <NavLink
                  to="admin/emplois"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Emplois du temps
                </NavLink>
              </span>
            </li>

            <p className="title">Gestion des Personnes</p>
            <li>
              <HailIcon className="icon" />
              <span>
                <NavLink
                  to="admin/teacher"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Les enseignants
                </NavLink>
              </span>
            </li>
            <li>
              <GroupIcon className="icon" />
              <span>
                <NavLink
                  to="admin/student"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeSidebarOnMobile}
                >
                  Les étudiants
                </NavLink>
              </span>
            </li>

            <p className="title">Compte</p>
            <li>
              <LogoutIcon className="icon" />
              <span>
                <NavLink
                  to="/home"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    Swal.fire({
                      title: "Êtes-vous sûr ?",
                      text: `Voulez-vous vraiment Déconnecter ?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Oui",
                      cancelButtonText: "Non",
                      width: "50%",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDisconnect();
                      }
                    });
                  }}
                >
                  Déconnecter
                </NavLink>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
