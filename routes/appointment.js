const path = require('path');

const express = require('express');

const appointmentController = require('../controllers/appointment');

const router = express.Router();


// Route for fetching appointments
router.get('/appointments', appointmentController.getProducts);

// Route for adding a new appointment
router.post('/add-product', appointmentController.postAddProduct);

// Route for editing an existing appointment
router.post('/edit-product', appointmentController.postEditProduct);

// Route for deleting an appointment
router.post('/delete-item', appointmentController.postCartDeleteProduct);

module.exports = router;