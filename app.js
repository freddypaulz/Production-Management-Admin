const express = require('express');

const mongoose = require('mongoose');

const passport = require('passport');

//Passport Config
require('./config/passport')(passport);

//DB Config
const db = require('./config/keys').MONGO_URI;

//mongo
mongoose
   .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
   })
   .then(() => {
      console.log('DB connected');
   })
   .catch(err => {
      console.log(err);
   });

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));
app.use('/shifts', require('./routes/shifts'));
app.use('/countries', require('./routes/countries'));
app.use('/states', require('./routes/states'));
app.use('/cities', require('./routes/cities'));
app.use('/measuring-units', require('./routes/measuringUnit'));
app.use('/material-types', require('./routes/materialTypes'));
app.use('/raw-materials', require('./routes/rawMaterials'));
app.use('/request-details', require('./routes/Other/requestDetails'));
app.use('/work-locations', require('./routes/workLocations'));
app.use('/production-units', require('./routes/productionUnits'));
app.use('/products', require('./routes/products'));
app.use('/departments', require('./routes/departments'));

app.listen(5000, () => {
   console.log(`App listening on port ${PORT}!`);
});
