import passport from "passport";
import passportService from "./services/passport";
import { getAccessToken, getTransactions, getPublicToken } from "./controllers/finance";
import {
  login,
  signup,
  verifyAccount,
  setupPayments,
  deleteAccount,
  saveSettings,
  updatePayments
} from "./controllers/user";
import { getCampaigns } from "./controllers/campaign";

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

const router = app => {
  app.post("/get-access-token", requireAuth, getAccessToken);
  app.post("/signup", signup);
  app.post("/verify-account", verifyAccount);
  app.post("/login", requireLogin, login);
  app.post("/setup-payments", requireAuth, setupPayments);
  app.get("/get-transactions", requireAuth, getTransactions);
  app.get("/get-public-token", requireAuth, getPublicToken);
  app.get("/get-campaigns", getCampaigns);
  app.delete("/delete-account", requireAuth, deleteAccount);
  app.patch("/save-settings", requireAuth, saveSettings);
  app.patch("/update-payments", requireAuth, updatePayments);
};

export default router;
