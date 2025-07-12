import db from '../db.js';
import {
    allOrders,
    addOrder,
    addOrderItem,
    removeOrder,
    editOrderStatus,
    OrderById,
    OrdersByCustomer
} from '../models/ordersModel.js';

export const getAllOrders = async (req, res) => {
    try {
        const result = await allOrders();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const result = await OrderById(id);
        if (result.rows.length === 0) {
            return res.status(404).json({error: 'Order not found'})
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOrdersByCustomer = async (req, res) => {
    try {
        const result = await OrdersByCustomer(customer_id);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const createNewOrder = async (req, res) => {
    const { customer_id, restaurant_id, items } = req.body;
    if ( !customer_id || !restaurant_id || !items || !Array.isArray(items)) {
        return res.status(400).json({error: "All fields are required"});
    }
    try {
        const status = 'pending';
        const ordered_at = new Date();

        // calculate total price
        let total = 0;
        for (const item of items) {
            const { menu_id, quantity } = item;
            const priceResult = await db.query(
                'SELECT price FROM menu_items WHERE id = $1',
                [menu_id]
            );
            if (priceResult.rows.lenght === 0) {
                return res.status(400).json({error: 'Menu item not found'});
            }
            const price = priceResult.rows[0].price;
            total += price * (quantity || 1);
        }
        const orderResult = await addOrder(customer_id, restaurant_id, status, ordered_at, total);
        const order = orderResult.rows[0];

        for (const item of items) {
            const { menu_id, quantity } = item;
            await addOrderItem(order.id, menu_id, quantity || 1);
        }
        res.json({message: 'Order created', order_id: order.id});
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({error: err.message});
    }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await removeOrder(id);
        res.send("Deleted successfully");
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};



export const changeOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.json({error: 'Status is required'});
    }
    try {
        const result = await editOrderStatus(id, status);
        if (result.rows.lenght === 0) {
            return res.status(404).json({error: 'Order not found'});
        }
        res.json(result.rows[0]);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
};