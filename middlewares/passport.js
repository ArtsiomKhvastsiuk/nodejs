import passport from 'passport';
import LocalStrategy from 'passport-local';
import {OAuth2Strategy} from 'passport-google-oauth';
import users from '../config/users.json';

/* Local Strategy */
passport.use(new LocalStrategy(
    function(username, password, done) {
        const user = users.find(user => user.username === username);
        if (user === undefined || user.password !== password) {
            done(null, false, {success: false, message: 'Incorrect username/password'});
        } else {
            done(null, user);
        }
    }
));

/* Google Strategy */
passport.use(new OAuth2Strategy({
    clientID: '952020583525-0co2v6grosh05nnm86j6e1pe9q5qkc96.apps.googleusercontent.com',
    clientSecret: 'DagUUAD-MWc9R5YDxicI21tB',
    callbackURL: "http://localhost:8080/api/auth/google/callback"
}, function(accessToken, refreshToken, profile, done) {
    console.log('yes');
}));