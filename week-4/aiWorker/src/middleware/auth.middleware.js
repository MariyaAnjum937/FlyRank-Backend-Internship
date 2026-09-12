const supabase = require("../../supabase");

async function authMiddleware(req, res, next) {
  const authorization = req.get("authorization");
  const match = authorization && authorization.match(/^Bearer (\S+)$/);

  if (!match) {
    return res.status(401).json({ error: "Bearer access token required" });
  }

  const token = match[1];
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.token = token;
  req.user = data.user;
  return next();
}

module.exports = authMiddleware;
