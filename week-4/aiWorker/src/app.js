const express = require("express");
const swaggerUi = require("swagger-ui-express");
const openapiDocument = require("../openapi.json");
const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const protectedRoutes = require("./routes/protected.routes");

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.get("/", (req, res) => {
  res.status(200).json({ message: "AI worker API is running" });
});

app.use("/auth", authRoutes);
app.use("/public", publicRoutes);
app.use("/protected", protectedRoutes);

module.exports = app;
