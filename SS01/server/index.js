import http from 'http';
import {customers} from './data.js';
const PORT = 8080;

// 1. Viết API để lấy toàn bộ danh sách khách hàng.
// GET /customers
// Trả về danh sách toàn bộ khách hàng

const server = http.createServer((req, res) => {
    if(req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }
    if (req.url === '/customers') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, count: customers.length, data: customers }));
        return;
    }

    // //2. Lấy thông tin chi tiết của một khách hàng
// Mô tả: Viết API để lấy thông tin chi tiết của một khách hàng dựa trên id.
// Endpoint: GET /customers/:id

    if(req.url.startsWith('/customers/')) {
        const id = req.url.slice('/customers/'.length).split('?')[0]; // bỏ query string
    
        if(!id) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Customer not found' }));
            return;
        }
    
        const customer = customers.find(customer => customer.id === id);
        if(!customer) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Customer not found' }));
            return;
        }
    
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, data: customer, message: 'Customer found' }));
    }
});






server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

