import jwt from 'jsonwebtoken';

export default function checkJwt(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, 'katem', (err) => {
        if (err) {
            res.json({code: 403, message: 'Invalid token'})
        } else {
            next();
        }
    });
};

