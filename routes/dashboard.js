const express = require('express');
const router = express.Router();
const DashboardData = require('../modules/Dashboard');

// 🔹 Seed Route: Inserts dummy chart data
router.get('/seed', async (req, res) => {
  try {
    await DashboardData.deleteMany(); // Clear existing data

    const seedData = [
      {
        title: "User Growth",
        value: 1500,
        chartType: "bar",
        data: [100, 200, 300, 400, 500, 600, 700],
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
      },
      {
        title: "Revenue",
        value: "$12K",
        chartType: "line",
        data: [500, 800, 1200, 2000, 1800, 2500, 2700],
        labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"]
      },
      {
        title: 'User Demographics',
        chartType: 'pie',
        labels: ['18-25', '26-35', '36-50', '50+'],
        data: [40, 30, 20, 10]
      },
      {
        title: 'Product Popularity',
        chartType: 'doughnut',
        labels: ['A', 'B', 'C', 'D'],
        data: [100, 200, 150, 50]
      },
      {
        title: 'Skill Proficiency',
        chartType: 'radar',
        labels: ['React', 'Node', 'MongoDB', 'SQL', 'AWS'],
        data: [85, 70, 60, 75, 50]
      }
    ];

    await DashboardData.insertMany(seedData);
    res.status(201).json({ message: '✅ Seeded data successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Failed to seed data' });
  }
});

// 🔹 Fetch Route: Returns chart data to frontend
router.get('/', async (req, res) => {
  try {
    const data = await DashboardData.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: '❌ Failed to fetch data' });
  }
});

// 🔸 Post Route: Save new chart and broadcast update
router.post('/', async (req, res) => {
  try {
    const newChart = new DashboardData(req.body); // use the correct model name
    await newChart.save();

    const updated = await DashboardData.find(); // again, same model name
    io.emit('dataUpdated', updated); // 🔄 Send live update

    res.status(201).json(newChart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
