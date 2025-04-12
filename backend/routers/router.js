const express = require("express");
const router = express.Router();
const eventRouters = require("./eventRoutes")
const userRouters = require("./userRoutes")
const authRouters = require("./authRouter")


router.use('/event', eventRouters);
router.use('/user',userRouters);
router.use('/auth',authRouters);





module.exports= router;