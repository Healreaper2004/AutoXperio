const express = require("express");
const Invoice = require("../models/Bill");
const router = express.Router();

router.get("/", async (req, res) => {
  const invoices = await Invoice.find();
  res.json(invoices);
});

router.post("/", async (req, res) => {
  const newInvoice = new Invoice(req.body);
  await newInvoice.save();
  res.json({ message: "Invoice generated" });
});

module.exports = router;
