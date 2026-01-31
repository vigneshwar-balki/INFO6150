const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addStudent");
const submitBtn = document.getElementById("submitAwards");

function toggleActionColumns(show) {
    const cols = document.querySelectorAll(".manage-col");
    cols.forEach(col => { col.style.display = show ? "table-cell" : "none"; });
}

// Requirement 7b & 10b: Update Submit button state
function updateSubmitButton() {
    const checkedCount = tableBody.querySelectorAll('input[type="checkbox"]:checked').length;
    if (checkedCount > 0) {
        submitBtn.disabled = false;
        submitBtn.classList.add("submit-active");
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove("submit-active");
    }
}

tableBody.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        const row = e.target.closest("tr");
        const deleteCell = row.cells[8];
        const editCell = row.cells[9];

        if (e.target.checked) {
            row.classList.add("selected-row");
            deleteCell.innerHTML = '<button class="deleteBtn">Delete</button>';
            editCell.innerHTML = '<button class="editBtn">Edit</button>';
        } else {
            row.classList.remove("selected-row");
            deleteCell.innerHTML = '';
            editCell.innerHTML = '';
        }

        const anyChecked = tableBody.querySelectorAll('input[type="checkbox"]:checked').length > 0;
        toggleActionColumns(anyChecked);
        updateSubmitButton(); // Call button state management
    }
});

// From Commit 3: Add New Student
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
        updateSubmitButton(); // Ensure button state reflects new unselected row
    } catch (error) {
        alert("Record addition failed");
    }
});