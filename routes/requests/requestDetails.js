const reqDetails = require('../../models/Requests/RequestDetails');
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
   reqDetails.find({}, function(err, data) {
      if (err) throw err;
      res.send(data);
   });
});

router.post('/request-details', (req, res) => {
   if (req.body.Edit) {
      var _Id = req.body.Edit._id;
      var vendor = req.body.Edit.vendor;
      var amount = req.body.Edit.amount;
      //var qURL = req.body.Edit.quotationURL;
      var quantity = req.body.Edit.quantity;
      var munit = req.body.Edit.munit;
      var status = req.body.Edit.status;
      reqDetails.findByIdAndUpdate(
         {
            _id: _Id
         },
         {
            $set: {
               Quantity: quantity,
               Measuring_Unit: munit,
               Vendor: vendor,
               Total_Price: amount,
               //Quotation_Document_URL: qURL,
               Status: status
            }
         },
         { useFindAndModify: false },
         function(err) {
            if (err) {
               throw err;
            } else {
               // console.log(
               //    '_id:',
               //    _Id,
               //    ' vendor: ',
               //    vendor,
               //    ' amount: ',
               //    amount,
               //    'quotationURL: ',
               //    qURL,
               //    ' status: ',
               //    status
               // );
            }
         }
      );
   }

   if (req.body.Status) {
      var _Id = req.body.Status._id;
      var status = req.body.Status.status;
      console.log('Status: ', status);
      reqDetails.findByIdAndUpdate(
         { _id: _Id },
         {
            $set: {
               Status: status
            }
         },
         { useFindAndModify: false },
         function(err) {
            if (err) {
               throw err;
            } else {
               console.log(status);
            }
         }
      );
   }
});

router.post('/request-details-filter', (req, res) => {
   console.log('req body: ', req.body);

   const {
      from_date,
      to_date,
      from_quantity,
      to_quantity,
      measuring_unit,
      raw_material_id,
      status,
      raw_material_code,
      from_total_price,
      to_total_price,
      vendor
   } = req.body;

   let conditions = {};
   if (from_date && to_date) {
      conditions.date = {
         $gte: new Date(from_date),
         $lte: new Date(to_date)
      };
   }

   if (status) {
      conditions.Status = status;
   }

   if (raw_material_id) {
      conditions.Raw_Material_Id = raw_material_id;
   }

   if (vendor) {
      conditions.Vendor = vendor;
   }

   if (raw_material_code) {
      conditions.Raw_Material_Code = raw_material_code;
   }

   if (measuring_unit) {
      conditions.Measuring_Unit = measuring_unit;
   }

   if (from_quantity && to_quantity) {
      conditions.Quantity = {
         $gte: from_quantity,
         $lte: to_quantity
      };
   }

   if (from_total_price && to_total_price) {
      conditions.Total_Price = {
         $gte: from_total_price,
         $lte: to_total_price
      };
   }
   console.log('query: ', conditions);
   reqDetails.find(conditions).then(reqDetails => {
      res.send(reqDetails);
   });
});

module.exports = router;
