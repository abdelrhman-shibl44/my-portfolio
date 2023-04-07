const express = require("express");
const router = express.Router();
const controll = require('../control/projectsControl')
// main page
router.get("/main", controll.home);
router.get("/form", controll.form);
router.post("/form", controll.add);
router.get("/editProject/:id", controll.edit);
router.post("/editProject/:id", controll.update);


module.exports = router