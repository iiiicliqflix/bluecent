import express from "express";
import path from "path";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import mongoose from "mongoose";
import schedule from "node-schedule";
import router from "./router";
import { mongoConfig } from "./config";
import { chargeUsers } from "./controllers/finance";

const app = express();

// Force SSL
app.use((req, res, next) => {
  let sslUrl;

  if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
    sslUrl = ["https://www.bluecent.org", req.url].join("");
    return res.redirect(sslUrl);
  }

  return next();
});

// Use client build
const staticFiles = express.static(path.join(__dirname, "../../client/build"));
app.use(staticFiles);

// MongoDB Config
if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(mongoConfig.db);
}

// Charge stripe accounts every week
schedule.scheduleJob({ hour: 0, minute: 0, dayOfWeek: 0 }, function() {
  chargeUsers();
});

// App settings
mongoose.set("debug", true);
app.use(compression());
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);
app.use("/*", staticFiles);

// Listen on port 8000
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"));
