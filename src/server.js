require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const app = express();

const path = require('path');
const Task = require('./tasks/model/task');
const { getTasks } = require('./tasks/controller');

const taskRouter = require('./tasks/routes');
const errorHandler = require('./middlewares/errorHandler');
const authRouter = require('./auth/routes');

// делаем наш парсинг в формате json
app.use(bodyParser.json());

// парсит запросы по типу: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//для Хироку
app.use('/api/tasks', taskRouter);

app.use('/api/auth', authRouter);
// app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

//Для Хироку
app.use(express.static(path.join(__dirname, '../client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

app.use('api/tasks', taskRouter);
app.use('api/auth', authRouter);

app.use(errorHandler);

// установить порт, и слушать запросы
app.listen(process.env.PORT || 3005, () => {
  console.log('Сервер запущен на 3005 порту');
});
