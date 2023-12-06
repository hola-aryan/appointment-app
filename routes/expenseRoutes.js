const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();


// Route for fetching expense
// router.get('/expense', expenseController.getExpenses);

// Route for adding a new expense
router.post('/Expense/add-Expense', expenseController.postAddExpense);

//  Route to get all the Expenses
// router.get('/Expense/get-Expense', expenseController.getExpenses);


// router.delete('/Expense/delete-Expense/:id', expenseController.deleteExpenses);

// // Route for editing an existing expense
// router.post('/edit-Expense', expenseController.postEditExpense);

// // Route for deleting an expense
// router.post('/delete-item', expenseController.postCartDeleteExpense);

module.exports = router;