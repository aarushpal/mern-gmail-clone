import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = () => {
  try {
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-7i8kecd-shard-00-00.30ykazb.mongodb.net:27017,ac-7i8kecd-shard-00-01.30ykazb.mongodb.net:27017,ac-7i8kecd-shard-00-02.30ykazb.mongodb.net:27017/?ssl=true&replicaSet=atlas-4oq22l-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.connect(DB_URI, { useNewUrlParser: true });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error.message);
  }
};

export default Connection;
