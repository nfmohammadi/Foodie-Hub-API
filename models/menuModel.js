import db from '../db.js';

export const allMenuItems = ()=> {
    return db.query('SELECT * FROM menu_items ORDER BY id ASC');
};

export const menuByRestaurant = (restaurantId) => {
    return db.query(
        'SELECT * FROM menu_items WHERE restaurant_id = $1 ORDER BY id ASC',
        [restaurantId]
    );
};

export const addMenuItem = (restaurantId, name, price, availability = true) => {
    return db.query(
        'INSERT INTO menu_items (restaurantId, name, price, availability) VALUES ($1, $2, $3, $4) RETURNING *',
        [restaurantId, name, price, availability]
    );
};

export const removeMenuItem = (id) => {
    return db.query ('DELETE FROM menu_items WHERE id = $1', [id]);
};

export const editMenuItem = (id, name, price) => {
    return db.query(
        'UPDATE menu_items SET name = $1, price = $2, WHERE id = $3 RETURNING *',
        [name, price, id]
    );
};

export const editMenuAvailability = (id, availability) =>{
    return db.query(
        'UPDATE menu_items SET availability = $1 WHERE id = $2 RETURNING *'
        [availability, id]
    );
};