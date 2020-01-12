const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  project: {
    projectName: { type: String }
  }
});
// Export the model
module.exports = mongoose.model("Project", ProjectSchema);
