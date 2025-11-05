const User = require("../models/User");
const Income = require("../models/Income");
//Add Income Source

exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  const { icon, source, amount, date } = req.body;

  //Validation check vor missing  fields

  try {
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newIcome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIcome.save();
    res.status(200).json(newIcome);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
//Get All Income Sources
exports.getAllIncome = async (req, res) => {};
//Delete Income Source
exports.deleteIncome = async (req, res) => {};
//Donwload Income Excel
exports.downloadIncomeExcel = async (req, res) => {};


