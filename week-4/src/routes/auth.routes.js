const express = require("express");
const supabase = require("../../supabase");
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// ====================
// STAGE 1 - AUTH ROUTES
// ====================

// SIGN UP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required"
    });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({
        error: error.message
      });
    }

    return res.status(201).json({
      user: data.user
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required"
    });
  }

  try {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      return res.status(401).json({
        error: "Invalid login credentials"
      });
    }

    return res.status(200).json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

// LOGOUT
console.log("authMiddleware:", typeof authMiddleware);
router.post("/logout", authMiddleware, async (req, res) => {
    const { error } = await supabase.auth.signOut(req.token);

    if (error) {
        return res.status(401).json({
            error: "Logout failed"
        });
    }

    return res.status(204).send();
});

module.exports = router;
