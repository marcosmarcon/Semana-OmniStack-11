const expess = require('express');
const cors = require('cors');
const routes = require('./routes')
const app = expess();
const {erros} = require('./celebrate'); 

app.use(cors());
app.use(expess.json());
app.use(routes);
app.use(erros());

module.exports = app;