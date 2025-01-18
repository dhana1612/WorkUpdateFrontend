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
        const JoiningDate = item.joiningDate;
        const Experience = item.experience;

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

        //Create Joining Date
        const joiningDate = document.createElement("td");
        joiningDate.textContent = JoiningDate;
        row.appendChild(joiningDate);

        //Create Experiencs
        const experience = document.createElement("td");
        experience.textContent = Experience;
        row.appendChild(experience);

        // Append the row to the table body
        tableBody.appendChild(row);
    }
}

