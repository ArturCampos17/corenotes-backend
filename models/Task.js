const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Task = sequelize.define(
  'Task',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O título não pode estar vazio' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stats: {
      type: DataTypes.ENUM('pending', 'completed', 'canceled'), 
      defaultValue: 'pending', 
      allowNull: false, 
      validate: {
        isIn: {
          args: [['pending', 'completed', 'canceled']],
          msg: 'O status deve ser "pending", "completed" ou "canceled"',
        },
      },
    },
  },
  {
    tableName: 'tasks',
    timestamps: true,
  }
);

module.exports = Task;