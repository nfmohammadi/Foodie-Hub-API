import {
    allRestaurants,
    addRestaurant,
    removeRestaurant,
    editRestaurant
} from '../models/restaurantsModel.js';

export const getAllRestaurants = async (req, res) => {
    try {
        const result = await allRestaurants();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createRestaurant = async (req, res) => {
    const { name, address, phone } = req.body;
    if (!name || !address ||!phone) {
        return res.status(400).json({error: "All fields are required"});
    }
    try {
        const result = await addRestaurant(name, address, phone);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await removeCustomer(id);
        res.send("Deleted successfully");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const {name, address, phone} = req.body;

    if (!name  || !address || !phone) {
        return res.status(400).json({error: "All fields are required"});
    }
    try {
        const result = await editRestaurant(id, name, address, phone);

        if (result.rows.lenght === 0) {
            return res.json({error: "Restaurant not found"});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}