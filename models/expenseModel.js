const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  expense: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amounts: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Expense;
