import express from 'express';
import products from '../config/products.json';
import users from '../config/users.json';

const router = express.Router();

router.get('/products', (req, res) => {
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    const product = products.find(product => product.id === req.params.id);
    res.json(product);
});

router.get('/products/:id/reviews', (req, res) => {
    const product = products.find(product => product.id === req.params.id);
    res.json(product.reviews);
});

router.post('/products', (req, res) => {
    const product = req.body;
    console.log(product);
    res.status(200).end('ok');
});

router.get('/users', (req, res) => {
    res.json(users);
});

export default router;