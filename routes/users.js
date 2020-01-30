const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

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

router.get('/users', (req, res, next) => {
   Users.find({}, { name: 1, _id: 0 }).then(user => {
      res.send({ Users: user });
   });
});

router.post('/user', (req, res, next) => {
   console.log(req.body.name);
   Users.find({ name: req.body.name }).then(user => {
      res.send({ Users: user });
   });
});

router.post('/delete-user', (req, res, next) => {
   Users.findOneAndDelete({ name: req.body.name }).then(user => {
      res.send(user);
   });
});

router.get('/add-user', (req, res) => {
   res.send('/users/login');
});

router.post('/add-user', (req, res) => {
   const { name, password, password2 } = req.body;
   let errors = [];
   console.log(name, password2, password);
   if (!name || !password || !password2) {
      errors.push('Enter all required fields');
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
router.post('/update-user', (req, res) => {
   let { name, password, password2 } = req.body;
   let EncryptPass = '';

   let errors = [];
   if (!name || !password || !password2) {
      errors.push('Enter all required fields');
   }

   if (password.length < 8) {
      errors.push('Password must be above 7 characters');
      console.log(password2, password);
   }
   if (password !== password2) {
      errors.push('Passwords does not match');
   } else {
      //console.log(EncryptPass);
   }
   if (errors.length > 0) {
      res.send({
         errors
      });
   } else {
      // hash password
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            EncryptPass = hash;
            console.log(EncryptPass);

            //Update
            Users.findOneAndUpdate(
               { name },
               { name, password: EncryptPass }
            ).then(User => {
               if (!User) {
                  errors.push('Username Not Found');
                  res.send({ errors });
               } else {
                  return res.send(User);
               }
            });
         });
      });
   }
});

module.exports = router;
