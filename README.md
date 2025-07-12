# Foodie Hub - Backend API

A simple RESTful backend for Foodie Hub, a public food ordering system. Browse restaurants, pick your favorite dishes, and place an order!

## Tech Stack

- Node.js + Express
- PostgreSQL (via `pg`)
- Raw SQL 
- Modular MVC structure

## ⚙️ Setup Instructions

1. Clone the repository 
2. Install dependencies  
   ```bash
   npm install express ejs pg dotenv
3. Create your .env file using the template .env.example
4. Start the server

## API Endpoints 

**Restaurants**
- GET /restaurants – List all
- POST /restaurants – Add one
- PUT /restaurants/:id – Edit
- DELETE /restaurants/:id – Remove
**Menu Items**
- GET /menu-items - All items
- GET /menu-items/restaurant/:restaurantId – Items for restaurant
- POST /menu-items – Add menu item
- PUT /menu-items/:id – Update item
- DELETE /menu-items/:id – Remove item
- PATCH /menu-items/:id/availability - Mark item available/unavailable
**Customers**
- GET /customers – View all
- POST /customers – Add customer
- PUT /customers/:id – Update info
- DELETE /customers/:id – Remove
**Orders**
- GET /orders – View all orders
- GET /orders/customer/:id – Orders by customer
- GET /orders/:id – Orders by Id
- POST /orders – Place order
- PATCH /orders/:id/status – Update status
- DELETE /orders/:id – Cancel/delete

## Postman Testing Examples

1. Add a restaurant

   POST /restaurants

   Json
   
   ```bash
   {
    "name": "Tandoori Delights",
    "address": "Shahr Naw, Kabul",
    "phone": "0701234567"
   }

2. Add a customer

   POST /customers

   Json
   ```bash
   {
     "name": "Amina",
     "phone": "0700000001"
   }

3. Place an order
 
   POST /orders
 
   Json
   ```bash
   {
     "customer_id": 1,
     "restaurant_id": 2,
     "items": [
     { "menu_id": 8, "quantity": 2 },
     { "menu_id": 7, "quantity": 1 }
   ]
   }

4. Update order status
 
   PUT /orders/1/status
 
   Json
   ```bash
   {
     "status": "completed"
   }

## Notes

- Order total is calculated automatically and save
- Order history can be viewed per customer

