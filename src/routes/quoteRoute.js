import express from 'express';
import { createQuote, deleteQuote, getAllQuotes, getQuoteById, updateQuote } from '../controllers/quoteController.js';

const router = express.Router();

router.post("/quote", createQuote);
router.get("/quote", getAllQuotes);
router.get("/quote/:id", getQuoteById);
router.put("/quote/:id", updateQuote);
router.delete("/quote/:id", deleteQuote);

export default router;