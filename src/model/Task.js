const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    highPriority: {
        type: Boolean,
        required: false,
        default: false
    },
    userId: {
        type: String
    }
},
    {
        timestamps: true,
    });

module.exports = model('Task', TaskSchema);