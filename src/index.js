import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import quoteRoute from "./routes/quoteRoute.js"
import errorHandling from "./middlewares/errorHandler.js";
import createQuotesTable from "./data/createQuotesTable.js";

dotenv.config();

const app = express();
 
const port = process.env.PORT 

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", quoteRoute);

//Error handling middleware
app.use(errorHandling);

//create table before starting server
createQuotesTable();

//Testing POSTGRES Connection
app.get("/", async (req, res) => {
    //returns current database name
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

//server running
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})