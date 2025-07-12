import {
    allMenuItems,
    addMenuItem,
    removeMenuItem,
    editMenuItem,
    editMenuAvailability,
    menuByRestaurant
} from '../models/menuModel.js';

export const getAllMenuItems = async (req, res) => {
    try {
        const result = await allMenuItems();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMenuItemsByRestaurant = async (req, res) =>{
    try {
        const { restaurantId } = req.params;
        console.log('restaurantId:', restaurantId);
        const result = await menuByRestaurant(restaurantId);
        res.json(result.rows);
    } catch (err) {
        res.json({error: err.message});
    }
};

export const createMenuItem = async (req, res) => {
    const { restaurant_id, name, price, availability } = req.body;
    if ( !restaurant_id || !name || !price == null) {
        return res.status(400).json({error: "All fields are required"});
    }
    try {
        const result = await addMenuItem( restaurant_id, name, price, availability);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        await removeMenuItem(id);
        res.send("Deleted successfully");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const {name, price} = req.body;

    if (!name  || !price == null) {
        return res.status(400).json({error: "Name and price are required"});
    }
    try {
        const result = await editMenuItem(id, name, price);

        if (result.rows.lenght === 0) {
            return res.json({error: "Menu Item not found"});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const setMenuAvailability = async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;
    if (availability == null) {
        return res.json({error: 'availability is required'});
    }
    try {
        const result = await editMenuAvailability(id, availability);
        if (result.rows.lenght === 0) {
            return res.status(404).json({error: 'Menu Item not found'});
        }
        res.json(result.rows[0]);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
};