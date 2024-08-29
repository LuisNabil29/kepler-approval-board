const { Task } = require('../models');
const { updateClickUpTask } = require('../utils/clickUpService');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { clickUpId, title, description } = req.body;
    const task = await Task.create({ clickUpId, title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    task.status = status;
    await task.save();

    // Actualizar el estado en ClickUp
    await updateClickUpTask(task.clickUpId, status);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    task.assignedTo = userId;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar tarea', error: error.message });
  }
};