import jwt from "jsonwebtoken";

const auth = (
  req: any,
  res: any,
  next: any
) => {

  try {

    const token =
      req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "No Token Found",
      });

    }


    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }

};

export default auth;