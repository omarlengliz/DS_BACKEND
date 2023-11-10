const User = require("../models/User");
const jwt = require("jsonwebtoken");
const isLoggedIn = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decoded.id).select("-password");
      console.log(user);
      if (user) {
        req.auth = user;
        next();
      } else return res.status(404).json({ message: "User not found" });
    } catch (error) {
      return res.status(401).json({ message: "Not authorized , token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized , no token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.auth.role != "admin") {
    return res
      .status(403)
      .json({ message: "You are not allowed to access this route" });
  }
  next();
};
const isMyPub = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: req.auth.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.publications.includes(id)) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed to access this route" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isMyPub,
};
