import express from 'express';
// import {customers} from './data.js';
import Customer from './models/Customer.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.get('/customers', async (req, res) => {
    try {
        const list = await Customer.find({}).lean();
        console.log(list);
        res.json(list);
    } catch (error) {
        console.error('Failed to fetch customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

app.get('/customers/:id', async (req, res) => {
    const customer= await Customer.findOne({id: req.params.id}).lean();
    if(!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
});


// const JSON_SERVER = 'http://localhost:3003';

// // 1. Viết API để lấy toàn bộ danh sách khách hàng.
// // GET /customers
// // Trả về danh sách toàn bộ khách hàng

// // app.get('/customers', (req, res) => {
// //     res.json(customers);
// // });

// // // 2. Lấy thông tin chi tiết của một khách hàng
// // // Viết API để lấy thông tin chi tiết của một khách hàng dựa trên id.
// // // Endpoint: GET /customers/:id
// // // Ví dụ:
// // //  /customers/1  -> trả về thông tin customer có id là 1
// // // /customers/2   -> trả về thông tin customer có id là 2
// // // :id sẽ đại diện như một biến trên url
// // // Yêu cầu: Trả về thông tin của một khách hàng cụ thể dựa trên id được truyền vào URL

// // app.get("/customers/:id", (req, res) => {
// //     const id = req.params.id; // lấy id từ url // /customers/1 -> 1
// //     const customer = customers.find(customer => customer.id === id); // tìm khách hàng có id tương ứng
    
// //     if(!customer) {
// //         return res.status(404).json({ error: 'Customer not found' });
// //     }
// //     res.json(customer);
// // });

// // // 6. Thêm mới khách hàng
// // // Viết API để thêm một khách hàng mới vào danh sách khách hàng.
// // // POST /customers
// // // Yêu cầu:
// // // Nhận thông tin khách hàng từ body của request (bao gồm, name, email, và age).
// // // Thêm khách hàng mới vào mảng customers và trả về thông tin khách hàng mới thêm.
// // // id phải được sinh ra ngẫu nhiên, không được phép trùng (có thể dùng module crypto)
// // // email là duy nhất, không được trùng.

// // app.post("/customers", (req, res) => {
// //     const { name, email, age } = req.body || {};

// //     //validate data
// //     if(!name || !email || age === undefined) {
// //         return res.status(400).json({ error: 'Missing required fields' });
// //     }

// //     const isEmailUsed = customers.some((c) => c.email === email);

// //     if(isEmailUsed) {
// //         return res.status(400).json({ error: 'Email already exists' });
// //     }

// //     let id = crypto.randomUUID();
// //     while(customers.some((c) => c.id === id)) {
// //         id = crypto.randomUUID();
// //     }

// //     const newCustomer = { id, name, email, age };
// //     customers.push(newCustomer);

// //     return res.status(201).json({newCustomer});
// // });

// // 9. DELETE - Xóa khách hàng
// // Viết API để xóa một khách hàng dựa trên id.
// // DELETE /customers/:id
// // Yêu cầu:
// // Xóa khách hàng có id tương ứng khỏi mảng customers.
// // Nếu không tìm thấy khách hàng, trả về lỗi 404.
// // Trả về thông báo thành công sau khi xóa.
// // app.delete("/customers/:id", (req, res) => {
// //     const id = req.params.id;
// //     const index = customers.findIndex(customer => customer.id === id);

// //     if(index === -1){
// //         return res.status(404).json({ error: 'Customer not found' });
// //     }

// //     customers.splice(index, 1);

// //     return res.json({ message: 'Customer deleted successfully' });
// // });

// // 3. Lấy danh sách đơn hàng của một khách hàng cụ thể
// // Viết API để lấy danh sách các đơn hàng của một khách hàng cụ thể dựa trên customerId.
// // Endpoint: GET /customers/:customerId/orders
// // Ví dụ: /customers/1/orders  -> Trả về danh sách orders của customer có id là 1
// // Yêu cầu: Trả về danh sách tất cả đơn hàng của một khách hàng dựa trên customerId. Nếu khách hàng không có đơn hàng nào, trả về danh sách rỗng.

// app.get("/customers/:customerId/orders", async (req, res) => {
//     const { customerId } = req.params;

//     try {
//         const response = await fetch(`${JSON_SERVER}/orders?customerId=${customerId}`);
//         if(!response.ok) {
//             return res.status(response.status).json({ error: 'Failed to fetch orders' });
//         }
//         const orders = await response.json();
//         return res.json(Array.isArray(orders) ? orders : []);
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// });

// // 4. Lấy thông tin các đơn hàng với tổng giá trị trên 10 triệu
// // Viết API để lấy danh sách các đơn hàng có tổng giá trị (totalPrice) trên 10 triệu.
// // Endpoint: GET /orders/highvalue
// // Yêu cầu: Trả về danh sách các đơn hàng có totalPrice lớn hơn 10 triệu.

// app.get("/orders/highvalue", async (req, res) => {
//     try {
//         const response = await fetch(`${JSON_SERVER}/orders`);
//         if(!response.ok) {
//             return res.status(response.status).json({ error: 'Failed to fetch orders' });
//         }
//         const orders = await response.json();
//         if(!Array.isArray(orders)) {
//             return res.json([])
//         }
//         const result = orders.filter(order => order.totalPrice > 10000000);
//         return res.json(result);
//     } catch (error) {
//         return res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// });

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
startServer();

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });