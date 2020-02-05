const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      maxlength: [20, 'cannot exceed 20 charecters']
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
