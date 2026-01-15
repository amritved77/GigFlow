import express from "express";
import {
  submitBid,
  getBidsByGig,
  hireBid,
} from "../controllers/bid.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, submitBid);
router.get("/:gigId", protect, getBidsByGig);
router.patch("/:bidId/hire", protect, hireBid);

export default router;
