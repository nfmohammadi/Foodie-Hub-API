import express from 'express';
import {
    getAllOrders,
    getOrderById,
    getOrdersByCustomer,
    createNewOrder,
    deleteOrder,
    changeOrderStatus
} from '../controllers/ordersController.js';

const router = express.Router();
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.get('/customer/:customer_id', getOrdersByCustomer);
router.post('/', createNewOrder);
router.delete('/:id', deleteOrder);
router.patch('/:id/status', changeOrderStatus)

export default router;