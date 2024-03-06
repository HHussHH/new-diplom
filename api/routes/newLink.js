import express from "express";
import { addLink, getLinks } from "../controllers/newLink.js";

const router = express.Router();

router.get("/", getLinks);
router.post("/add", addLink);

export default router;
