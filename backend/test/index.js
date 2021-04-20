const chai = require('chai');
const chai_http = require('chai-http');
const jwt = require('jsonwebtoken');
const should = chai.should();
const server = require('../src/server');
const databaseConfig = require('../src/config/database');
const User = require('@model/User');
const Task = require('@model/Task');
const httpCodes = require('./status');

chai.use(chai_http);

const createTestToken = async () => {
    const testEmail = "test@codexjr.com.br";
    var user = await User.findOne({ email: testEmail });
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '4s' });
    user.token_list.push(token);
    await user.save();
    return token;
}

const createTestTask = async () => {
    const testEmail = "test@codexjr.com.br";
    try {
        var user = await User.findOne({ email: testEmail });
    } catch (err) {
        console.log(err);
    }
    const testTask = new Task({ userId: user._id, name: "Task da codex" });
    const task = await testTask.save();
    return task._id;
}

describe('Users Test', async function () {
    before(function () {
        databaseConfig();
    });

    it('Requisição feita com token inválido', async function () {
        const incorrect_token = "Bearer 123123";
        const response = await chai.request(server)
            .get('/users')
            .set('authorization', incorrect_token);
        response.should.have.status(httpCodes.failure.AUTHENTICATION);
    });

    it('Aquisição de informação do usuário', async function () {
        const token = await createTestToken();
        const response = await chai.request(server)
            .get('/users')
            .set({ 'authorization': "Bearer " + token });
        response.should.have.status(httpCodes.success.OK);
        response.body.should.be.a("object");
        response.body.should.have.property("name");
        response.body.should.have.property("_id");
        response.body.should.have.property("email");
    });

    it('Criar novo usuário com dados insuficientes', async function () {
        var response = await chai.request(server)
            .post('/users/register')
            .send({ "email": "test@codexjr.com.br", "password": "senha" });
        response.should.have.status(httpCodes.failure.BAD_REQUEST);
    });

    it('Criar novo usuário já cadastrado', async function () {
        var response = await chai.request(server)
            .post('/users/register')
            .send({ "name": "Codex", "email": "test@codexjr.com.br", "password": "senha" });
        response.should.have.status(httpCodes.failure.BAD_REQUEST);
    });

    it('Criar novo usuário', async function () {
        await User.deleteOne({ email: "test@codexjr.com.br" });
        var response = await chai.request(server)
            .post('/users/register')
            .send({ "name": "Codex", "email": "test@codexjr.com.br", "password": "senha" });
        response.should.have.status(httpCodes.success.CREATED);
        response.body.should.be.a("object");
        response.body.should.have.property("email");
        response.body.should.have.property("name");
        response.body.should.have.property("token_list");
    });

    it('Login com email não cadastrado', async function () {
        const incorrect_email = "email@mail.com";
        const response = await chai.request(server)
            .post('/user/login')
            .send({ "email": incorrect_email, "password": "senha" });
        response.should.have.status(httpCodes.failure.NOT_FOUND);
    });

    it('Login com credenciais corretas', async function () {
        const correct_email = "test@codexjr.com.br";
        const response = await chai.request(server)
            .post('/users/login')
            .send({ "email": correct_email, "password": "senha" });
        response.should.have.status(httpCodes.success.OK);
        response.body.should.have.property('name');
        response.body.should.have.property('email');
        response.body.should.have.property('token_list');
    });

    it('Logout do usuário', async function () {
        const token = await createTestToken();
        const response = await chai.request(server)
            .put('/users/logout')
            .set({ 'authorization': "Bearer " + token });
        response.should.have.status(httpCodes.success.DELETED);
        response.body.should.be.eql({});
    });
});

describe('Tasks Test', async function () {
    it('Criar tarefa', async function () {
        const token = await createTestToken();
        const response = await chai.request(server)
            .post('/tasks/add')
            .set('authorization', 'Bearer ' + token)
            .send({ 'name': 'Atividade de p2' });
        response.should.have.status(httpCodes.success.CREATED);
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('highPriority');
    });

    it('Retornar tarefas', async function () {
        const token = await createTestToken();
        const response = await chai.request(server)
            .post('/tasks/add')
            .set('authorization', 'Bearer ' + token)
            .send({ 'name': 'Atividade de p2' });
        response.should.have.status(httpCodes.success.CREATED);
        response.body.should.have.property('name');
        response.body.should.have.property('highPriority');
    });

    it('Atualizar tarefa', async function () {
        const token = await createTestToken();
        const idTask = await createTestTask();
        const response = await chai.request(server)
            .put('/tasks/update/' + idTask)
            .set('authorization', 'Bearer ' + token)
            .send({ 'highPriority': 'true' });
        response.should.have.status(httpCodes.success.OK);
        response.body.should.have.property('name');
        response.body.should.have.property('highPriority');
        response.body.highPriority.should.be.true;
    });

    it('Deletar tarefa', async function () {
        const token = await createTestToken();
        const idTask = await createTestTask();
        const response = await chai.request(server)
            .delete('/tasks/remove/' + idTask)
            .set('authorization', 'Bearer ' + token);
        response.should.have.status(httpCodes.success.DELETED);
        response.body.should.be.eql({});
    });
});