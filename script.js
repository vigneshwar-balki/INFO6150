const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addStudent");
const submitBtn = document.getElementById("submitAwards");

// Update UI visibility and button states
function updateUI() {
    const checkedCount = tableBody.querySelectorAll('input[type="checkbox"]:checked').length;
    const isAnyChecked = checkedCount > 0;
    
    document.querySelectorAll(".manage-col").forEach(col => {
        col.style.display = isAnyChecked ? "table-cell" : "none";
    });

    if (isAnyChecked) {
        submitBtn.disabled = false;
        submitBtn.classList.add("submit-active");
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove("submit-active");
    }
}

// Logic for dynamic interactions (Arrow toggle, Delete, Edit)
tableBody.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    
    // Toggle Expansion 
    if (e.target.classList.contains("arrow")) {
        const details = row.nextElementSibling;
        details.style.display = (details.style.display === "table-row") ? "none" : "table-row";
    }

    // Delete Row 
    if (e.target.classList.contains("deleteBtn")) {
        const studentName = row.cells[1].innerText;
        row.nextElementSibling.remove();
        row.remove();
        alert(`${studentName} Record deleted successfully`); 
        updateUI();
    }

    // Edit Row  Alert only, no data update
    if (e.target.classList.contains("editBtn")) {
        const studentName = row.cells[1].innerText;
        if (prompt(`Edit details of ${studentName}`)) { 
            alert(`${studentName} data updated successfully`); 
        }
    }
});

// Row selection listener 
tableBody.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        const row = e.target.closest("tr");
        if (e.target.checked) {
            row.classList.add("selected-row");
            row.cells[8].innerHTML = '<button class="deleteBtn">Delete</button>';
            row.cells[9].innerHTML = '<button class="editBtn">Edit</button>';
        } else {
            row.classList.remove("selected-row");
            row.cells[8].innerHTML = '';
            row.cells[9].innerHTML = '';
        }
        updateUI();
    }
});

// Add New Student 
addBtn.addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr:not(.dropDownRow)");
    let lastNum = 0;
    if (rows.length > 0) {
        lastNum = parseInt(rows[rows.length - 1].cells[1].innerText.split(" ")[1]);
    }
    const nextId = lastNum + 1;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td><input type="checkbox" /><br><br><i class="fas fa-chevron-down arrow"></i></td>
        <td>Student ${nextId}</td><td>Teacher ${nextId}</td>
        <td>Approved</td><td>Fall</td><td>TA</td><td>${12345 + (nextId*10)}</td><td>100%</td>
        <td class="manage-col"></td><td class="manage-col"></td>`;
    
    const details = document.createElement("tr");
    details.className = "dropDownRow";
    details.innerHTML = `<td colspan="10">Advisor: Teacher ${nextId}<br><br>Details: Honors Student</td>`;

    tableBody.appendChild(row);
    tableBody.appendChild(details);
    alert(`Student ${nextId} Record added successfully`); // Requirement 16
});