const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at
  });
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to your dashboard",
    user: req.user.email
  });
});

module.exports = router;
