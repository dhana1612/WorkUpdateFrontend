

function Login() {
    const email = document.getElementById('value').value;
    const password = document.getElementById('password').value;

    const data = {
        Email: email,
        Password: password
    };

    console.log(data);
    fetch("https://workupdate.onrender.com/api/UserLogins/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage || "Network response was not ok");
            });
        }
        return response.text();
    })
    .then(message => {
        // Display the backend response message
        const msg = "User";
        const msg1 = "Admin";
        if(message===msg)
        {
            document.getElementById("form").reset();  
            window.location.href = `src/sample.html?value=${encodeURIComponent(email)}`;
        }
        else if(message===msg1){
            document.getElementById("message").textContent = message;
            document.getElementById("form").reset();  
            window.location.href = `src/AdminDashBoard.html?value=${encodeURIComponent(email)}`;
        }
        
    })
    
    .catch(error => {
         alert(error);
         document.getElementById("message").textContent = error;
    });
}