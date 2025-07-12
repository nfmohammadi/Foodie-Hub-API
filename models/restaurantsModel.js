import db from '../db.js';

export const allRestaurants = ()=> {
    return db.query('SELECT * FROM restaurants ORDER BY id ASC');
};

export const addRestaurant = (name, address, phone) => {
    return db.query(
        'INSERT INTO restaurants (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
        [name, address, phone]
    );
};

export const removeRestaurant = (id) => {
    return db.query ('DELETE FROM restaurants WHERE id = $1', [id]);
};

export const editRestaurant = (id, name, address, phone) => {
    return db.query(
        'UPDATE restaurants SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *',
        [name, address, phone, id]
    );
};