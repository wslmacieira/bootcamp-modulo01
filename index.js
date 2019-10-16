const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?users=1
// Route params = /users/1
// Request body = { "name": "Wagner", "email": "wslmacieira@outlook.com"}

//CRUD Create, Read, Update, Delete

const users = ["Diego", "Claudio", "Victor"];

//Middleware global
server.use((req, res, next) => {
  // console.log(`"A requisição foi chamada"`);
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

//Middleware local
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  // Middlewares podem alterar as variaveis (req, res) mais especificamente a req

  req.user = user;

  next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  // const { index } = req.params;
  // const name = req.body.id;
  // return res.json({message: `Hello ${nome}`})
  // return res.json(users[index]);
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  // return res.json(users);
  return res.send();
});

server.listen(3000);
