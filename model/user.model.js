const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  user: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    verified: { type: Boolean }
  }
});
// Export the model
module.exports = mongoose.model("User", UserSchema);
