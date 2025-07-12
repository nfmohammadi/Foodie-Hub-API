import db from '../db.js';

export const allCustomers = ()=> {
    return db.query('SELECT * FROM customers ORDER BY id ASC');
};

export const addCustomer = (name, phone) => {
    return db.query(
        'INSERT INTO customers (name, phone) VALUES ($1, $2) RETURNING *',
        [name, phone]
    );
};

export const removeCustomer = (id) => {
    return db.query ('DELETE FROM customers WHERE id = $1', [id]);
};

export const editCustomerInfo = (id, name, phone) => {
    return db.query(
        'UPDATE restaurants SET name = $1, phone = $2 WHERE id = $3 RETURNING *',
        [name, phone, id]
    );
}