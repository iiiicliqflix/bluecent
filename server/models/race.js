import { Schema, model } from "mongoose";

const raceSchema = new Schema({
  district: String,
  districtAbbrev: String,
  incumbent: String,
  level: String,
  type: String,
  points: { type: Number, default: 0 },
  incumbentParty: String,
  rCandidate: String,
  dCandidate: String,
  iCandidate: String,
  completedPrimary: Boolean,
  cookRating: String,
  totalRaised: { type: Number, default: 0 }
});

export default model("race", raceSchema);
