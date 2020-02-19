const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
   Raw_Material_Id: { type: String, required: true },
   Raw_Material_Name: { type: String, required: true },
   Quantity: { type: Number, required: true },
   Measuring_Unit: { type: String, required: true },
   Vendor: { type: String, required: true },
   Total_Price: { type: Number, required: true },
   Priority: { type: String, required: true },
   Due_Date: { type: Date, required: true },
   Quotation_Document_URL: [{ type: String, required: true }],
   Status: { type: String, required: true },
   Invoice_Date: { type: Date, required: true },
   Invoice_Amount: { type: Number, required: true },
   Invoice_Document_URL: [{ type: String, required: true }]
});

const reqDetails = mongoose.model('Request_Details', schema);

module.exports = reqDetails;
