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


