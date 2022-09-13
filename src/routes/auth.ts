import exepress from "express";
import { signin, signup } from "src/controllers/auth";
import { signinValidator, signupValidator } from "src/validator/auth";

const router = exepress.Router();

router.post("/signup", signupValidator, signup);
router.post("/signin", signinValidator, signin);

export default router;
