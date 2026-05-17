import express from 'express';
import './src/configs/env.config.js';
import db from './src/database/db.connection.js';
import urlRoutes from './src/routes/url.route.js';
import userRoutes from './src/routes/user.route.js'
import { getOriginalUrl } from './src/controllers/url.controller.js';
import path from 'path'
import authenticate from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.set("view engine", "ejs");
app.set("views", path.resolve('./src/views'));


db.getConnection().then((connection) => {
    console.log('Connected to the database');
    connection.release();
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});

app.use('/url', urlRoutes);
app.use('/user', userRoutes);
app.get('/:shortId', getOriginalUrl)

app.get("/", authenticate, (req, res) => {
    res.render('home')
})

app.get('/register/user', (req,res)=>{
    res.render('register')
})

app.get('/login/user', (req,res)=>{
    res.render('login')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});