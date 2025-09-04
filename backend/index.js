import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";

dotenv.config({});
connectDB();

const app = express();

const PORT = 8080;

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`)
});

