const chai = require('chai');
const chai_http = require('chai-http');
const should = chai.should();
const MongoInMemory = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');

const server = require('../src/server');
const databaseConfig = require('../src/config/database');
const User = require('@model/User');
const Task = require('@model/Task');
const httpCodes = require('./status');

chai.use(chai_http);

const createTestToken = async () => {
    const testEmail = "test@codexjr.com.br";
    const user = await User.findOne({email:testEmail});
    const token = jwt.sign({sub: user._id}, process.env.JWT_SECRET, {expiresIn: '5s'});
    user.token_list.push(token);
    await user.save();
    return token;
}

const createTestTask = async () => {
    const testEmail = "test@codexjr.com.br";
    const user = await User.findOne({email:testEmail});
    const testTask = new Task({userId: user._id, name: "Task da codex"});
    const task = await testTask.save();
    return task._id;
}

describe('Users Test', async function () {
    before(async function () {
        mongoServer = new MongoInMemory.MongoMemoryServer();
        databaseConfig(await mongoServer.getUri())
    });

    it('Requisição feita com token inválido', function (done) {
	    const incorrect_token = "Bearer 123123";
        chai.request(server)
            .get('/users')
            .set('authorization',incorrect_token)
            .end(function (err, response) {
                response.should.have.status(httpCodes.failure.AUTHENTICATION);
                done();
            })
    });

    it('Aquisição de informação do usuário', async function () {
        const token = await createTestToken();
        const response = await chai.request(server)
        .get('/users')
        .set({'authorization': "Bearer "+ token})
        response.should.have.status(httpCodes.success.OK);
        response.body.should.be.a("object");
        response.body.should.have.property("name");
        response.body.should.have.property("_id");
        response.body.should.have.property("email");
    });

    it('Login com email não cadastrado', function (done) {
	    const incorrect_email = "email@mail.com";
        chai.request(server)
            .post('/user/login')
            .send({ "email": incorrect_email, "password": "senha" })
            .end(function (err, response) {
                response.should.have.status(httpCodes.failure.NOT_FOUND);
                done();
            })
    });

    it('Criar novo usuário', function(done) {
        User.deleteOne({email:"test@codexjr.com.br"},(err,response)=>{
            chai.request(server)
            .post('/users/register')
            .send({"name":"Augusto","email":"test@codexjr.com.br", "password":"senha"})
            .end((err,response)=>{
                response.should.have.status(httpCodes.success.CREATED);
                response.body.should.be.a("object");
                response.body.should.have.property("email");
                response.body.should.have.property("name");
                response.body.should.have.property("token_list");
                done();
            })
        })
    });

    it('Login com credenciais corretas', function (done) {
	    const correct_email = "test@codexjr.com.br";
        chai.request(server)
            .post('/users/login')
            .send({ "email": correct_email, "password": "senha" })
            .end(function (err, response) {
                response.should.have.status(httpCodes.success.OK);
                response.body.should.have.property('name');
                response.body.should.have.property('email');
                response.body.should.have.property('token_list');
                done()
            })
    });
});

describe('Tasks Test', async function(){
    it('Criar tarefa', async function () {
        const token = await createTestToken();
        chai.request(server)
            .post('/tasks/add')
            .set('authorization', 'Bearer '+ token)
            .send({'name':'Atividade de p2'})
            .end(function (err, response) {
                response.should.have.status(httpCodes.success.CREATED);
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('highPriority');
            })
    });
    
    it('Retornar tarefas', async function () {
        const token = await createTestToken();
        chai.request(server)
            .post('/tasks/add')
            .set('authorization', 'Bearer '+ token)
            .send({'name':'Atividade de p2'})
            .end(function (err, response) {
                response.should.have.status(httpCodes.success.CREATED);
                response.body.should.have.property('name');
                response.body.should.have.property('highPriority');
            })
    });

    it('Atualizar tarefa', async function () {
        const token = await createTestToken();
        const idTask = await createTestTask();
        chai.request(server)
            .put('/tasks/update/'+idTask)
            .set('authorization', 'Bearer '+ token)
            .send({'highPriority':'true'})
            .end(function (err, response) {
                response.should.have.status(httpCodes.success.OK);
                response.body.should.have.property('name');
                response.body.should.have.property('highPriority');
                response.body.highPriority.should.be.true;
            });
    });

    it('Deletar tarefa', async function () {
        const token = await createTestToken();
        const idTask = await createTestTask();
        chai.request(server)
            .delete('/tasks/remove/'+idTask)
            .set('authorization', 'Bearer '+ token)
            .end(function (err, response) {
                response.should.have.status(httpCodes.success.DELETED);
                response.body.should.be(undefined);
            })
    });
});