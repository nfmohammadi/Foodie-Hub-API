import express from 'express';
import {
    getAllRestaurants,
    createRestaurant,
    deleteRestaurant,
    updateRestaurant
} from '../controllers/restaurantsController.js';

const router = express.Router();
router.get('/', getAllRestaurants);
router.post('/', createRestaurant);
router.delete('/:id', deleteRestaurant);
router.put('/:id', updateRestaurant);

export default router;