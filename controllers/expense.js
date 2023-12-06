const Expense = require('../models/expenseModel');

exports.getProducts = (req, res, next) => {
  Expense.findAll()
    .then(Expenses => {
      res.json({ Expenses });
      console.log(Expenses);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.deleteProducts = async(req, res, next) => {
  const uId = req.params.id;
  await Expense.destroy({where:{id:uId}});
  res.sendStatus(200);
};

exports.postAddExpense = async (req, res, next) => {
  const expense = req.body.expense;
  const description = req.body.description;
  const amounts = req.body.amounts;

  try {

    // Check if amounts is provided and not null
    const data = await Expense.create({ expense, description, amounts });
    res.status(201).json({ newExpenseDetail: data });
    console.log("The value is added");

  } catch (error) {
    console.log("The value is not added");
    console.error('Error in Controller.js file. Controller.js main galti hai', error);
  }
};

exports.postEditProduct = (req, res, next) => {
  const ExpenseId = req.params.ExpenseId;
  const { name, time, email } = req.body;

  Expense.findByPk(ExpenseId)
    .then(Expense => {
      if (!Expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      Expense.name = name;
      Expense.time = time;
      Expense.email = email;

      return Expense.save();
    })
    .then(updatedExpense => {
      res.json({ Expense: updatedExpense });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const ExpenseId = req.params.ExpenseId;

  Expense.findByPk(ExpenseId)
    .then(Expense => {
      if (!Expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return Expense.destroy();
    })
    .then(() => {
      res.json({ message: 'Expense deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
