import express from 'express';
import {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer
} from '../controllers/customersController.js';

const router = express.Router();
router.get('/', getAllCustomers);
router.post('/', createCustomer);
router.delete('/:id', deleteCustomer);
router.put('/:id', updateCustomer);

export default router;