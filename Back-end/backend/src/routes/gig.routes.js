import express from "express";
import { getGigs, createGig, getGigById } from "../controllers/gig.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", protect, createGig);
router.get("/:id", getGigById); 
export default router;
