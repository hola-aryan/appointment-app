const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const sequelize = require('./util/database');

const app = express();

app.set('views', 'views');

const appointmentRoutes = require('./routes/appointment');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', appointmentRoutes);


sequelize.sync()
.then(result=>{console.log(result)})
.catch(err=>console.log(err))

app.listen(3000);
