const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Check if Authorization header is present and extract the token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Debugging: Log JWT secret and token for confirmation
  console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
  console.log("Token received:", token);

  try {
    // Verify the token with the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log decoded payload to confirm proper decoding
    console.log("Decoded User ID:", decoded.id);
    req.userId = decoded.id; // Attach user ID to request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

module.exports = authMiddleware;
