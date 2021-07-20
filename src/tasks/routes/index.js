const express = require('express');
const taskController = require('../controller/index');
const tokenHandler = require('../../middlewares/tokenHandler');
const validationHandler = require('../../middlewares/validationHandler');
const { accessTaskValidation } = require('../../utills/validationConfig');
const { addTaskValidation } = require('../../utills/validationConfig');

const taskRouter = express.Router();

taskRouter.get('/', tokenHandler, taskController.getTasks);
taskRouter.post('/', ...validationHandler(addTaskValidation, 'addTask'), tokenHandler, taskController.postTask);

taskRouter.delete('/', ...validationHandler(accessTaskValidation, 'addTask'), tokenHandler, taskController.deleteTask);
taskRouter.patch('/', ...validationHandler(accessTaskValidation, 'addTask'), tokenHandler, taskController.changeTaskState);

taskRouter.patch('/complete', tokenHandler, taskController.completeAllTasks);
taskRouter.delete('/complete', tokenHandler, taskController.deleteCompletedTasks);

module.exports = taskRouter;
