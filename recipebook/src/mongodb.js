const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://keshavrajora122:22cs3034@cluster0.hzdpmg3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;