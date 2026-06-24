import Customer from '../models/Customer.js';

export const verifyApiKey = async (req, res, next) => {
    try {
        const { apiKey } = req.query;
        if (!apiKey) {
            return res.status(401).json({ error: 'Thieu APIKey' });
        }
        const customer = await Customer.findOne({ apiKey });
        if (!customer) {
            return res.status(401).json({ error: 'APIKey khong hop le' });
        }
        req.customer = customer;
        next();
    } catch (error) {
        console.error('Failed to verify api key:', error);
        res.status(500).json({ error: 'Failed to verify api key' });
    }
};
