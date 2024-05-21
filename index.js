const express = require("express");
const cors = require("cors");
const dbConfig = require("./utils/dbConfig");
const mainApp = require("./mainApp");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mainApp(app);

const server = app.listen(port, async () => {
  await dbConfig()
    .then(() => {
      console.log(`Server is running on port ${port}`);
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      server.close(() => {
        process.exit(1);
      });
    });
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log("reason: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
