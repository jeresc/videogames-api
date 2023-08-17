import { Router } from "express";
import { postUser } from "#controllers";

const router = Router()

router.post("/", postUser)

export default router
