const Task = require('../models/Task');


exports.createTask = async (req, res) => {
  try {
    const { title, description, is_favorite, color } = req.body;
    const task = await Task.create({ title, description, is_favorite, color });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a tarefa' });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [['is_favorite', 'DESC'], ['createdAt', 'ASC']], 
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as tarefas' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_favorite, color, stats } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await task.update({ title, description, is_favorite, color, stats });
    res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a tarefa' });
  }
};