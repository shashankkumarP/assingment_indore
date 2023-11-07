const { verifySignature, decodeSignature } = require("../../utils");

module.exports.SignupAuth = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (
    (!name,
    !email,
    !password ||
      name.length <= 3 ||
      password.length <= 7 ||
      password.include("@#$%^&*"))
  ) {
    return res.status(401).json({ message: "Invalid data" });
  }
  next();
};

module.exports.LoginAuth = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (authorization || authorization.include("Bearer ")) {
    const token = authorization.split(" ")[1];
    const details = await verifySignature(token);
    if (token && details) {
      next();
    }
  }
  return res.status(403).json("Need token")
};

module.exports.AdminAuth= async(req,res,next)=>{
    const authorization = req.headers["authorization"];
  if (authorization || authorization.include("Bearer ")) {
    const token = authorization.split(" ")[1];
    const details = await verifySignature(token);
    if (token && details) {
        let decode = await decodeSignature(token)
      if(decode.role=="Admin"){
        next();
      }
    }
  }
  return res.status(401).json("Only admin has access") 
}