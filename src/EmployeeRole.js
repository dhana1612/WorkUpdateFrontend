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
        const response = await fetch(`https://localhost:7035/api/Admin/Retrive_UserName_Role`);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Network response was not ok");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            console.log(data)
           // populateTable(data); 
        } else {
            alert("Unexpected data format");
        }
    } catch (error) {
        alert(error);
    }
}