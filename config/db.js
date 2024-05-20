import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://greatstack:123@cluster0.pgedbtu.mongodb.net/food-del').then(() => console.log("Db conncected"))

}