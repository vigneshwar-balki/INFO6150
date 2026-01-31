const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addStudent");

addBtn.addEventListener("click", () => {
    try {
        // Find the last student number by looking at the last student row's text
        const rows = tableBody.querySelectorAll("tr:not(.dropDownRow)");
        let lastStudentNum = 0;
        
        if (rows.length > 0) {
            const lastRowText = rows[rows.length - 1].cells[1].innerText; // e.g., "Student 3"
            lastStudentNum = parseInt(lastRowText.split(" ")[1]);
        }

        const nextId = lastStudentNum + 1;

        // Create main row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <input type="checkbox" /><br /><br />
                <i class="fas fa-chevron-down arrow"></i>
            </td>
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

        // Create details row (collapsed by default)
        const detailsRow = document.createElement("tr");
        detailsRow.className = "dropDownRow";
        detailsRow.innerHTML = `<td colspan="10">Advisor: Teacher ${nextId}<br><br>Details: Honors Student Fall 1-2024(TA)<br>Comments: Outstanding</td>`;

        // Add to table
        tableBody.appendChild(row);
        tableBody.appendChild(detailsRow);

        // Requirement 16: Success Popup
        alert(`Student ${nextId} Record added successfully`);
    } catch (error) {
        // Requirement 17: Error Popup
        alert("Record addition failed");
    }
});