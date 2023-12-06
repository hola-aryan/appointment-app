// var todo = document.getElementById('todo');
// var desc = document.getElementById('desc');
// var myForm = document.getElementById('my-form');
// var localStorageDataList = document.getElementById("localStorageData");

// myForm.addEventListener('submit',addTodo);

// // function addItem(e){
// //     displayLocalStorageData();
// // }

// function addTodo(e) {
//     e.preventDefault();
//     // Get user input values
//     const todos = todo.value;
//     const descs = desc.value;
//     axios.post('http://localhost:8000/appointments',{
//         Todo :todos,
//         Description: descs,
//         Done: false
//     })
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     displayData();

//     todo.value = "";
//     desc.value = "";
// }

// function displayData() {
//     localStorageDataList.innerHTML = ""; // Clear previous data

//     axios.get('http://localhost:8000/appointments')
//     .then(res => {
//         for (let i = 0; i < res.data.length; i++) {
//             if(res.data[i].Done === false) showAllUsers(res.data[i]);
//         }
//         for (let i = 0; i < res.data.length; i++) {
//             if(res.data[i].Done === true) showAllUsers(res.data[i]);
//         }
//     })
//     .catch(err => console.log(err))
// }

// window.addEventListener("DOMContentLoaded",()=>{
//     localStorageDataList.innerHTML = ""; // Clear previous data

//     axios.get('http://localhost:8000/appointments')
//     .then(res => {
//         for (let i = 0; i < res.data.length; i++) {
//             if(res.data[i].Done == false) showAllUsers(res.data[i]);
//         }
//         for (let i = 0; i < res.data.length; i++) {
//             if(res.data[i].Done == true) showAllUsers(res.data[i]);
//         }
//     })
//     .catch(err => console.log(err))
// })

// function showAllUsers(print){
//     const listItem = document.createElement("li");
//             const deleteItem = document.createElement("button");
//             deleteItem.textContent = "Delete";
//             deleteItem.addEventListener('click', () => deleteElement(print._id));
    
//             // Add an Edit button
//             const editItem = document.createElement("button");
//             editItem.textContent = "Done";
//             editItem.addEventListener('click', () => editElement(print._id, print));
    
//             listItem.textContent = `Todo: ${print.Todo}, Description: ${print.Description}, Status: ${print.Done}`;
    
//             localStorageDataList.appendChild(listItem);
//             listItem.appendChild(editItem);
//             listItem.appendChild(deleteItem);
// }

// function deleteElement(id){
//     axios.delete(`http://localhost:8000/appointments`)
//     .then(res => console.log('Hogaya Delete'))
//     .catch(err => console.log(err))

//     displayData();
// }


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

function addAppointment() {
    const nameInput = document.getElementById('aname');
    const timeInput = document.getElementById('time');
    const emailInput = document.getElementById('gmail');

    const name = nameInput.value;
    const time = timeInput.value;
    const email = emailInput.value;

    axios.post('http://localhost:8000/appointments', {
      Name: name,
      Time: time,
      Email: email,
    //   Done: false
    })
      .then(res => {
        console.log(res.data);
        displayData();
      })
      .catch(err => console.log(err));

    nameInput.value = '';
    timeInput.value = '';
    emailInput.value = '';
  }

  function displayData() {
    const appointmentTable = document.getElementById('appointmentTable');
    const tableBody = appointmentTable.querySelector('tbody');

    axios.get('http://localhost:8000/appointments')
      .then(res => {
        tableBody.innerHTML = ''; // Clear previous data

        res.data.forEach(appointment => {
          showAppointment(appointment);
        });
      })
      .catch(err => console.log(err));
  }

  function showAppointment(appointment) {
    const tableBody = document.querySelector('#appointmentTable tbody');

    const row = tableBody.insertRow();

    const nameCell = row.insertCell(0);
    nameCell.textContent = appointment.Name;

    const timeCell = row.insertCell(1);
    timeCell.textContent = appointment.Time;

    const emailCell = row.insertCell(2);
    emailCell.textContent = appointment.Email;

    const actionCell = row.insertCell(3);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteAppointment(appointment._id));

    const editButton = document.createElement('button');
    editButton.textContent = 'Toggle Status';
    editButton.addEventListener('click', () => toggleStatus(appointment._id, appointment.Done));

    actionCell.appendChild(deleteButton);
    actionCell.appendChild(editButton);
  }

  function deleteAppointment(id) {
    axios.delete(`http://localhost:8000/appointments/${id}`)
      .then(res => {
        console.log('Appointment deleted');
        displayData();
      })
      .catch(err => console.log(err));
  }

  function toggleStatus(id, currentStatus) {
    const newStatus = !currentStatus;

    axios.put(`http://localhost:8000/appointments/${id}`, {
      Done: newStatus
    })
      .then(res => {
        console.log('Status toggled');
        displayData();
      })
      .catch(err => console.log(err));
  }

  window.addEventListener("DOMContentLoaded", () => {
    displayData();
  });