function Register(event) {
    const username = document.getElementById('username').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const gender = document.getElementById("mySelect").value;
    const Date = document.getElementById("Date").value;
    const Joining_Date = document.getElementById("Joining_Date").value;
   
    // Data to be sent to the backend
    const data = {
        username: username,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        confirmPassword:confirmPassword,
        gender:gender,
        date:Date,
        Joining_Date:Joining_Date
    };

    console.log(data)

    fetch("https://workupdate.onrender.com/api/UserLogins", {
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
        document.getElementById("form").reset();
        goBack();  

        // window.location.href = "/src/AdminDashBoard.html";

       
    })
    
    .catch(error => {
         alert(error);
         document.getElementById("message").textContent = error;
    });
    
}

function goBack() {
    window.history.back();
  }

  window.onload = function () {
    myFunction();
};

function myFunction() {
   
}
