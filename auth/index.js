const jwt = require("jsonwebtoken");

const [, , option, secret, nameOrToken] = process.argv;

if (!option || !secret || !nameOrToken) {
  return console.log("Missing arguments");
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

switch (option) {
  case "sign":
    console.log(signToken({ sub: nameOrToken }, secret));
    break;
  case "verify":
    console.log(verifyToken(nameOrToken, secret));
    break;
  default:
    console.log("option needs to be 'sign' or 'verify'");
    break;
}
