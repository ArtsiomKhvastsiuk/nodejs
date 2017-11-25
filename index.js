const config = require('./config/config.json');
const model = require('./models');

console.log(config.name);
const user = new model.User();
const product = new model.Product();
