// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Client/html')));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://keshavrajora122:22cs3034@cluster0.hzdpmg3.mongodb.net/');
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Create a mongoose schema for users
const UserSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    phoneNumber: String,
    password: String,
    gender: String
});

// // Create a mongoose schema for users
// const UserSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     phoneNumber: { type: String, required: true },
//     password: { type: String, required: true },
//     gender: { type: String, required: true }
// });

// Create a mongoose model
const User = mongoose.model('User', UserSchema);

// Register endpoint
// app.post('/register', (req, res) => {
//     const newUser = new User({
//         fullName: req.body.fullName,
//         username: req.body.username,
//         email: req.body.email,
//         phoneNumber: req.body.phoneNumber,
//         password: req.body.password,
//         gender: req.body.gender
//     });

//     newUser.save()
//     .then(user => {
//         console.log('User registered successfully:', user);
//         res.status(200).json({ message: 'Registration successful' });
//     })
//     .catch(err => {
//         console.log('Registration error:', err);
//         res.status(500).json({ error: 'Registration failed' });
//     });
// });
// Register endpoint
app.post('/register', (req, res) => {
    const newUser = new User({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        gender: req.body.gender
    });

    newUser.save()
    .then(user => {
        console.log('User registered successfully:', user);

        // Send a JSON response with the redirect URL
        res.status(200).json({ message: 'Registration successful' });
    })
    .catch(err => {
        console.log('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
    });
});


// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "Email not found!! Please Register" });
      }
      if (user.password === password) {
        return res.json({ message: "Successfully Logged-in" });
      } else {
        return res.status(401).json({ message: "Incorrect Password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



// Start the server
const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
