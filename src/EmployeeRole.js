//This will call 1st when the page loads
window.onload = function () {
    myFunction();
};

function myFunction() {
     Retrive_UserName_Role()
}

async function Retrive_UserName_Role()
{
    try {
        const response = await fetch(`https://workupdate.onrender.com/api/Admin/Retrive_UserName_Role`);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Network response was not ok");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            console.log(data)
            populateTable(data); 
        } else {
            alert("Unexpected data format");
        }
    } catch (error) {
        alert(error);
    }
}

// PopulateTable() Function store the retrive datas in Table Format 
async function populateTable(data) {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    let serial_number = 1;

    for (let item of data) {
        const UserName = item.userName;
        const Role = item.role; 

        // Serial Number
        const row = document.createElement("tr");
        var idCell = document.createElement("td");
        idCell.textContent = serial_number;
        serial_number = serial_number + 1;
        row.appendChild(idCell);

        // Create username column
        const name = document.createElement("td");
        name.textContent = UserName;
        row.appendChild(name);

        // Create Role column
        const role = document.createElement("td");
        role.textContent = Role;
        row.appendChild(role);

        // Role dropdown
        const status = document.createElement("td");
        const statusDropdown = document.createElement("select");
        statusDropdown.classList.add("form-select", "form-select-sm");
        statusDropdown.style.border = "none";

        // Define the options for the dropdown
        const options = [
            { value: "Junior_Software_Developer", text: "Junior Software Developer" },
            { value: "Senior_Software_Developer", text: "Senior Software Developer" },
            { value: "Mern_Stack_Developer", text: "Mern Stack Developer" },
            { value: "Data_Analyst", text: "Data Analyst" },
            { value: "Intern", text: "Intern" },
            { value: "Software_Developer", text: "Software Developer" },
        ];

        // Populate the dropdown with options
        options.forEach(optionData => {
            const option = document.createElement("option");
            option.value = optionData.value;
            option.textContent = optionData.text;

            // Set default value based on Role
            if (optionData.text === Role) {
                option.selected = true;
            }
            statusDropdown.appendChild(option);
        });

        statusDropdown.addEventListener("change", async (event) => {
            const selectedOption = event.target.selectedOptions[0];  
            const updatedRole = selectedOption.textContent;
            Role = updatedRole;
            console.log(updatedRole)
        });

        // Append the dropdown to the status cell
        status.appendChild(statusDropdown);

        // Append the status cell to the row
        row.appendChild(status);

        // Append the row to the table body
        tableBody.appendChild(row);
    }
}

