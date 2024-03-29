const jsonWebToken = require("jsonwebtoken");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/config");

const key = fs.readFileSync("./privatekey.pem", "utf8");

const methods = {
  generate: function (sub, name, email, groups = []) {
    // kid and issuer have to match with the IDP config and the audience has to be qlik.api/jwt-login-session

    const signingOptions = {
      "keyid": config.keyid,
      "algorithm": "RS256",
      "issuer": config.issuer,
      "expiresIn": "30s", //Expires 30 seconds after the issue date/time.
      "notBefore": "1s", //JWT is valid 1 second after the issue date/time.
      "audience": "qlik.api/login/jwt-session"
    };

    // These are the claims that will be accepted and mapped anything else will be ignored. sub, subtype and name are mandatory.
    
    const payload = {
      jti: uuidv4(),
      sub: sub,
      subType: "user",
      name: name,
      email: email,
      email_verified: true,
      groups: groups
    };

    const token = jsonWebToken.sign(payload, key, signingOptions);
    return token;
  }
};

module.exports = methods;