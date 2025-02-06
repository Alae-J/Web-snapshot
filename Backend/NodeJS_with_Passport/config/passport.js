const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, 
            async (req, email, password, done) => {
                try {
                    const user = await User.findOne({ email });
    
                    if (!user) {
                        return done(null, false, req.flash('error_msg', 'That email is not registered'));
                    }
    
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, req.flash('error_msg', 'Incorrect password'));
                    }
    
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            })
    );
    
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    
}