const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  project: {
    projectName: { type: String }
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
