const User = require("@model/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const createUserToken = (userId)=>{
    return jwt.sign({sub: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const UserController = {
    getUser(req,res) {
        return res.status(200).send(req.user);
    },login(req,res) {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json("Dados insuficientes");

        User.findOne({email},(err,user)=>{
            if (err) return res.status(400).json("Erro na busca");
            bcrypt.compare(password, user.password, (err,same)=>{
                if(!same) return res.status(400).json("Senha incorreta");
                user.token_list.push(createUserToken(user._id));
                user.save();
                user.password=undefined;
                return res.status(200).json(user);
            });
            
        }).select('+password');

    },registerUser(req,res) {
        const {name, email, password} = req.body;

        if(!name || !email || !password) return res.status(400).json("Dados insuficientes");
        
        User.findOne({email}, (err, data)=>{
            if(err) return res.status(400).json("Erro na busca");
            if(data) return res.status(400).json("Usuário já cadastrado");
            
            User.create(req.body, (err, user)=>{
                if(err) return res.status(400).json("Erro ao criar usuário");
                user.token_list.push(createUserToken(user._id));
                user.save();
                user.password = undefined;
                return res.status(201).json(user);
            })
        })
    },logout(req,res) {
        const idxToken = req.user.token_list.indexOf(req.token);
        if(idxToken > -1) req.user.token_list.splice(idxToken,1);
        req.user.save();
        return res.status(204).json("Log out realizado com sucesso");
    }
}

module.exports = UserController;