const mongoose = require("mongoose")

const userModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('userModel', userModelSchema)
