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
           // populateTable(data); 
        } else {
            alert("Unexpected data format");
        }
    } catch (error) {
        alert(error);
    }
}