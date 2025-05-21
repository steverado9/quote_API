import {
    createQuoteService,
    getAllQuotesService,
    getQuoteByIdService,
    updateQuoteService,
    deleteQuoteService
} from '../models/quoteModel.js'

// Standardized response function
const handleResponse = (res, status, message, data = null) => {

    res.status(status).json({
        status,
        message,
        data
    });
};

export const createQuote = async (req, res, next) => {
    const { quote, author } = req.body;
    if (!quote || !author) {
         return handleResponse(res, 404, `quote and author are required`);
    }
    try{
        const newQuote = await createQuoteService(quote, author);
        console.log("newQuote", newQuote);
        handleResponse(res, 201, "Quote created successfully", newQuote)
    } catch(err) {
        //get err from error handling middleware
        next(err)
    }
};

export const getAllQuotes = async (req, res, next) => {
    try{
        const quotes = await getAllQuotesService();
        handleResponse(res, 200, "Quote fetched successfully", quotes)
    } catch(err) {
        //get err from error handling middleware
        next(err)
    }
};

export const getQuoteById = async (req, res, next) => {
    try{
        const quote = await getQuoteByIdService(req.params.id);
         if (!quote){
            return handleResponse(res, 404, `quote with id: ${req.params.id} not found`);
         } 
        handleResponse(res, 200, "Quote fetched successfully", quote)
    } catch(err) {
        //get err from error handling middleware
        next(err)
    }
};

export const updateQuote = async (req, res, next) => {
    const { quote, author } = req.body;
    try{
        const updatedQuote = await updateQuoteService(req.params.id, quote, author);
         if (!updatedQuote) return handleResponse(res, 404, `quote with id: ${req.params.id} not found`);
        handleResponse(res, 200, "Quote updated successfully", updatedQuote)
    } catch(err) {
        //get err from error handling middleware
        next(err)
    }
};

export const deleteQuote = async (req, res, next) => {
    try{
        const deletedQuote = await deleteQuoteService(req.params.id);
         if (!deletedQuote) return handleResponse(res, 404, `quote with id: ${req.params.id} not found`);
        handleResponse(res, 200, "Quote deleted successfully")
    } catch(err) {
        //get err from error handling middleware
        next(err)
    }
};

