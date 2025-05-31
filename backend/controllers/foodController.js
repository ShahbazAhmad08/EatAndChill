import foodModel from "../model/foodModel.js";
import fs from "fs";
//add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food item added successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error adding food item",
    });
  }
};
//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error fetching food items",
    });
  }
};
// remove food item
const removeFood = async (req, res) => {
  const foodId = req.body.id;
  try {
    const food = await foodModel.findById(foodId);
    fs.unlink(`uploads/${food.image}`, (err) => {});
    await foodModel.findByIdAndDelete(foodId);
    res.json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error removing food item",
    });
  }
};
export { addFood, listFood, removeFood };
