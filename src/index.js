require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/send"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 API escuchando en http://localhost:${PORT}`)
);
