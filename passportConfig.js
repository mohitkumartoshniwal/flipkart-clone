// const passport = require('passport');
// const connection = require('./database');
// const User = connection.models.User;
// const validPassword = require('../lib/passwordUtils').validPassword;
import User from "./model/user.js";
import { validPassword } from "./passportUtils.js";
import {Strategy as LocalStrategy} from  'passport-local'

export default function (passport) {
    const customFields = {
        usernameField: 'email',
        passwordField: 'password'
    };

    const verifyCallback = (email, password, done) => {

        User.findOne({ email })
            .then((user) => {

                if (!user) { return done(null, false) }

                const isValid = validPassword(password, user.password, user.salt);

                if (isValid) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                done(err);
            });

    }

    const strategy = new LocalStrategy(customFields, verifyCallback);

    passport.use(strategy);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((userId, done) => {
        User.findById(userId)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err))
    });


}
