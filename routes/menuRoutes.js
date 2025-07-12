import express from 'express';
import {
    getAllMenuItems,
    getMenuItemsByRestaurant,
    createMenuItem,
    deleteMenuItem,
    updateMenuItem,
    setMenuAvailability
} from '../controllers/menuController.js';

const router = express.Router();
router.get('/', getAllMenuItems);
router.get('/restaurant/:restaurantId', getMenuItemsByRestaurant);
router.post('/', createMenuItem);
router.delete('/:id', deleteMenuItem);
router.put('/:id', updateMenuItem);
router.patch('/:id/availability', setMenuAvailability)

export default router;