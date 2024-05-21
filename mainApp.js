const userRouter = require("./routers/userRouter");
const apartmentRouter = require("./routers/apartmentRouter");
const reviewRouter = require("./routers/reviewRouter");

const mainApp = (app) => {
  try {
    app.use("/api/v1", userRouter);
    app.use("/api/v1", reviewRouter);
    app.use("/api/v1", apartmentRouter);

    app.use("/", (req, res) => {
      return res.status(200).json({
        data: "Welcome to my API",
      });
    });
  } catch (error) {
    return error;
  }
};

module.exports = mainApp;
