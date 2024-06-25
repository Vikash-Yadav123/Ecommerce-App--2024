import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import ConnectDb from './config/db.js';
import authRouter from './routes/authRoutes.js';
import categoryRouter from "./routes/categoryRoutes.js";
import prouductRouter from './routes/productRoutes.js';

// load enviornment
dotenv.config();

// Create an instance of an Express application
const app = express();



// connection of data base
ConnectDb();

// middilware
app.use(express.json());// Parses incoming JSON requests
app.use(cors()); // Enables CORS
app.use(morgan('dev'));  // Use Morgan for logging HTTP requests


// route middilware
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', prouductRouter);



app.get('/', (req, resp) => {
    resp.send('<h1>Nodemon start </h1>')
})

const PORT = 7070 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Your Server is run ${PORT} ON ${process.env.DEVELOP}`.bgCyan);
})