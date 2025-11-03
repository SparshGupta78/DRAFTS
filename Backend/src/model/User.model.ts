import mongoose from 'mongoose'

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    notes: [{type: String}]
})

export default mongoose.model('User', User, 'User')