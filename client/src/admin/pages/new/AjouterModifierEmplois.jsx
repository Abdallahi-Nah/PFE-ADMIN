import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AjouterModifierEmplois.scss";
import { AppContext } from "../../../context/AppContext";

const AjouterModifierEmplois = () => {
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    jour: "",
    heureDebut: "",
    heureFin: "",
    matiere: "",
    enseignant: "",
    lieu: "",
    type: "",
    specialite: "",
    semestre: "",
  });

  const {
    backendUrl,
    matieres,
    setMatieres,
    fetchMatieres,
    specialities,
    fetchSpecialities,
    enseignants,
    fetchEnseignants,
    fetchEmplois,
  } = useContext(AppContext);

  const navigate = useNavigate();

  console.log("form data : ", formData);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const getEmploi = async () => {
    try {
      const res = await axios.get(backendUrl + `/emplois/get/${id}`);
      const emploi = res.data.data;
      setFormData({
        jour: emploi.jour || "",
        heureDebut: emploi.heureDebut || "",
        heureFin: emploi.heureFin || "",
        matiere: emploi.matiere?._id || emploi.matiere || "",
        enseignant: emploi.enseignant?._id || emploi.enseignant || "",
        lieu: emploi.lieu || "",
        type: emploi.type || "",
        specialite: emploi.specialite?._id || emploi.specialite || "",
        semestre: emploi.semestre?._id || emploi.semestre || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchModulesAndMatieres = async () => {
      if (!formData.specialite) return;

      try {
        // 1. Récupérer les modules de la spécialité
        const modulesResponse = await fetch(
          `${backendUrl}/specialite/${formData.specialite}/module/get`
        );
        const modulesData = await modulesResponse.json();

        const allMatieres = [];

        // 2. Pour chaque module, récupérer ses matières
        for (const module of modulesData.data) {
          const matieresResponse = await fetch(
            `${backendUrl}/specialite/${formData.specialite}/module/${module._id}/matiere/get`
          );
          const matieresData = await matieresResponse.json();

          allMatieres.push(...matieresData.data);
        }

        // 3. Mise à jour de l’état local
        setMatieres(allMatieres);
      } catch (error) {
        console.error("Erreur lors de la récupération des matières :", error);
      }
    };

    fetchModulesAndMatieres();
  }, [formData.specialite]);

  useEffect(() => {
    getEmploi();
  }, []);

  const showTeachers = enseignants.map((enseignant, index) => (
    <MenuItem value={enseignant._id} key={index}>
      {enseignant.nom}
    </MenuItem>
  ));

  const showMatieres = matieres.map((matiere, index) => (
    <MenuItem value={matiere._id} key={index}>
      {matiere.nom}
    </MenuItem>
  ));

  const showSpecialities = specialities.map((specialitie, index) => (
    <MenuItem value={specialitie._id} key={index}>
      {specialitie.nom}
    </MenuItem>
  ));

  const handleAddEmplois = async () => {
    try {
      const res = await axios.post(`${backendUrl}/emplois/create`, formData);
      console.log("emplois : ", res);
      await fetchEmplois();
      navigate("/admin/emplois", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateEmplois = async () => {
    try {
      console.log("Données envoyées :", formData);
      const res = await axios.put(
        `${backendUrl}/emplois/update/${id}`,
        formData
      );
      console.log("emplois : ", res);
      await fetchEmplois();
      navigate("/admin/emplois", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
    if (id) {
      handleUpdateEmplois();
    } else {
      // Handle form submission here
      handleAddEmplois();
    }
  };

  useEffect(() => {
    fetchEnseignants();
    fetchMatieres();
    fetchSpecialities();
  }, []);

  return (
    <div className="ajouter-modifier-container">
      <Card className="form-card">
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            className="page-title"
            style={{ marginBottom: "20px" }}
          >
            {isEditing
              ? "Modifier l'emploi du temps"
              : "Créer un emploi du temps"}
          </Typography>

          <form onSubmit={handleSubmit} className="emploi-form">
            <Box className="form-row">
              <FormControl className="form-field">
                <InputLabel>Jour</InputLabel>
                <Select
                  value={formData.jour}
                  onChange={handleChange("jour")}
                  label="Jour"
                >
                  <MenuItem value="Lundi">Lundi</MenuItem>
                  <MenuItem value="Mardi">Mardi</MenuItem>
                  <MenuItem value="Mercredi">Mercredi</MenuItem>
                  <MenuItem value="Jeudi">Jeudi</MenuItem>
                  <MenuItem value="Vendredi">Vendredi</MenuItem>
                  <MenuItem value="Samedi">Samedi</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Heure de début"
                type="time"
                value={formData.heureDebut}
                onChange={handleChange("heureDebut")}
                className="form-field"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Heure de fin"
                type="time"
                value={formData.heureFin}
                onChange={handleChange("heureFin")}
                className="form-field"
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            <Box className="form-row">
              <FormControl className="form-field">
                <InputLabel>Spécialité</InputLabel>
                <Select
                  value={formData.specialite}
                  onChange={handleChange("specialite")}
                  label="Spécialité"
                >
                  {showSpecialities}
                </Select>
              </FormControl>

              <FormControl className="form-field">
                <InputLabel>Matière</InputLabel>
                <Select
                  value={formData.matiere}
                  onChange={handleChange("matiere")}
                  label="Matière"
                  fullWidth
                >
                  {showMatieres}
                </Select>
              </FormControl>
            </Box>

            <Box className="form-row">
              <FormControl className="form-field">
                <InputLabel>Enseignant</InputLabel>
                <Select
                  value={formData.enseignant}
                  onChange={handleChange("enseignant")}
                  label="Enseignant"
                >
                  {showTeachers}
                </Select>
              </FormControl>

              <TextField
                label="Lieu"
                value={formData.lieu}
                onChange={handleChange("lieu")}
                className="form-field"
              />
            </Box>

            <Box className="form-row">
              <FormControl className="form-field">
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleChange("type")}
                  label="Type"
                >
                  <MenuItem value="Cours">Cours</MenuItem>
                  <MenuItem value="TP">TP</MenuItem>
                  <MenuItem value="TD">TD</MenuItem>
                </Select>
              </FormControl>

              <FormControl className="form-field">
                <InputLabel>Semestre</InputLabel>
                <Select
                  value={formData.semestre}
                  onChange={handleChange("semestre")}
                  label="Semestre"
                >
                  <MenuItem value="S1">S1</MenuItem>
                  <MenuItem value="S2">S2</MenuItem>
                  <MenuItem value="S3">S3</MenuItem>
                  <MenuItem value="S4">S4</MenuItem>
                  <MenuItem value="S5">S5</MenuItem>
                  <MenuItem value="S6">S6</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className="form-actions">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                className="save-btn"
              >
                {isEditing ? "Modifier" : "Créer"}
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to="/emplois"
                startIcon={<Cancel />}
                className="cancel-btn"
                style={{
                  backgroundColor: "brown",
                  color: "#fff",
                  borderColor: "brown",
                }}
              >
                Annuler
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AjouterModifierEmplois;
