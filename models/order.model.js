const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    order_date: {
      type: Date,
      required: true,
      default : () => {
        return Date.now();
      }
    },
    amount : {
      type : Number,
      required : true
    }
  }, { timestamps: true })

exports.Order = mongoose.model(
  "order", orderSchema
);
