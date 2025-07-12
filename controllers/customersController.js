import {
    allCustomers,
    addCustomer,
    removeCustomer,
    editCustomerInfo
} from '../models/customersModel.js';

export const getAllCustomers = async (req, res) => {
    try {
        const result = await allCustomers();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createCustomer = async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({error: "Name and phone are required"});
    }
    try {
        const result = await addCustomer(name, phone);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await removeCustomer(id);
        res.send("Deleted successfully");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const {name, phone} = req.body;

    if (!name  || !phone) {
        return res.status(400).json({error: "All fields are required"});
    }
    try {
        const result = await editCustomerInfo(id, name, phone);

        if (result.rows.lenght === 0) {
            return res.json({error: "Customer not found"});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}