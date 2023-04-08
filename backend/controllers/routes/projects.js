const express = require("express");
const router = express.Router();
const controll = require('../control/projectsControl')
// use this middleware to upload images 
const multer = require("multer")
const storage = multer.diskStorage({
  destination:(req,file,cb) =>{
    cb(null,'../public/images')
  },
  filename:(req,file,cb) => {
    cb(null,Date.now() + "-" + file.originalname)
    console.log(file.originalname)
  }
})
const upload = multer({storage:storage}).single('img')
// main page
router.get("/main", controll.home);
router.get("/form", controll.form);
router.post("/form",upload, controll.add);
router.get("/editProject/:id", controll.edit);
router.post("/editProject/:id",upload, controll.update);
router.get("/delete/:id", controll.delete);
router.post("/main", controll.find);
router.post("/delete", controll.remove);
router.get("/getData", controll.data);

module.exports = router