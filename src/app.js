'use strict'

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config')


//Conecta o banco
mongoose.connect(config.connectionString);

//Carrega os models
const product = require('./models/product');
const custumer = require('./models/custumer');
const order = require('./models/order');


//Carrega rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//middleware Conversor do conteudo json da requisição, podendo atuar na codificação de urls também
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita CORS
app.use(function(req, res, next){
    res.header('Acess-Control-Allow-Origin','*');
    res.header('Acess-Control-Allow-Headers','Origin, X-Requested, Content-Type, Accept, x-acess-token');
    res.header('Acess-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
})

//Rotas Raizes
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;