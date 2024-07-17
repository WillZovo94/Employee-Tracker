const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env);

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

const pool = new Pool ( 
    {
        user: process.env.expressName,
        password: '',
        host: 'localhost',
        database: ''
    },
    console.log('Connected to the _ database')
)

pool.connect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})