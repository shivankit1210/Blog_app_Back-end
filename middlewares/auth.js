const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const USERSCHEMA = require("../models/users.model");

exports.authentication = async (req, res, next) => {
//   console.log(req.cookies);
  let token = req?.cookies?.mycookie;

  if (!token) {
    res.status(400).json({ message: "Please login in to acces the resource" });
  }
//   next();

  let decoded = jwt.verify(token, JWT_SECRET);
  //decoding the token extracted from  req using verify

  console.log(decoded);
  // {id:jadjnsdjnfsdnfoni,iat:17356634, exp:1732771576}

  let user = await USERSCHEMA.findById(decoded.id)
  console.log(user)
  req.myUser = user // Adding a myUser Property to req object and it's value is user data
  next();
};
