import db from '../db.js';

export const allOrders = ()=> {
    return db.query('SELECT * FROM orders ORDER BY id ASC');
};

export const OrderById = (id) => {
    return db.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
    );
};

export const OrdersByCustomer = (customer_id) => {
    return db.query(
        'SELECT * FROM orders WHERE customer_id = $1',
        [customer_id]
    );
};

export const addOrder = (customer_id, restaurant_id, status = 'pending', ordered_at = new Date(), total) => {
    return db.query(
      `INSERT INTO orders (customer_id, restaurant_id, status, ordered_at, total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [customer_id, restaurant_id, status, ordered_at, total]
    );
  };
  


  export const addOrderItem = (order_id, menu_id, quantity) => {
    return db.query(
      `INSERT INTO order_items (order_id, menu_id, quantity)
       VALUES ($1, $2, $3)`,
      [order_id, menu_id, quantity]
    );
  };
  

export const removeOrder = (id) => {
    return db.query ('DELETE FROM orders WHERE id = $1', [id]);
};


export const editOrderStatus = (id, status) =>{
    return db.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *'
        [status, id]
    );
};