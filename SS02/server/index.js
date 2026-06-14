import express from 'express';
import {customers} from './data.js';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const PORT = 8080;

// 1. Viết API để lấy toàn bộ danh sách khách hàng.
// GET /customers
// Trả về danh sách toàn bộ khách hàng

app.get('/customers', (req, res) => {
    res.json(customers);
});

// 2. Lấy thông tin chi tiết của một khách hàng
// Viết API để lấy thông tin chi tiết của một khách hàng dựa trên id.
// Endpoint: GET /customers/:id
// Ví dụ:
//  /customers/1  -> trả về thông tin customer có id là 1
// /customers/2   -> trả về thông tin customer có id là 2
// :id sẽ đại diện như một biến trên url
// Yêu cầu: Trả về thông tin của một khách hàng cụ thể dựa trên id được truyền vào URL

app.get("/customers/:id", (req, res) => {
    const id = req.params.id; // lấy id từ url // /customers/1 -> 1
    const customer = customers.find(customer => customer.id === id); // tìm khách hàng có id tương ứng
    
    if(!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
});

// 6. Thêm mới khách hàng
// Viết API để thêm một khách hàng mới vào danh sách khách hàng.
// POST /customers
// Yêu cầu:
// Nhận thông tin khách hàng từ body của request (bao gồm, name, email, và age).
// Thêm khách hàng mới vào mảng customers và trả về thông tin khách hàng mới thêm.
// id phải được sinh ra ngẫu nhiên, không được phép trùng (có thể dùng module crypto)
// email là duy nhất, không được trùng.

app.post("/customers", (req, res) => {
    const { name, email, age } = req.body || {};

    //validate data
    if(!name || !email || age === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const isEmailUsed = customers.some((c) => c.email === email);

    if(isEmailUsed) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    let id = crypto.randomUUID();
    while(customers.some((c) => c.id === id)) {
        id = crypto.randomUUID();
    }

    const newCustomer = { id, name, email, age };
    customers.push(newCustomer);

    return res.status(201).json({newCustomer});
});

// 9. DELETE - Xóa khách hàng
// Viết API để xóa một khách hàng dựa trên id.
// DELETE /customers/:id
// Yêu cầu:
// Xóa khách hàng có id tương ứng khỏi mảng customers.
// Nếu không tìm thấy khách hàng, trả về lỗi 404.
// Trả về thông báo thành công sau khi xóa.
app.delete("/customers/:id", (req, res) => {
    const id = req.params.id;
    const index = customers.findIndex(customer => customer.id === id);

    if(index === -1){
        return res.status(404).json({ error: 'Customer not found' });
    }

    customers.splice(index, 1);

    return res.json({ message: 'Customer deleted successfully' });
});






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});