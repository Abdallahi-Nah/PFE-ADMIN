const express = require("express");

const {
    createEtudiant,
    createFilterObj,
    getEtudiants,
    getEtudiant,
    updateEtudiant,
    deleteEtudiant,
} = require("../controller/etudiant.controller");
const upload = require("../configs/multer");
const {
    createEtudiantValidator,
    getEtudiantByIdValidator,
    updateEtudiantValidator,
    deleteEtudiantValidator,
} = require("../utils/validators/etudiantValidator");

// const notesMatiereRoutes = require("./notesMatieres.routes");

const router = express.Router({ mergeParams: true });

// router.use('/:etudiantId/notes-matieres', notesMatiereRoutes);

router.post(
  "/create",
  // createEtudiantValidator,
  upload.single("profileImg"),
  createEtudiant
);
router.get("/get", createFilterObj, getEtudiants);
router.get('/get/:id', getEtudiantByIdValidator, getEtudiant);
router.put(
  "/update/:id",
  // updateEtudiantValidator,
  upload.single("profileImg"),
  updateEtudiant
);
router.delete('/delete/:id', deleteEtudiantValidator, deleteEtudiant);

module.exports = router;