const express = require("express");
const userRouter = require("./user");
const resumeRouter = require("./resume");

const router = express.Router();

router.use("/user", userRouter);
router.use("/resume", resumeRouter);

module.exports = router;
