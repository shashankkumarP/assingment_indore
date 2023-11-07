const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
module.exports.GenerateHashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
module.exports.ComparePasswords = async (user_pass, db_pass) => {
  const newpassword = await this.GenerateHashedPassword(user_pass);
  return newpassword === db_pass;
};

module.exports.GenerateSignature = async (name, email, role) => {
  const token = await jwt.sign({ name, email, role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports.verifySignature = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};
module.exports.decodeSignature = async (token) => {
    return await jwt.decode(token, JWT_SECRET);
  };
