const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRoute = require('@routes/index');
const tasksRoute = require('@routes/tasks');
const usersRoute = require('@routes/users');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/tasks', tasksRoute);

module.exports = app;