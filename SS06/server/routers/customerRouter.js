import { Router } from 'express';
import { getCustomers, getCustomerById, getOrdersByCustomerId, createApiKey } from '../controllers/customerController.js';
import { verifyApiKey } from '../middleware/verifyApiKey.js';

const router = Router();

router.post('/getApiKey/:id', createApiKey);

router.get('/', getCustomers);
router.get('/:customerId/orders',verifyApiKey, getOrdersByCustomerId);

router.get('/:id', verifyApiKey, getCustomerById);





export default router;