import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = "http://localhost:4000";

  const [departments, setDepartments] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [modules, setModules] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [emplois, setEmplois] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [etudiants, setEtudiants] = useState([]);

  const fetchDepartments = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/departement/get`
          : `${backendUrl}/departement/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setDepartments(res.data.data);
    } catch (err) {
      console.error("Erreur fetch departments :", err);
    }
  };

  const fetchSpecialities = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/specialite/get`
          : `${backendUrl}/specialite/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setSpecialities(res.data.data);
    } catch (err) {
      console.error("Erreur fetch specialities :", err);
    }
  };

  const fetchModules = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/module/get`
          : `${backendUrl}/module/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setModules(res.data.data);
    } catch (err) {
      console.error("Erreur fetch modules :", err);
    }
  };

  const fetchMatieres = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/matiere/get`
          : `${backendUrl}/matiere/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setMatieres(res.data.data);
    } catch (err) {
      console.error("Erreur fetch matieres :", err);
    }
  };

  const fetchEmplois = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/emplois/get`
          : `${backendUrl}/emplois/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setEmplois(res.data.data);
    } catch (err) {
      console.error("Erreur fetch emplois :", err);
    }
  };

  const fetchEnseignants = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/enseignant/get`
          : `${backendUrl}/enseignant/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setEnseignants(res.data.data);
    } catch (err) {
      console.error("Erreur fetch enseignants :", err);
    }
  };

  const fetchEtudiants = async (keyword = "") => {
    try {
      const trimmedKeyword = keyword.trim();
      const url =
        trimmedKeyword === ""
          ? `${backendUrl}/etudiant/get`
          : `${backendUrl}/etudiant/get?keyword=${encodeURIComponent(
              trimmedKeyword
            )}`;

      const res = await axios.get(url);
      setEtudiants(res.data.data);
    } catch (err) {
      console.error("Erreur fetch etudiants :", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchSpecialities();
    fetchModules();
    fetchMatieres();
    fetchEmplois();
    fetchEnseignants();
    fetchEtudiants();
  }, []);

  const value = {
    backendUrl,
    departments,
    setDepartments,
    fetchDepartments,
    specialities,
    setSpecialities,
    fetchSpecialities,
    modules,
    setModules,
    fetchModules,
    matieres,
    setMatieres,
    fetchMatieres,
    emplois,
    setEmplois,
    fetchEmplois,
    enseignants,
    setEnseignants,
    fetchEnseignants,
    etudiants,
    setEtudiants,
    fetchEtudiants,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
