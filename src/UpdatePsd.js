const params = new URLSearchParams(window.location.search); 
const Email = params.get('value'); 
console.log(Email)

function Login() {
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const data = {
            ConfirmPassword: confirmPassword,
            Password: password,
            Email: Email
        };
         console.log(Email);
         console.log(data);
        fetch("https://localhost:7035/api/UserLogins/UpdatePsd", {
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
            alert(message);
            document.getElementById("message").textContent = message;
            document.getElementById("form").reset();  
    
            window.location.href = "/index.html";
           
        })
        
        .catch(error => {
             alert(error);
             document.getElementById("message").textContent = error;
        });
    }
    
