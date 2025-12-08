const xlsx = require("xlsx");
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
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
//Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income delete successfully" });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
//Donwload Income Excel
exports.downloadIncomeExcel = async (req, res) => {
  // const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    //Preparre data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
