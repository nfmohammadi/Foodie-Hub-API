import express from 'express';
import 'dotenv/config';
import customersRoutes from './routes/customersRoutes.js';
import restaurantsRoutes from './routes/restaurantsRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';


//express setup
const app = express();
const  PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/customers', customersRoutes);
app.use('/restaurants', restaurantsRoutes);
app.use('/menu-items', menuRoutes);
app.use('/orders', ordersRoutes);

app.listen(PORT, ()=>{
    console.log("Server is running on PORT " + PORT);
})
