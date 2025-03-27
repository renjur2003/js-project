// Function to toggle dropdown menu
function toggleDropdown(button) {
    let dropdownMenu = button.nextElementSibling;
    
    // Close any open dropdowns before opening a new one
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdownMenu) {
            menu.classList.remove('show');
        }
    });

    // Toggle the selected dropdown
    dropdownMenu.classList.toggle('show');
}

// Close dropdown if clicked outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

// employee view details-------------------------viewdetails----------

function showForm() {
    document.getElementById("detailsForm").style.display = "block"; 
}

function hideForm() {
    document.getElementById("detailsForm").style.display = "none";  
}

// employee edit details------------------------editdetails----------

function editEmployee() {
    document.getElementById("editOverlay").style.display = "block";
    document.getElementById("editForm").style.display = "block";
}

function editedForm() {
    document.getElementById("editOverlay").style.display = "none";
    document.getElementById("editForm").style.display = "none";
}
//delete employeee------
function deleteEmployee() {
    document.getElementById("deleteOverlay").style.display ="block";

    document.getElementById("deleteForm").style.display = "block";  
}

function closeDeleteForm() {
    document.getElementById("deleteOverlay").style.display ="none";
    document.getElementById("deleteForm").style.display = "none";
}


// add member form---------------------------------------------------

// Get elements
const openFormBtn = document.getElementById("openFormBtn");
const closeFormBtn = document.getElementById("closeFormBtn");
const closeFormBtn2 = document.getElementById("closeFormBtn2");
const employeeForm = document.getElementById("employeeForm");

// Show Form when clicking "Add Employee"
openFormBtn.addEventListener("click", function () {
    employeeForm.style.display = "flex";
});

// Hide Form when clicking "X" or "Cancel"
closeFormBtn.addEventListener("click", function () {
    employeeForm.style.display = "none";
});
closeFormBtn2.addEventListener("click", function () {
    employeeForm.style.display = "none";
});


//--------------------------------------------------------------------------------------------
// document.addEventListener('DOMContentLoaded', () => {
//     const addEmployeeForm = document.getElementById('addEmployeeForm');

//       // Date format converter function (YYYY-MM-DD ➡️ DD Month YYYY)
//       function formatDateToDDMMYYYY(dateString) {
//         const dateObj = new Date(dateString);
//         const day = String(dateObj.getDate()).padStart(2, '0');
//         const month = dateObj.toLocaleString('default', { month: 'long' });
//         const year = dateObj.getFullYear();
//         return `${day} ${month} ${year}`;
//     }

//      // Function to load employee list from backend and display in table
//      async function loadEmployeeList() {
//         try {
//             const response = await fetch('http://localhost:3000/employees');
//             const employees = await response.json();

//             const tableBody = document.querySelector('#employeeTableBody');
//             tableBody.innerHTML = '';

//       employees.forEach((employee, index) => {
//                 const row = `
//                     <tr>
//                         <td>${index + 1}</td>
//                         <td>${employee.salutation} ${employee.firstName} ${employee.lastName}</td>
//                         <td>${employee.email}</td>
//                         <td>${employee.phone}</td>
//                           <td>${employee.dob}</td>
//                         <td>${employee.gender}</td>                     
//                         <td>${employee.qualifications}</td>
//                          <td>${employee.address}</td>                       
//                         <td>${employee.country}</td>
//                         <td>${employee.state}</td>
//                         <td>${employee.city}</td>
//                     </tr>
//                 `;
//                 tableBody.insertAdjacentHTML('beforeend', row);
//             });
//         } catch (error) {
//             console.error('Error loading employee list:', error);
//         }
//     }

//     // Load employee list on page load
//     loadEmployeeList();

//     // Form submission handling
//     addEmployeeForm.addEventListener('submit', async function (event) {
//         event.preventDefault(); // Prevent form from reloading the page
//         // console.log("Form submitted");
//         // Collect form data
//         const salutation = document.getElementById('salutation').value;
//         const firstName = document.getElementById('firstName').value;
//         const lastName = document.getElementById('lastName').value;
//         const email = document.getElementById('email').value;
//         const phone = document.getElementById('mobile').value;
//         const dobInput = document.getElementById('dob').value;
//         const dob = formatDateToDDMMYYYY(dobInput);  // ✅ Convert before sending
//         const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
//         const qualifications = document.getElementById('qualification').value;
//         const address = document.getElementById('address').value;
//         const country = document.getElementById('country').value;
//         const state = document.getElementById('state').value;
//         const city = document.getElementById('city').value;

//         // Create an object to send
//         const newEmployee = {
//             salutation,
//             firstName,
//             lastName,
//             email,
//             phone,
//             dob,
//             gender,
//             qualifications,
//             address,
//             country,
//             state,
//             city,
//         };

//         try {
//             // Send POST request to backend
//             const response = await fetch('http://localhost:3000/employees', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newEmployee),
//             });
//             console.log(response); // Log the response object

//             if (response.ok) {
//                 alert('Employee added successfully!');
//                 addEmployeeForm.reset(); // Clear form after success
//                 loadEmployeeList();     // Refresh employee list

              
//             } else {
//                 alert('Failed to add employee. Please check the backend.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('Something went wrong!');
//         }
//     }); 
// });





async function readEmployee() {
    let temp = "";
    const display = 5; // Number of employees to display per page
    let currentPage = 1;
    const response = await fetch("http://localhost:3000/employees");
    const data = await response.json();
    const employeeTableBody = document.getElementById("employeetablebody");
    // const paginationNumbers = document.getElementById("pagination-numbers");
    // const prevButton = document.getElementById("prev-button");
    // const nextButton = document.getElementById("next-button");
    async function displayEmployees(page) {
      const startIndex = (page - 1) * display;
      const endIndex = startIndex + display;
      const displayedEmployees = data.slice(startIndex, endIndex);
      temp = "";
      for (let i = 0; i < displayedEmployees.length; i++) {
        const employee = displayedEmployees[i];
        temp += `<tr class="zero">
          <td>${startIndex + i + 1}</td>
          <td><img class="profile-img" src="http://localhost:3000/employees/${
            employee.id
          }/avatar">${employee.firstName + " " + employee.lastName}</td>
          <td>${employee.email}</td>
          <td>${employee.phone}</td>
          <td>${employee.gender}</td>
          <td>${employee.dob}</td>
          <td>${employee.country}</td>
          <td class="morebutton"><button class="more_button"><i class="fa-solid fa-ellipsis"></i></button>
                             <div class="dropdown-menu">
                             <div class="dropdown-item">
                            <button class="action" onclick="viewEmployee('${
                              employee.id
                            }')"><span><i class="fa-regular fa-eye"></i></span> View
                                    Details</button>
                                <button class="action" onclick="editEmployeeDetails('${
                                  employee.id
                                }')"  data-bs-toggle="modal" data-bs-target="#edit_page" href="#"><span><i
                                        class="fa-solid fa-pen"></i></span> Edit</button>
                                <button class="action" onclick="deleteEmployee('${
                                  employee.id
                                }')" data-bs-toggle="modal" data-bs-target="#delete_employee" ><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button>
                              </div>
                              </div>
                            </td>
        </tr>`;
      }
      employeeTableBody.innerHTML = temp;
    }
    displayEmployees(currentPage);
}