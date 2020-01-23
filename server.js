const express = require('express');

const app = express();

app.get('/api/customers', (req, res, next) => {
   let customers = [
      {
         success: true,
         data: 'Hello'
      },
      {
         success: true,
         data: 'world'
      }
   ];
   res.json(customers);
});

const PORT = 5000;

app.listen(PORT, () => {
   console.log(`App listening on port ${PORT}!`);
});
