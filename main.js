var naam = document.getElementById('name');
var time = document.getElementById('time');
var gmail = document.getElementById('gmail');
var myForm = document.getElementById('my-form');
var localStorageDataList = document.getElementById("localStorageData");

myForm.addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();

  // Get user input values
  const names = naam.value;
  const times = time.value;
  const gmails = gmail.value;

  // Simple client-side validation
  if (!names || !times || !gmails) {
    alert('Please fill in all fields');
    return;
  }

  axios.post('http://localhost:3000/user/add-user', {
    name: names,
    time: times,
    email: gmails,
  })
    .then(res => {
      console.log(res);
      displayData();
      // Optionally update UI or provide feedback to the user upon successful submission
    })
    .catch(err => {
      console.log(err);
      // Provide user-friendly error message or feedback
      alert('Error submitting data. Please try again.');
    })
    .finally(() => {
      // Reset form fields after request (whether success or failure)
      naam.value = "";
      time.value = "";
      gmail.value = "";
    });
}


function displayData() {
  localStorageDataList.innerHTML = ""; // Clear previous data
  axios.get('http://localhost:3000/user/get-user')
  .then(res => {
    console.log(res.data.appointments);
      for (let i = 0; i < res.data.appointments.length; i++) {
        showAllUsers(res.data.appointments[i]);
      }
  })
  .catch(err => console.log("Error fetching user data in window add event listener"))
}

window.addEventListener("DOMContentLoaded",()=>{
    localStorageDataList.innerHTML = ""; // Clear previous data
    axios.get('http://localhost:3000/user/get-user')
    .then(res => {
      console.log(res.data.appointments);
        for (let i = 0; i < res.data.appointments.length; i++) {
          showAllUsers(res.data.appointments[i]);
        }
    })
    .catch(err => console.log("Error fetching user data in window add event listener"))
})

function showAllUsers(print){
    const listItem = document.createElement("li");

            const deleteItem = document.createElement("button");
            deleteItem.textContent = "Delete";
            deleteItem.addEventListener('click', () => deleteElement(print.id));
    
            listItem.textContent = `ID: ${print.id}, Name: ${print.name}, Time: ${print.Name}, Email: ${print.email}`;
    
            localStorageDataList.appendChild(listItem);
            listItem.appendChild(deleteItem);
}

function deleteElement(id){
    axios.delete(`http://localhost:3000/user/delete-user/${id}`)
    .then((res)=>
    {console.log("Delete Hogaya");
    displayData();
    })
    .catch(err => console.log("err- Delete nahin ho raha"))

    
}


// async function editElement(id) {
//     try {
//         // Use axios.put directly instead of axios.put().then().catch()
//         await axios.put(`http://localhost:8000/appointments`, {
//             Done: true
//         });

//         console.log('Hogaya Edit'); // Moved outside of the .then block
//         displayData(); // Refresh the displayed data
//     } 
    
//     catch (error) {
//         console.error(error); // Log the error for debugging
//     }
// }

// Hhahahahahahahhahahahahahahhahahahahahhahahahahahahahahahahahahahhahahahahahahahahahahahhahahahaha


// var aname = document.getElementById('aname');
// var time = document.getElementById('time');
// var gmail = document.getElementById('gmail');

// function addAppointment() {
//     const nameInput = document.getElementById('aname');
//     const timeInput = document.getElementById('time');
//     const emailInput = document.getElementById('gmail');

//     const name = nameInput.value;
//     const time = timeInput.value;
//     const email = emailInput.value;

//     axios.post('http://localhost:8000/appointments', {
//       Name: name,
//       Time: time,
//       Email: email,
//     //   Done: false
//     })
//       .then(res => {
//         console.log(res.data);
//         displayData();
//       })
//       .catch(err => console.log(err));

//     nameInput.value = '';
//     timeInput.value = '';
//     emailInput.value = '';
//   }

//   function displayData() {
//     const appointmentTable = document.getElementById('appointmentTable');
//     const tableBody = appointmentTable.querySelector('tbody');

//     axios.get('http://localhost:8000/appointments')
//       .then(res => {
//         tableBody.innerHTML = ''; // Clear previous data

//         res.data.forEach(appointment => {
//           showAppointment(appointment);
//         });
//       })
//       .catch(err => console.log(err));
//   }

//   function showAppointment(appointment) {
//     const tableBody = document.querySelector('#appointmentTable tbody');

//     const row = tableBody.insertRow();

//     const nameCell = row.insertCell(0);
//     nameCell.textContent = appointment.Name;

//     const timeCell = row.insertCell(1);
//     timeCell.textContent = appointment.Time;

//     const emailCell = row.insertCell(2);
//     emailCell.textContent = appointment.Email;

//     const actionCell = row.insertCell(3);
//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.addEventListener('click', () => deleteAppointment(appointment._id));

//     const editButton = document.createElement('button');
//     editButton.textContent = 'Toggle Status';
//     editButton.addEventListener('click', () => toggleStatus(appointment._id, appointment.Done));

//     actionCell.appendChild(deleteButton);
//     actionCell.appendChild(editButton);
//   }

//   function deleteAppointment(id) {
//     axios.delete(`http://localhost:8000/appointments/${id}`)
//       .then(res => {
//         console.log('Appointment deleted');
//         displayData();
//       })
//       .catch(err => console.log(err));
//   }

//   function toggleStatus(id, currentStatus) {
//     const newStatus = !currentStatus;

//     axios.put(`http://localhost:8000/appointments/${id}`, {
//       Done: newStatus
//     })
//       .then(res => {
//         console.log('Status toggled');
//         displayData();
//       })
//       .catch(err => console.log(err));
//   }

//   window.addEventListener("DOMContentLoaded", () => {
//     displayData();
//   });