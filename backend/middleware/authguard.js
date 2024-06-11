const jwt = require("jsonwebtoken");
const authGuard = (req, res, next) => {
  //check incomming data
  console.log(req.headers); //pass

  //get authoriazation data from headers
  const authHeader = req.headers.authorization;

  //check or validate
  if (!authGuard) {
    return res.status(400).json({
      success: false,
      message: "Auth Header not found!",
    });
  }
  // split the data(format:'bearer token-sdfg')---only token
  const token = authHeader.split(" ")[1];

  // if token not found: stop the process(res)
  if (!token || token == " ") {
    return res.status(400).json({
      success: false,
      message: "Token not found!",
    });
  }
  //verify
  try {
    const decodeUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user= decodeUserData;
    next()


  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "Not Authenticated!",    
    });
  }
  //if verified :next (function in controller)
  //not verified : not auth
};
module.exports = {
  authGuard,
};
