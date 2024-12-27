var verresp ="";


function ForgetPsd() {
    const email = document.getElementById('email').value;
    const data = {
        Email: email,
    };

    console.log(data);
    fetch("https://localhost:7035/api/UserLogins/EmailCheck", {
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

        const resp = JSON.parse(message);
        // console.log(resp)
        verresp = resp;
        // console.log(message);
        document.getElementById("vcode").style.display = "block";
        document.getElementById("bcode").style.display = "none";
        //document.getElementById("Reset").style.display = "block";

        


        // document.getElementById("form").reset();  
        // window.location.href = `UpdatePsd.html?value=${encodeURIComponent(email)}`;
       
    })
    
    .catch(error => {
         document.getElementById("message").textContent = error;
    });

}

function verify(){
    const email = document.getElementById('email').value;
    console.log(email)
    const verifycode = document.getElementById("code").value;
    
     if(verifycode==verresp)
     {
        document.getElementById("form").reset();  
        window.location.href = `../src/UpdatePsd.html?value=${encodeURIComponent(email)}`;
     }
     else{
        document.getElementById("message").textContent = "Verify Failed";
     }

}