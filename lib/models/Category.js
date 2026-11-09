import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, default: "🍲" },
    image: { type: String, default: "/assets/menu_1.png" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Category = mongoose.models.category || mongoose.model("category", categorySchema);
export default Category;

