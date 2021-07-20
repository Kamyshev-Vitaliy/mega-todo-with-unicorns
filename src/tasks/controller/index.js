const Task = require('../model/task');

exports.getTasks = async (req, res, next) => {
  // await Task.create({
  //     text:Date.now().toString(),
  //     isChecked:false,
  // })
  try {
    const { _id } = req.user;
    const tasks = await Task.find({ userId: _id });
    const transformTasks = tasks.map((task) => ({ text: task.text, isChecked: task.isChecked, id: task.id }));
    return res.status(200).json({
      message: 'task are fon',
      tasks: transformTasks
    });
  }
  catch (error) {
    return next(error);
  }
};

exports.postTask = async (req, res, next) => {
  try {
    const { isChecked, text } = req.body;
    const { _id } = req.user;
    const task = new Task({ text, isChecked, userId: _id });
    await task.save();
    // await Task.create({
    //     text, isChecked
    // });

    return res.status(201).json({ message: 'task created', task: { text: task.text, isChecked: task.isChecked, id: task.id } });
  }
  catch (error) {
    return next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;
    await Task.remove({
      _id: id,
      userId: _id
    });
    return res.status(200).json({ message: 'task deleted' });
  }
  catch (error) {
    return next(error);
  }
};

exports.changeTaskState = async (req, res, next) => {
  try {
    const { id, isChecked } = req.body;
    const { _id } = req.user;
    const task = await Task.findOne({ _id: id, userId: _id });

    if (!task) {
      return next(new Error("Id doesn't exist"));
    }
    // await Task.updateOne({
    //     _id: id,
    // }, {$set: {isChecked}});
    task.isChecked = isChecked;
    await task.save();
    return res.status(200).json({ message: 'task updated' });
  }
  catch (error) {
    return next(error);
  }
};

exports.completeAllTasks = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await Task.updateMany({
      isChecked: false,
      userId: _id
    }, { $set: { isChecked: true } });

    return res.status(200).json({ message: 'complete all tasks' });
  }
  catch (error) {
    return next(error);
  }
};

exports.deleteCompletedTasks = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await Task.deleteMany({
      isChecked: true,
      userId: _id
    });

    return res.status(200).json({ message: 'delete all completed tasks' });
  }
  catch (error) {
    return next(error);
  }
};
