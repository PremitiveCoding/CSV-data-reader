const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    invoiceId:{
      type:String
  },
  branch:{
      type:String
  },
  city:{
      type: String
  },
  customerType:{
      type:String
  },
  gender:{
      type:String
  },
  productLine:{
      tupe: String
  },
  unitPrice:{
      type:Number
  },
  quantity:{
      type:Number
  },
  taxe5:{
      type: Number
  },
  total:{
      type: Number
  },
  date:{
      type:Date
  },
  time:{
      type:String
  },
  payment:{
      type: String
  },
  cogs:{
      type:Number
  },
  grossMargin:{
      type:Number
  },
  grossIncome:{
      type:Number
  },
  rating:{
      type:Number
  },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
