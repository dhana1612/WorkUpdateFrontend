
    var Email;

    function goBack() {
      0
    }

    window.onload = function () {
        myFunction();
    };

    function myFunction() {
        const params1 = new URLSearchParams(window.location.search);
        Email = params1.get("value");
        User_Information();
    }

    // Retrieve User Information through Email ID
    function User_Information() {
        const send_Email = Email;
        fetch("https://workupdate.onrender.com/api/UserLogins/User_Information", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(send_Email), // Send Email as JSON
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then((errorMessage) => {
                    throw new Error(errorMessage || "Network response was not ok");
                });
            }
            return response.json(); // Parse response as JSON
        })
        .then((data) => {
            const base64Image = data.profile_Image; // Assuming API returns 'Profile_Image'
            const imageElement = document.getElementById('profileIcon');
            console.log(data)

            if (!base64Image || base64Image.trim() === "") {
                if (data.gender === "Male") {
                    imageElement.src = "https://st5.depositphotos.com/17433220/73304/i/450/depositphotos_733041150-stock-photo-silhouette-adult-man-male-avatar.jpg";
                } else {
                    imageElement.src = "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-grey-600nw-518740768.jpg";
                }
            } else {
                imageElement.src = `data:image/png;base64,${base64Image}`;
            }

            // Update the DOM with received data
            document.getElementById("username").innerHTML = data.userName;
            document.getElementById("Email").innerHTML = data.email;
            document.getElementById("PhoneNumber").innerHTML = data.phoneNumber;
            document.getElementById("Password").innerHTML = data.password;
            document.getElementById("Gender").innerHTML = data.gender;
            document.getElementById("Date").innerHTML = data.date;
            document.getElementById("Position").innerHTML = data.date;
        })
        .catch((error) => {
            alert("Error fetching user information: " + error.message);
        });
    }

    // Handle file input change and upload
    const fileInput = document.getElementById('fileInput');
    const profileIcon = document.getElementById('profileIcon');

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        
        // Validate file type and size
        if (!file.type.startsWith('image/')) {
            alert("Only image files are allowed!");
            return;
        }
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            alert("File size should not exceed 2MB!");
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                profileIcon.src = event.target.result;
                profile_photo(event.target.result.split(",")[1]); // Send Base64 image
            };
            reader.readAsDataURL(file);
        }
    });

    // Save the Profile Photo
    function profile_photo(base64Image) {
        const data = {
            Email: Email,
            Profile_Image: base64Image,
        };

        fetch("https://workupdate.onrender.com/api/UserLogins/profile_photo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
            alert("Profile photo uploaded successfully!");
        })
        .catch(error => {
            alert("Error uploading profile photo: " + error.message);
        });
    }
