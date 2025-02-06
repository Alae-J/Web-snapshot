const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Handle
router.post('/register', async (req, res) => {
    console.log('🔹 Received Registration Request:', req.body); // Log form data

    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields.' });
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        console.log('Validation Errors:', errors);  // Log validation errors
        return res.render('register', { errors, name, email, password, password2 });
    } 

    try {
        let user = await User.findOne({ email });

        if (user) {
            console.log('Email already registered:', email);  // Log existing user
            errors.push({ msg: 'Email is already registered!' });
            return res.render('register', { errors, name, email, password, password2 });
        }

        // Hashing password
        console.log('Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed successfully.');

        // Save user to database
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log('User saved to MongoDB:', newUser);
        req.flash('success_msg', 'You are now registered and can log in!');                                                                                                                                                                                                                                                                                           
        res.redirect('/users/login');  // Redirect to login after registration
    } catch (err) {
        console.error('❌ Server Error:', err);
        res.status(500).send(`Server error: ${err.message}`);
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash('error_msg', 'Something went wrong. Please try again.');
            return res.redirect('/users/login');
        }
        if (!user) {
            return res.redirect('/users/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                req.flash('error_msg', 'Login failed.');
                return res.redirect('/users/login');
            }
            req.session.user = user; // storing user info into our session
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
    });
});

module.exports = router;