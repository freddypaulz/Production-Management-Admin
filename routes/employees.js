const express = require('express');
const router = express.Router();
const Employees = require('../models/Employee');

router.get('/employees', (req, res, next) => {
   Employees.find({}).then(Employees => {
      res.send({ Employees });
   });
});

router.post('/employee', (req, res) => {
   Employees.find({ _id: req.body._id }).then(Employee => {
      res.send({ Employee });
   });
});

router.post('/employee-name', (req, res) => {
   Employees.find({ employee_name: req.body.employee_name }).then(Employee => {
      res.send({ Employee });
   });
});

router.post('/add-employee', (req, res) => {
   const {
      employee_first_name,
      employee_middle_name,
      employee_last_name,
      employee_dob,
      employee_age,
      employee_gender,
      employee_mobile_no,
      employee_email,
      employee_father_or_spouse_name,
      employee_no_of_children,
      employee_address,
      employee_country,
      employee_state,
      employee_city,
      employee_postal_code,
      employee_id,
      employee_date_of_joinig,
      employee_designation,
      employee_salary,
      employee_work_location,
      employee_shift,
      employee_bank_account_no,
      employee_bank_name,
      employee_bank_branch,
      employee_bank_ifsc
   } = req.body;
   let errors = [];

   if (
      !employee_first_name ||
      !employee_dob ||
      !employee_age ||
      !employee_gender ||
      !employee_mobile_no ||
      !employee_father_or_spouse_name ||
      !employee_id ||
      !employee_date_of_joinig ||
      !employee_designation ||
      !employee_salary ||
      !employee_work_location ||
      !employee_shift ||
      !employee_bank_account_no ||
      !employee_bank_name ||
      !employee_bank_branch ||
      !employee_bank_ifsc
   ) {
      errors.push('Enter all required fields');
   }

   if (employee_first_name.length > 15) {
      errors.push('Use 15 or less characters for Name');
   }
   if (employee_middle_name.length > 15) {
      errors.push('Use 15 or less characters for Name');
   }
   if (employee_last_name.length > 15) {
      errors.push('Use 15 or less characters for Name');
   }
   if (errors.length > 0) {
      res.send({ errors });
   } else {
      Employees.findOne({ employee_id }).then(Employee => {
         if (Employee) {
            errors.push('Employee with the id already exist');
            res.send({ errors });
         } else {
            const newEmployee = new Employees({
               employee_first_name,
               employee_middle_name,
               employee_last_name,
               employee_dob,
               employee_age,
               employee_gender,
               employee_mobile_no,
               employee_email,
               employee_father_or_spouse_name,
               employee_no_of_children,
               employee_address,
               employee_country,
               employee_state,
               employee_city,
               employee_postal_code,
               employee_id,
               employee_date_of_joinig,
               employee_designation,
               employee_salary,
               employee_work_location,
               employee_shift,
               employee_bank_account_no,
               employee_bank_name,
               employee_bank_branch,
               employee_bank_ifsc
            });
            newEmployee.save().then(Employee => {
               return res.send({ Employee, errors });
            });
         }
      });
   }
});

router.post('/edit-employee', (req, res) => {
   const {
      _id,
      employee_first_name,
      employee_middle_name,
      employee_last_name,
      employee_dob,
      employee_age,
      employee_gender,
      employee_mobile_no,
      employee_email,
      employee_father_or_spouse_name,
      employee_no_of_children,
      employee_address,
      employee_country,
      employee_state,
      employee_city,
      employee_postal_code,
      employee_id,
      employee_date_of_joinig,
      employee_designation,
      employee_salary,
      employee_work_location,
      employee_shift,
      employee_bank_account_no,
      employee_bank_name,
      employee_bank_branch,
      employee_bank_ifsc
   } = req.body;
   let errors = [];

   if (
      !employee_first_name ||
      !employee_dob ||
      !employee_age ||
      !employee_gender ||
      !employee_mobile_no ||
      !employee_father_or_spouse_name ||
      !employee_id ||
      !employee_date_of_joinig ||
      !employee_designation ||
      !employee_salary ||
      !employee_work_location ||
      !employee_shift ||
      !employee_bank_account_no ||
      !employee_bank_name ||
      !employee_bank_branch ||
      !employee_bank_ifsc
   ) {
      errors.push('Enter all required fields');
   }

   if (employee_first_name.length > 15) {
      errors.push('Use 15 or less characters for Name');
   }
   if (employee_middle_name.length > 15) {
      errors.push('Use 15 or less characters for Name');
   }
   if (employee_last_name.length > 15) {
      errors.push('Use 15 or less characters for Name');
   }
   if (employee_first_name) {
      Employees.find({ employee_first_name }).then(Employee => {
         if (typeof Employee[0] !== 'undefined') {
            if (Employee[0]._id != _id) {
               errors.push('Employee name must be unique');
            }
         }
         if (errors.length > 0) {
            return res.send({ errors });
         } else {
            Employees.findOneAndUpdate(
               { _id },
               {
                  employee_first_name,
                  employee_middle_name,
                  employee_last_name,
                  employee_dob,
                  employee_age,
                  employee_gender,
                  employee_mobile_no,
                  employee_email,
                  employee_father_or_spouse_name,
                  employee_no_of_children,
                  employee_address,
                  employee_country,
                  employee_state,
                  employee_city,
                  employee_postal_code,
                  employee_id,
                  employee_date_of_joinig,
                  employee_designation,
                  employee_salary,
                  employee_work_location,
                  employee_shift,
                  employee_bank_account_no,
                  employee_bank_name,
                  employee_bank_branch,
                  employee_bank_ifsc
               }
            )
               .then(Employee => {
                  if (!Employee) {
                     errors.push('Employee Not found');
                     return res.send({ errors });
                  } else {
                     return res.send({ Employee, errors });
                  }
               })
               .catch(err => {
                  return res.send(err);
               });
         }
      });
   }
});

router.post('/delete-employee', (req, res) => {
   Employees.findOneAndDelete({ _id: req.body._id }).then(Employee => {
      res.send(Employee);
   });
});

module.exports = router;
