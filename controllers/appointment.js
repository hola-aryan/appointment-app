const Appointment = require('../models/appointment');

exports.getProducts = (req, res, next) => {
  Appointment.findAll()
    .then(appointments => {
      res.json({ appointments });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.postAddProduct = (req, res, next) => {
  const { name, time, email } = req.body;

  Appointment.create({
    name: name,
    time: time,
    email: email
  })
    .then(appointment => {
      res.status(201).json({ appointment });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.postEditProduct = (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  const { name, time, email } = req.body;

  Appointment.findByPk(appointmentId)
    .then(appointment => {
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment.name = name;
      appointment.time = time;
      appointment.email = email;

      return appointment.save();
    })
    .then(updatedAppointment => {
      res.json({ appointment: updatedAppointment });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const appointmentId = req.params.appointmentId;

  Appointment.findByPk(appointmentId)
    .then(appointment => {
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      return appointment.destroy();
    })
    .then(() => {
      res.json({ message: 'Appointment deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
