const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AgentSchema = new Schema({
  agent: {
    agentCode: { type: String, max: 6 },
    agentName: { type: String, max: 40 },
    agentPhone: { type: String, max: 15 },
    workingArea: { type: String, max: 35 },
    commisions: { type: Number },
    country: { type: String, max: 25 },
    createDate: { type: Date, default: Date.now }
  }
});
// Export the model
module.exports = mongoose.model("Agent", AgentSchema);
