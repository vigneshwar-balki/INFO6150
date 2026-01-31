const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addStudent");

// Helper function to update the visibility of dynamic columns (Requirement 43)
function toggleActionColumns(show) {
    const cols = document.querySelectorAll(".manage-col");
    cols.forEach(col => {
        col.style.display = show ? "table-cell" : "none";
    });
}

// Checkbox selection listener (Requirement 7 & 10)
tableBody.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        const row = e.target.closest("tr");
        const deleteCell = row.cells[8];
        const editCell = row.cells[9];

        if (e.target.checked) {
            row.classList.add("selected-row"); // Requirement 7a
            // Add dynamic buttons (Requirement 7c, 7d)
            deleteCell.innerHTML = '<button class="deleteBtn">Delete</button>';
            editCell.innerHTML = '<button class="editBtn">Edit</button>';
        } else {
            row.classList.remove("selected-row"); // Requirement 10a
            deleteCell.innerHTML = '';
            editCell.innerHTML = '';
        }

        // Check if any checkboxes are still selected to keep columns visible
        const anyChecked = tableBody.querySelectorAll('input[type="checkbox"]:checked').length > 0;
        toggleActionColumns(anyChecked);
    }
});

// Logic from Commit 3: Add New Student
addBtn.addEventListener("click", () => {
    try {
        const rows = tableBody.querySelectorAll("tr:not(.dropDownRow)");
        let lastStudentNum = 0;
        if (rows.length > 0) {
            const lastRowText = rows[rows.length - 1].cells[1].innerText;
            lastStudentNum = parseInt(lastRowText.split(" ")[1]);
        }
        const nextId = lastStudentNum + 1;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox" /><br /><br /><i class="fas fa-chevron-down arrow"></i></td>
            <td>Student ${nextId}</td>
            <td>Teacher ${nextId}</td>
            <td>Approved</td>
            <td>Fall</td>
            <td>TA</td>
            <td>${12345 + (nextId * 100)}</td>
            <td>100%</td>
            <td class="manage-col"></td>
            <td class="manage-col"></td>
        `;
        const detailsRow = document.createElement("tr");
        detailsRow.className = "dropDownRow";
        detailsRow.innerHTML = `<td colspan="10">Advisor: Teacher ${nextId}<br><br>Details: Honors Student</td>`;

        tableBody.appendChild(row);
        tableBody.appendChild(detailsRow);
        alert(`Student ${nextId} Record added successfully`);
    } catch (error) {
        alert("Record addition failed");
    }
});