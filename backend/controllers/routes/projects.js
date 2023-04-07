const express = require("express");
const router = express.Router();
const controll = require('../control/projectsControl')
// main page
router.get("/main", controll.home)

module.exports = router