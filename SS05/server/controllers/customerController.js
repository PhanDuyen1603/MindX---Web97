import Customer from '../models/Customer.js';
import Order from '../models/Order.js';

export const getCustomers = async (req, res) => {
    try {
        const list = await Customer.find({}).lean();
        console.log(list);
        res.json(list);
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

export const getCustomerById = async (req, res) => {
    const customer = await Customer.findOne({ id: req.params.id }).lean();
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
};

export const getOrdersByCustomerId = async (req, res) => {
    try {
        const { customerId } = req.params; // lấy customerId từ url
        const orders = await Order.find({ customerId }).lean();
        console.log(orders);
        res.json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

