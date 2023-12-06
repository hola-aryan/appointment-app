const Appointment = require('../models/appointment');

exports.getProducts = (req, res, next) => {
  Appointment.findAll()
    .then(appointments => {
      res.json({ appointments });
      console.log(appointments);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


exports.deleteProducts = async(req, res, next) => {
  const uId = req.params.id;
  await Appointment.destroy({where:{id:uId}});
  res.sendStatus(200);
};

exports.postAddProduct = async (req, res, next) => {
  const name = req.body.name;
  const time = req.body.time;
  const email = req.body.email;

  try {
    const data = await Appointment.create({ name: name, time: time, email: email });
    res.status(201).json({ newUserDetail: data });
    console.log("The value is added");
  } catch (error) {
    console.error('Error in Controller.js file. Controller.js main galti hai', error);
  }
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
