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
  
 //add employee form submit
 document
  .getElementById("ad-employee-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = document.getElementById("addEmployeeForm");
    const formData = new FormData(form);

    const submitButton = document.getElementById("ad-employee-btn");
    submitButton.disabled = true;

    // Capture avatar
    const avatarInput = document.getElementById("imageUpload");
    if (avatarInput && avatarInput.files.length > 0) {
      formData.append("avatar", avatarInput.files[0]);
    } else {
      alert("Please upload an avatar image.");
      submitButton.disabled = false;
      return;
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };


    // Capture employee data
    const employeeData = {
      salutation: document.getElementById("salutation").value.trim(),
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      dob: formatDate(document.getElementById("dob").value),
      gender: document.querySelector('input[name="gender"]:checked')?.value,
      qualifications: document.getElementById("qualification").value.trim(),
      address: document.getElementById("address").value.trim(),
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value.trim(),
    };

    // Validate fields
    const requiredFields = [
      "salutation", "firstName", "lastName", "email", "phone", "dob", "gender",
      "address", "country", "state", "city"
    ];
    for (const field of requiredFields) {
      if (!employeeData[field]) {
        alert(`Please fill out the ${field} field.`);
        submitButton.disabled = false;
        return;
      }
    }

    // Append fields to FormData
    for (const key in employeeData) {
      formData.append(key, employeeData[key]);
    } 

    try {
      const response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Employee added successfully!");
        form.reset();
        document.getElementById("imagePreview").innerHTML = "";
        document.getElementById("employeeForm").style.display = "none";
        loadEmployees(); // Refresh the UI
      } else {
        alert(`Error: ${result.error || "Failed to add employee"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      submitButton.disabled = false;
    }
  });

// Image preview
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
        event.target.value = "";
        previewContainer.innerHTML = "";
        return;
      }

      if (file.size > maxSize) {
        alert("File size exceeds the 5MB limit.");
        event.target.value = "";
        previewContainer.innerHTML = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        previewContainer.innerHTML = `
          <img src="${e.target.result}" alt="Image Preview"
               class="img-fluid rounded"
               style="max-width: 100px; max-height: 100px;">
          <input type="hidden" name="avatar_uploaded" value="true">
        `;
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.innerHTML = "";
      document.querySelector("input[name='avatar_uploaded']")?.remove();
    }
  });

// Load employees and refresh UI
async function loadEmployees() {
  try {
    const response = await fetch("http://localhost:3000/employees");
    const employees = await response.json();
    const container = document.getElementById("employeesContainer");
    container.innerHTML = "";

    employees.forEach((employee, index) => {
      const row = document.createElement("div");
      row.className = "row py-2 border-bottom align-items-center text-center";
      row.innerHTML = `
        <div class="col-1">${index + 1}</div>
        <div class="col-2 d-flex align-items-center gap-2">
          <img src="http://localhost:3000/avatar/${employee.id}"
               class="profile-img"
               style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
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
        </div>`;
      container.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading employees:", error);
  }
}

// Automatically load employees on page load
window.onload = loadEmployees;



window.editEmployee = function (id) {
  console.log("Edit clicked for ID:", id);
  document.getElementById("editOverlay").style.display = "block";
  document.getElementById("editForm").style.display = "block";
  // You can also fill in data here later if needed
};

window.deleteEmployee = function (id) {
  console.log("Delete clicked for ID:", id);
  document.getElementById("deleteOverlay").style.display = "block";
  document.getElementById("deleteForm").style.display = "block";
};

window.viewEmployee = function (id) {
  console.log("View clicked for ID:", id);
  window.location.href = `employeee.html?id=${id}`;
};
