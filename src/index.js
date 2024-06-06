const express = require("express");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const db = require("./models/index");
const app = express();
const setupAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`server running at ${PORT}`);
    if (process.env.SYNC_DB) {
      db.sequelize.sync({ alter: true });
    }
  });
};
setupAndStartServer();
