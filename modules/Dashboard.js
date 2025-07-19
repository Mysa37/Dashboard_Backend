const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed, // supports numbers or strings
  chartType: { type: String, required: true },
  data: { type: [Number], default: [] },
  labels: { type: [String], default: [] }
});

const DashboardData = mongoose.model('DashboardData', dashboardSchema);

module.exports = DashboardData;
