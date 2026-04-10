import express from 'express';
import './src/configs/env.config.js';
import db from './src/database/db.connection.js';
import urlRoutes from './src/routes/url.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.getConnection().then((connection) => {
    console.log('Connected to the database');
    connection.release();
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


app.use('/api/url', urlRoutes);