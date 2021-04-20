const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
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
        select: false
    },
    token_list: {
        type: [String],
        default: []
    }
},
    {
        timestamps: true,
    });

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    });
});

module.exports = model('User', UserSchema);