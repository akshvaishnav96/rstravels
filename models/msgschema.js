const mongoose = require("mongoose");
const validator = require("validator");

const msgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: [30, "name shoud be in 30 letters"],
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please Enter A Valid Email");
      }
    },
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt:{ 
    type: Date,
     default: Date.now 
    },
});

const Msg = new mongoose.model("messages", msgSchema);

module.exports = Msg;
