const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phone: {
        type: String,
        required: true,
        unique: true,
    }
},
    {
        timestamps: true
    }
)

// validating Email logic
TodoSchema.path('Email').validate(async (email) => {
    const uniqueEmail = await mongoose.models.TodoModel.countDocuments({ email });
    return !uniqueEmail
}, "Email Already Exist")

module.exports = mongoose.model('TodoModel', TodoSchema, 'TodoCollection')