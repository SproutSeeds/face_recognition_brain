const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "1",
      name: "Cody",
      email: "codyshane@gmail.com",
      password: "secret",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "2",
      name: "Carey",
      email: "CareyCares@gmail.com",
      password: "secret2",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("error loggin in");
  }
  res.json("signin");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function (err, hash) {
    console.log(hash);
  });
  database.users.push({
    id: "14",
    name: name,
    email: email,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(400).json("user not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(400).json("user not found");
  }
});

app.listen((port = 3000), () => {
  console.log("app is running on port:", port);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/

// bcrypt.compare(
//     "secrets",
//     "$2a$10$g10I3i/jqqYrbcfXmXx2hO3RPktmfid71bFAPBUWaY8/6PXzBJ2si",
//     function (err, res) {
//       console.log("first guess", res);
//     }
//   );
//   bcrypt.compare(
//     "secrets",
//     "$2a$10$UulAm9/xBRmwEc0HwLR1iu.JPt57hXI9GQSAcWge1LSNZvyu9XsIi",
//     function (err, res) {
//       console.log("second guess", res);
//     }
//   );
