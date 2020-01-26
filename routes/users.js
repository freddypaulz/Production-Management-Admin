const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login', (req, res) => {
   res.send('login');
});

router.post('/login', (req, res, next) => {
   passport.authenticate('local', (err, user, info) => {
      if (err) {
         return next(err);
      }
      if (!user) {
         console.log(info);
         return res.json({ message: [info.msg, info.message] });
      }
      res.json(user);
   })(req, res, next);
});

router.get('/register', (req, res) => {
   res.redirect('/users/login');
});

router.post('/register', (req, res) => {
   const { name, password, password2 } = req.body;
   let errors = [];
   console.log(name, password2, password);
   if (!name || !password || !password2) {
      errors.push('Enter all fields');
   }

   if (password.length < 8) {
      errors.push('Password must be above 7 characters');
      console.log(password2, password);
   }
   if (password !== password2) {
      errors.push('Passwords does not match');
   }
   if (errors.length > 0) {
      res.send({
         errors
      });
   } else {
      Users.findOne({ name }).then(User => {
         console.log(User, 'Hello');
         if (User) {
            errors.push('Username already taken');
            res.send({ errors });
         } else {
            const newUser = new Users({
               name,
               password
            });

            //hash password
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;

                  newUser.save().then(user => {
                     //console.log(user);
                  });
               });
            });
            return res.send({ errors });
         }
      });
   }
});

module.exports = router;
