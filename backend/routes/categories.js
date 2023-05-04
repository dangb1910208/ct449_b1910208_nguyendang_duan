const express = require("express");
const router = express.Router();
const categories = require("../models/categories.js");
router
  .route("/")
  .get(async (req, res) => {
    let documents = [];
    try {
      const { active } = req.body;
      if (active) {
        documents = await categories.find({ active: active });
      } else {
        documents = await categories.find({});
      }
      res.send(documents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post(async (req, res) => {
    const c = new categories({
      name: req.body.name,
      active: req.body.active,
    });
    try {
      const newC = await c.save();
      res.status(201).json(newC);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;
