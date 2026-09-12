const express = require("express");
const supabase = require("../../supabase");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

function hasCredentials(body) {
  return body && typeof body.email === "string" && typeof body.password === "string" && body.email.trim() && body.password;
}

router.post("/signup", async (req, res) => {
  if (!hasCredentials(req.body)) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({ user: data.user });
});

router.post("/login", async (req, res) => {
  if (!hasCredentials(req.body)) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });

  if (error || !data.session) {
    return res.status(401).json({ error: "Invalid login credentials" });
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    token_type: "bearer",
    expires_in: data.session.expires_in,
    user: data.user
  });
});

router.post("/logout", authMiddleware, (req, res) => {
  return res.status(204).send();
});

module.exports = router;
