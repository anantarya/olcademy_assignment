const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    avatar: String,
});

userSchema.methods.generateToken = function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,

        }, process.env.JWT_SECRET_KEY, {
            expireIn: "30d",
        } )
        
    } catch (error) {
        console.log(error)
        
    }
    
}

module.exports = mongoose.model('User', userSchema);


