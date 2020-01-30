const express = require('express');
const router = express.Router();
const Roles = require('../models/Role');

router.get('/roles', (req, res, next) => {
   Roles.find({}, { _id: 0 }).then(roles => {
      res.send({ Roles: roles });
   });
});

router.post('/add-role', (req, res) => {
   const { name, description, permissions } = req.body;
   let errors = [];
   if (!name || !permissions) {
      errors.push('Enter all required fields');
   }
   if (name.length > 20) {
      errors.push('Use 20 or less characters for Name');
   }
   if (permissions.length < 1) {
      errors.push('Select atleast one permission');
   }
   if (description.length > 200) {
      errors.push('Use 20 or less characters for Name');
   }
   if (errors.length > 0) {
      res.send({ errors });
   } else {
      Roles.findOne({ name }).then(Role => {
         if (Role) {
            errors.push('Username already taken');
            res.send({ errors });
         } else {
            const newRole = new Roles({
               name,
               description,
               permissions
            });
            newRole.save().then(Role => {
               return res.send(Role);
            });
         }
      });
   }
});

module.exports = router;
