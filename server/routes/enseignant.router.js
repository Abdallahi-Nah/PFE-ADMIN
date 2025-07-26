const express = require("express");

const {
  createEnseignant,
  getEnseignants,
  getEnseignant,
  updateEnseignant,
  deleteEnseignant,
  addCourse,
  getEducatorCourses,
} = require("../controller/enseignant.controller");
const uploadEnseignantImage = require("../my_middlewares/uploadEnseignantImage");
const upload = require("../configs/multer");
const {
  createEnseignantValidator,
  getEnseignantByIdValidator,
  updateEnseignantValidator,
  deleteEnseignantValidator,
} = require("../utils/validators/enseignantValidator");

const router = express.Router({ mergeParams: true });

router.post(
  "/create",
  upload.single("profileImg"), 
  createEnseignant 
);

router.get("/get", getEnseignants);
router.get("/get/:id", getEnseignantByIdValidator, getEnseignant);
router.put(
  "/update/:id",
  upload.single("profileImg"),
  updateEnseignant
);
router.delete("/delete/:id", deleteEnseignantValidator, deleteEnseignant);

router.post("/add-course", upload.single("image"), addCourse);
router.get("/courses", getEducatorCourses);

module.exports = router;
