const path = require('path');
const express = require('express');

const cors = require('cors');

const sequelize = require('./util/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON body parsing middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const expenseRoutes = require('./routes/expenseRoutes');

app.use('/', expenseRoutes);

// Add a route for testing server status
app.get('/', (req, res) => {
  res.send('Server is running.');
});

// Database synchronization
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
    // Start the server after the database syncs successfully
    app.listen(3000, () => {
      console.log('Server is running on port');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
