import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../middlewares/passport';
import products from '../config/products.json';
import users from '../config/users.json';
import checkUser from '../middlewares/check-user';
import checkJwt from '../middlewares/check-jwt';

const router = express.Router();

router.post('/auth', checkUser, (req, res) => {
    const token = jwt.sign({username: req.body.username}, 'katem');
    res.json({
        code: 200,
        message: 'ok',
        data: {
          user: {
              username: req.body.username,
              password: req.body.password
          }
        },
        token
    });
});

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    res.json({success: true});
});

router.get('/auth/google', passport.authenticate('google'));

router.get('/auth/google/callback', passport.authenticate('google', {scope: ['profile', 'email']}), (req, res) => {
    res.json({success: true});
});

router.get('/products', checkJwt, (req, res) => {
    res.json(products);
});

router.get('/products/:id', checkJwt, (req, res) => {
    const product = products.find(product => product.id === req.params.id);
    res.json(product);
});

router.get('/products/:id/reviews', checkJwt, (req, res) => {
    const product = products.find(product => product.id === req.params.id);
    res.json(product.reviews);
});

router.post('/products', (req, res) => {
    const product = req.body;
    console.log(product);
    res.status(200).end('ok');
});

router.get('/users', checkJwt, (req, res) => {
    res.json(users);
});

export default router;