const chai = require('chai');
const server = require('../src/server');
const chai_http = require('chai-http');
const should = chai.should();
const User = require('../src/model/User');
const MongoInMemory = require('mongodb-memory-server');
const databaseConfig = require('../src/config/database');

const HTTP_CODE_OK = 200;
const HTTP_CODE_NOT_FOUND = 404;

chai.use(chai_http);

describe('Auth module', async function () {
    before(async function () {
        mongoServer = new MongoInMemory.MongoMemoryServer();
        databaseConfig(await mongoServer.getUri())
    });

    it('Login com email não cadastrado', function (done) {
	    const incorrect_email = "email@mail.com";
        chai.request(server)
            .post('/user/login')
            .send({ "email": incorrect_email, "password": "senha" })
            .end(function (err, response) {
                response.should.have.status(HTTP_CODE_NOT_FOUND);
                done()
            })
    });

    it('Criar novo usuário', function(done) {
        User.deleteOne({email:"augustonz@codexjr.com.br"},(err,response)=>{
            chai.request(server)
            .post('/users/register')
            .send({"name":"Augusto","email":"augustonz@codexjr.com.br", "password":"senha"})
            .end((err,response)=>{
                response.should.have.status(201);
                response.body.should.be.a("object");
                response.body.should.have.property("email");
                response.body.should.have.property("name");
                response.body.should.have.property("token_list");
                done()
            })
        })
    })

    it('Login com credenciais corretas', function (done) {
	    const correct_email = "augustonz@codexjr.com.br";
        chai.request(server)
            .post('/users/login')
            .send({ "email": correct_email, "password": "senha" })
            .end(function (err, response) {
                response.should.have.status(HTTP_CODE_OK);
                response.body.should.have.property('name');
                response.body.should.have.property('email');
                response.body.should.have.property('token_list');
                done()
            })
    });
});