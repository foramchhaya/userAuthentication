import Controller from "../controller/controller.js";
import isValidUser from "../middlewares/validate.js";
import express from "express";
const router = express.Router();

router.get("/login", Controller.login_get);
router.get("/dashboard", isValidUser, Controller.dashboard_get);
router.post("/", Controller.logout_post);
router.get("/", Controller.home_get);
router.get("/signup", Controller.signup_get);
router.post("/signup", Controller.signup_post);
router.post("/login", Controller.login_post);

export default router;
