const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^\w+([.-]?\w+)*(@codexjr.com.br)+$/
    },
    password: {
        type: String,
        required: true,
    },
    token_list: {
        type: [String]
    }
},
    {
        timestamps: true,
    });

module.exports = model('User', UserSchema);