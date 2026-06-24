import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    collection: 'orders',
});

export default mongoose.model('Order', orderSchema);