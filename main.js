var expense = document.getElementById('expense');
var description = document.getElementById('description');
var amount = document.getElementById('amount');

var myForm = document.getElementById('my-form');
var localStorageDataList = document.getElementById("localStorageData");

myForm.addEventListener('submit', addTodo);

function addTodo(e) {
  e.preventDefault();

  // Get user input values
  const expenses = expense.value;
  const descriptions = description.value;
  const amounts = amount.value;

  // Simple client-side validation
  if (!expenses || !descriptions || !amounts) {
    alert('Please fill in all fields');
    return;
  }

  axios.post('http://localhost:3000/Expense/add-Expense', {
    expense: expenses,
    description: descriptions,
    amounts: amounts,
  })
    .then(res => {
      console.log(res);
      // displayData();
      // Optionally update UI or provide feedback to the user upon successful submission
    })
    .catch(err => {
      console.log(err);
      // Provide user-friendly error message or feedback
      alert('Error submitting data. Please try again.');
    })
    .finally(() => {
      // Reset form fields after request (whether success or failure)
      expense.value = "";
      description.value = "";
      amount.value = "";
    });
}


// function displayData() {
//   localStorageDataList.innerHTML = ""; // Clear previous data
//   axios.get('http://localhost:3000/user/get-user')
//   .then(res => {
//     console.log(res.data.appointments);
//       for (let i = 0; i < res.data.appointments.length; i++) {
//         showAllUsers(res.data.appointments[i]);
//       }
//   })
//   .catch(err => console.log("Error fetching user data in window add event listener"))
// }

// window.addEventListener("DOMContentLoaded",()=>{
//     localStorageDataList.innerHTML = ""; // Clear previous data
//     axios.get('http://localhost:3000/user/get-user')
//     .then(res => {
//       console.log(res.data.appointments);
//         for (let i = 0; i < res.data.appointments.length; i++) {
//           showAllUsers(res.data.appointments[i]);
//         }
//     })
//     .catch(err => console.log("Error fetching user data in window add event listener"))
// })

// function showAllUsers(print){
//     const listItem = document.createElement("li");

//             const deleteItem = document.createElement("button");
//             deleteItem.textContent = "Delete";
//             deleteItem.addEventListener('click', () => deleteElement(print.id));
    
//             listItem.textContent = `ID: ${print.id}, Name: ${print.name}, Time: ${print.Name}, Email: ${print.email}`;
    
//             localStorageDataList.appendChild(listItem);
//             listItem.appendChild(deleteItem);
// }

// function deleteElement(id){
//     axios.delete(`http://localhost:3000/user/delete-user/${id}`)
//     .then((res)=>
//     {console.log("Delete Hogaya");
//     displayData();
//     })
//     .catch(err => console.log("err- Delete nahin ho raha"))

    
// }

