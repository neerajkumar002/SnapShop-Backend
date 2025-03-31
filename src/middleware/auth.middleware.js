import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    // 1.get cookies 
    const { token } = req.cookies; 
    if (!token) {
      return res
        .status(500)
        .json({ success: false, messag: "unauthorized user!:" });
    }

    //2. decode token
    const decodeToken = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, messag: "unauthorized user!" });
  }
};

export { authMiddleware };
