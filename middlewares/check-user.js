import users from '../config/users.json';

export default function checkUser(req, res, next) {
    const user = users.find(user => user.username === req.body.username);
    if (user === undefined || user.password !== req.body.password) {
        res.status(404).json({
            code: 404,
            message: 'Not found'
        });
    } else {
        next();
    }
};