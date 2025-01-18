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
        const JoiningDate = item.joining_Date;
        console.log(item.joining_Date)
        const Experience = calculateExperience(JoiningDate);
        

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


       // Create Role Column
        const role = document.createElement("td");
        role.textContent = Role;

        // Create Edit Icon
        const editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit";
        editIcon.style.cursor = "pointer";
        editIcon.style.marginLeft = "10px";

        editIcon.addEventListener("click", () => {
            // Clear existing role text or dropdown
            role.textContent = "";

            // Create Dropdown
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

            // Handle Dropdown Value Change
            statusDropdown.addEventListener("change", async (event) => {
                const selectedOption = event.target.selectedOptions[0];
                const updatedRole = selectedOption.textContent;
                Role = updatedRole;

                // Update the cell text with the new role and remove the dropdown
                role.textContent = updatedRole;
                role.appendChild(editIcon);
            });

            // Append the dropdown to the role cell
            role.appendChild(statusDropdown);
        });

        // Append the edit icon initially
        role.appendChild(editIcon);
        row.appendChild(role);

      
        


        //Create Joining Date
        const joiningDate = document.createElement("td");
        joiningDate.textContent = JoiningDate;
        row.appendChild(joiningDate);

        //Create Experiencs
        const experience = document.createElement("td");
        experience.textContent = ` ${Experience.years} years, ${Experience.months} months, and ${Experience.days} days.`
        row.appendChild(experience);

        // Append the row to the table body
        tableBody.appendChild(row);
    }
}


function calculateExperience(startDate) {
    const start = new Date(startDate); // Starting date
    const now = new Date(); // Current date

    // Calculate the difference in years, months, and days
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    // Adjust for negative values in months or days
    if (days < 0) {
        months -= 1;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Days in the previous month
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}


