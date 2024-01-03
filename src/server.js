const https = require(`https`);
const express = require("express");
const app = express();
const fs = require("fs");
const config = require("../config/config");
const token = require("../token/token");
const { v4: uuidv4 } = require("uuid");

app.use(express.static(__dirname));

app.get("/mashup", (req, res) => {
  let mashFile = fs.readFileSync("./index.html", "utf8");
  res.write(mashFile);
  res.end();
});

app.get("/config", (req, res) => {
  res.json(config);
  res.end();
});

app.get("/token", (req, res) => {
  const uuid = uuidv4();
  const sub = `ANON_${uuid}`;
  const name = 'Anonymous';
  const email = `${uuid}@anonymoususer.anon`;
  const groups = ['anonymous'];
  
  const genT = token.generate(sub, name, email, groups);
  res.json({ token: genT });
  console.log(genT);
});

//create a server object:
//app.listen(443); //the server object listens on port 443

const options = {
  key: fs.readFileSync(`./key.pem`),
  cert: fs.readFileSync(`./cert.pem`)
};

https.createServer(options, app).listen(443);