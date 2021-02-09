var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
const UserController = require('../controller/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db.execute("SELECT * FROM users WHERE username=?", [username])
    .then
    (([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute("SELECT * FROM users WHERE username=?", [username]);
      } else {
        throw new Error("Registration Failed: Username already Exists");
      }
    })
    .then
    (([results, fields]) => {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 10);
      } else {
        throw new Error("Registration Failed: Email already Exists");
      }
    })
    .then
    ((hashedPassword) => {
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());"
      return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        console.log("user was created");
        res.redirect('/');
      } else {
        throw new Error("Server Error, user could not be created");
      }
    })
    .catch((err) => {
      console.log("user could not be made", err);
      if (err instanceof UserError) {
        res.redirect('/');
      } else {
        next(err);
      }
    });
});

router.post('/login', (req, res, next) => {
  UserController.logIn(req, res, next);
});

router.get('/getLoginUsername', (req, res, next) => {
  UserController.getLoginUsername(req, res, next);
});

router.post('/logout', (req, res, next) => {
  UserController.logOut(req, res, next);
});

/*
router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  let baseSQL = "SELECT email, password FROM users WHERE email=? AND password=?;"
  db.execute(baseSQL, [email, password])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        return bcrypt.compare(password, hashedPassword);
      } else {
        throw new Error("invalid email and/or password");
      }

    })
    .then((passwordMatched) => {
      if (passwordMatched) {
        console.log(`User ${username} is logged in`);
        res.cookie("logged", username, { expires: new Date(Date.now() + 900000), httpOnly: false });
        res.redirect('/');
      } else {
        throw new Error("Invalid email and/or password");
      }
    })
    .catch((err) => {
      errorPrint("user login failed");
      if (err instanceof UserError) {
        res.redirect('/');
      } else {
        next(err);
      }

    });
});*/

module.exports = router;


