const User = require("@model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const UserController = {
    getUser(req, res) {
        return res.status(200).send(req.user);
    },
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ error: "Dados insuficientes" });

        try {
            let user = await User.findOne({ email }).select('+password');
            
            const same = await bcrypt.compare(password, user.password);

            if (!same) return res.status(400).send({ error: "Senha incorreta" });

            user.token_list.push(createUserToken(user._id));
            
            await user.save();
        } catch (err) {
            return res.status(400).send({ error: "Não foi possível cadastrar usuário" });
        }

        user.password = undefined;
        return res.status(200).send(user);
    },
    async registerUser(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).send({ error: "Dados insuficientes" });

        try {
            const user = await User.findOne({ email });
            if (user) return res.status(400).send({ error: "Usuário já cadastrado" });

            let newUser = await User.create(req.body);

            newUser.token_list.push(createUserToken(newUser._id));

            await newUser.save();
        } catch (err) {
            return res.status(400).send({ error: "Erro ao salvar usuário" });
        }

        newUser.password = undefined;
        return res.status(201).send(newUser);
    },

    async logout(req, res) {
        const idxToken = req.user.token_list.indexOf(req.token);

        if (idxToken > -1) req.user.token_list.splice(idxToken, 1);

        try {
            req.user.save();
        } catch (err) {
            return res.status(400).send({ error: "Erro ao realizar log out" });
        }

        return res.status(204).send(undefined);
    }
}

module.exports = UserController;