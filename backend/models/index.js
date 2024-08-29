const User = require('./User');
const Task = require('./Task');

// Definir relaciones
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedUser' });

module.exports = {
  User,
  Task,
};