const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  genrePreferences: {
    Action: { type: Number, default: 50 },
    Comedy: { type: Number, default: 50 },
    Drama: { type: Number, default: 50 },
    Mystery: { type: Number, default: 50 },
    SciFi: { type: Number, default: 50 },
    Romance: { type: Number, default: 50 },
  },
  selectedMood: { type: String, default: '' },
});
const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;