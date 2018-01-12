import Campaign from "../models/campaign";

export const getCampaigns = (req, res, next) => {
  Campaign.find({}, (err, campaigns) => {
    if (err) {
      return next(err);
    }

    return res.json({ campaigns });
  });
};

const getCampaign = (res, req, next) => {};
