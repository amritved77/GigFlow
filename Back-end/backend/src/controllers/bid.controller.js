import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { getIO } from "../config/socket.js";

export const submitBid = async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.id,
  });
  res.json(bid);
};

export const getBidsByGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId })
    .populate("freelancerId", "name email"); // 🔥 THIS LINE

  res.json(bids);
};


export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    const gig = await Gig.findById(bid.gigId).session(session);

    if (gig.status === "assigned") {
      throw new Error("Gig already assigned");
    }

    await Bid.updateMany(
      { gigId: gig._id },
      { status: "rejected" },
      { session }
    );

    bid.status = "hired";
    gig.status = "assigned";

    await bid.save({ session });
    await gig.save({ session });

    await session.commitTransaction();

    getIO()?.to(bid.freelancerId.toString()).emit(
      "hired",
      `You have been hired for ${gig.title}`
    );

    res.json({ message: "Freelancer hired successfully" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  }
};
