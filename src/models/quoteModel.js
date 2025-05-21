import pool from "../config/db.js";

export const getAllQuotesService = async () => {
    const result = await pool.query("SELECT * FROM quotes");
    return result.rows;
};

export const getQuoteByIdService = async (id) => {
    //$1 is a parameter placeholder to prevent SQL injection.
    const result = await pool.query("SELECT * FROM quotes WHERE id = $1", [id]);
    return result.rows[0];
};

export const createQuoteService = async (quote, author) => {

    //$1 and $2 are placeholders and RETURNING * get all the columns
    const result = await pool.query(
        "INSERT INTO quotes (quote, author) VALUES ($1, $2) RETURNING *",
        [quote, author]
    );
    
    return result.rows[0];
};

export const updateQuoteService = async (id ,quote, author) => {
    const result = await pool.query(
        "UPDATE quotes SET quote=$1, author=$2 WHERE id=$3 RETURNING *",
        [quote, author, id]
    );
    return result.rows[0];
};

export const deleteQuoteService = async (id) => {
    const result = await pool.query(
        "DELETE FROM quotes WHERE id=$1 RETURNING *",
        [id]
    );
    return result.rows[0];
};

