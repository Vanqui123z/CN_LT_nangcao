const express = require("express");
const router = express.Router();
const eventRouters = require("./eventRoutes")
const userRouters = require("./userRoutes")


router.use('/event', eventRouters);
router.use('/user', userRouters);

module.exports= router;