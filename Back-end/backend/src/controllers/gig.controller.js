import Gig from "../models/Gig.js";

export const getGigs = async (req, res) => {
  const search = req.query.search || "";
  // const gigs = await Gig.find({
  //   status: "open",
  //   title: { $regex: search, $options: "i" },
  // });
  // NEW
  const gigs = await Gig.find();

  res.json(gigs);
};

export const createGig = async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id,
  });
  res.json(gig);
};

export const getGigById = async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }
  res.json(gig);
};
