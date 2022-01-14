import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        uniqueCaseInsensitive: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    phone: {
        type: String
    },
    salt: {
        type: String,
        required: true
    }
});

const user = mongoose.model('User', userSchema);

export default user;