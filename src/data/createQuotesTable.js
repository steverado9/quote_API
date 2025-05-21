import pool from "../config/db.js";

const createQuotesTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS quotes (
        id  SERIAL PRIMARY KEY,
        quote VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        )
    `;
    try {
        await pool.query(queryText);
        console.log("quotes table created if not exists");
    } catch (error) {
        console.log("Error creating quotes table: ", error);
    }
}

export default createQuotesTable;