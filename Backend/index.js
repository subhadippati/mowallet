require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongodbUrl = process.env.MONGODB_URI; // Corrected variable name
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3004;
const mainRouter = require("./routes/index");

app.use("/api/v1", cors(), mainRouter);

mongoose.connect(mongodbUrl)
  .then(() => {
    console.log(`MongoDb connected`);
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });