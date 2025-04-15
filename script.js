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


//-------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const employeesContainer = document.getElementById("employeesContainer");
  
    async function fetchEmployees() {
      try {
        const response = await fetch("http://localhost:3000/employees");
        if (!response.ok) {
          throw new Error(`Failed to fetch employees: ${response.status}`);
        }
  
        const employees = await response.json();
        console.log("employees", employees);
  
        employeesContainer.innerHTML = employees
          .map(
            (employee, index) => `
                  <div class="row py-2 border-bottom align-items-center text-center">
                      <div class="col-1">${index + 1}</div>
                      <div class="col-2 d-flex align-items-center gap-2">
                          <img 
                              src="http://localhost:3000/avatar/${employee.id}"
                              class="profile-img"
                              style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"
                          >
                          <span>${employee.firstName} ${employee.lastName}</span>
                      </div>
                      <div class="col-2 me-5 ms-3">${employee.email}</div>
                      <div class="col-1">${employee.phone}</div>
                      <div class="col-1">${employee.gender}</div>
                      <div class="col-1">${employee.dob}</div>
                      <div class="col-2">${employee.country}</div>
                      <div class="col">

                      <div class="dropdown">
                        <button class="three-dot-btn" type="button" onclick="toggleDropdown(this)">
                            <strong>...</strong>
                        </button>
                       <ul class="dropdown-menu">
 <li onclick="window.location.href='employeee.html?id=${employee.id}'"><i class="bi bi-eye"></i> View Details</li>
  <li onclick="editEmployee(${employee.id})"><i class="bi bi-pencil"></i> Edit</li>
  <li onclick="deleteEmployee(${employee.id})" class="text-danger"><i class="bi bi-trash"></i> Delete</li>
</ul>

                    </div>
                    </div>
                    </div>
                    
              `
          )
          .join("");
      } catch (error) {
        console.log("Error fetching employee data:", error);
        employeesContainer.innerHTML = `
                  <p class="text-danger text-center">
                      <i class="bi bi-exclamation-triangle"></i> Failed to load employee data. Please try again later.
                  </p>`;
      }
    }
  
    fetchEmployees();
  });
  
  document
    .getElementById("addEmployeeForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission
  
      const formData = new FormData();
      const submitButton = document.getElementById("addEmployeeBtn");
  
      // Disable submit button during submission
      submitButton.disabled = true;
  
      // Capture the avatar file (if provided)
      const avatarInput = document.getElementById("imageUpload");
      if (avatarInput && avatarInput.files.length > 0) {
        formData.append("avatar", avatarInput.files[0]);
      } else {
        alert("Please upload an avatar image.");
        submitButton.disabled = false;
        return;
      }
  
      // Capture employee data
      const employeeData = {
        salutation: document.getElementById("salutation").value.trim(),
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        dob: document.getElementById("dob").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        qualification: document.getElementById("qualification").value.trim(),
        address: document.getElementById("address").value.trim(),
        country: document.getElementById("country").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value.trim(),
      };
  
      // Validate required fields
      const requiredFields = [
        "salutation",
        "firstName",
        "lastName",
        "email",
        "phone",
        "dob",
        "gender",
        "address",
        "country",
        "state",
        "city",
      ];
  
      for (const field of requiredFields) {
        if (!employeeData[field]) {
          alert(`Please fill out the ${field.replace(/([A-Z])/g, " $1")} field.`);
          submitButton.disabled = false;
          return;
        }
      }
  
      // Add employee data as a JSON string
      for (const key in employeeData) {
        formData.append(key, employeeData[key]);
      }
      // formData.append("employeeData", JSON.stringify(employeeData));

  
      try {
        const response = await fetch("http://localhost:3000/employees", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Employee added successfully!");
          document.getElementById("addEmployeeForm").reset();
          document.getElementById("imagePreview").innerHTML = ""; // Clear image preview
        } else {
          alert(`Error: ${result.error || "Failed to add employee"}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the server. Please try again later.");
      } finally {
        submitButton.disabled = false; // Re-enable the button
      }
    });
  
  // Image Upload Preview Logic
  document
    .getElementById("imageUpload")
    .addEventListener("change", function (event) {
      const file = event.target.files[0];
      const previewContainer = document.getElementById("imagePreview");
  
      if (file) {
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        const maxSize = 5 * 1024 * 1024; // 5MB
  
        if (!validTypes.includes(file.type)) {
          alert("Invalid file type. Only PNG and JPG are allowed.");
          event.target.value = ""; // Clear the input
          previewContainer.innerHTML = ""; // Clear preview
          return;
        }
  
        if (file.size > maxSize) {
          alert("File size exceeds the 5MB limit.");
          event.target.value = ""; // Clear the input
          previewContainer.innerHTML = ""; // Clear preview
          return;
        }
  
        const reader = new FileReader();
        reader.onload = function (e) {
          previewContainer.innerHTML = `
                      <img src="${e.target.result}" alt="Image Preview" class="img-fluid rounded" style="max-width: 100px; max-height: 100px;">
                      <input type="hidden" name="avatar_uploaded" value="true">
                  `;
        };
        reader.readAsDataURL(file);
      } else {
        previewContainer.innerHTML = ""; // Clear preview if no file selected
        document.querySelector("input[name='avatar_uploaded']")?.remove();
      }
    });
  



// async function readEmployee() {
//     let temp = "";
//     const display = 5; // Number of employees to display per page
//     let currentPage = 1;
//     const response = await fetch("http://localhost:3000/employees");
//     const data = await response.json();
//     const employeeTableBody = document.getElementById("employeetablebody");
//     // const paginationNumbers = document.getElementById("pagination-numbers");
//     // const prevButton = document.getElementById("prev-button");
//     // const nextButton = document.getElementById("next-button");
//     async function displayEmployees(page) {
//       const startIndex = (page - 1) * display;
//       const endIndex = startIndex + display;
//       const displayedEmployees = data.slice(startIndex, endIndex);
//       temp = "";
//       for (let i = 0; i < displayedEmployees.length; i++) {
//         const employee = displayedEmployees[i];
//         temp += `<tr class="zero">
//           <td>${startIndex + i + 1}</td>
//           <td><img class="profile-img" src="http://localhost:3000/employees/${
//             employee.id
//           }/avatar">${employee.firstName + " " + employee.lastName}</td>
//           <td>${employee.email}</td>
//           <td>${employee.phone}</td>
//           <td>${employee.gender}</td>
//           <td>${employee.dob}</td>
//           <td>${employee.country}</td>
//           <td class="morebutton"><button class="more_button"><i class="fa-solid fa-ellipsis"></i></button>
//                              <div class="dropdown-menu">
//                              <div class="dropdown-item">
//                             <button class="action" onclick="viewEmployee('${
//                               employee.id
//                             }')"><span><i class="fa-regular fa-eye"></i></span> View
//                                     Details</button>
//                                 <button class="action" onclick="editEmployeeDetails('${
//                                   employee.id
//                                 }')"  data-bs-toggle="modal" data-bs-target="#edit_page" href="#"><span><i
//                                         class="fa-solid fa-pen"></i></span> Edit</button>
//                                 <button class="action" onclick="deleteEmployee('${
//                                   employee.id
//                                 }')" data-bs-toggle="modal" data-bs-target="#delete_employee" ><i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete</button>
//                               </div>
//                               </div>
//                             </td>
//         </tr>`;
//       }
//       employeeTableBody.innerHTML = temp;
//     }
//     displayEmployees(currentPage);
//}