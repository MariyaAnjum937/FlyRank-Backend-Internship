const express = require("express");
require("dotenv").config();
const supabase = require("./supabase");
const app = express();

app.use(express.json());



const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Server running and connected to Supabase");
});