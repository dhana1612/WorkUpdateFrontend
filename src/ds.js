var Email1;
const statusmessage ="Request is Pending";

function redirectToUserDetails(){
    console.log(Email1)
    window.location.href = `../src/User_Information.html?value=${encodeURIComponent(Email1)}`;

}

window.onload = function (){
    myFunction();
}

function myFunction() {
    const params1 = new URLSearchParams(window.location.search); 
    Email1 = params1.get('value'); 
    displayAllData()
    RetriveUserNameForChatMessage(Email1) 
    RetriveChatMessage()
}

//Retrive the UserName through Email
function RetriveUserNAme() {

    const data = {
        Email:Email1
    };
    console.log(data)
    fetch("https://localhost:7035/api/UserLogins/RetriveUserName1", {
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
        document.getElementById("UserNAme").innerHTML=message;
    })
    
    .catch(error => {
         alert(error);
         document.getElementById("message").textContent = error;
    });
}

//Save the Work Update in Database
function WorkUpdated() {
    const date = document.getElementById('dateSelect').value;
    const workUpdate = document.getElementById('workUpdate').value;
    const workUpdateLink = document.getElementById('workUpdateLink').value;
    feedbackmessage ="Request is Pending";
    const data = {
        Email:Email1,
        date: date,
        WorkUpdates: workUpdate,
        TaskLinks: workUpdateLink, 
        statusmessage :statusmessage,
        feedbackmessage:feedbackmessage
    };

    console.log(data);
    fetch("https://localhost:7035/api/WorkUpdate/WorkUpdate", {
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
        
        displayAllData();
        document.getElementById("dateSelect").value = "";
        document.getElementById("workUpdate").value = "";
        document.getElementById("workUpdateLink").value = "";
        location.reload();
    })
    
    .catch(error => {
         alert(error);
         document.getElementById("message").textContent = error;
    });
}

//Retrive the Data from Database through Email
function displayAllData() {
    fetch(`https://localhost:7035/api/WorkUpdate/${encodeURIComponent(Email1)}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage || "Network response was not ok");
                });
            }
            return response.json(); 
        })
        .then(data => { 
            RetriveUserNAme();
            if (Array.isArray(data)) {
                populateTable(data); 
            } else {
                alert("Unexpected data format");
            }
        })
        .catch(error => {
            document.getElementById("dataTable").style.display = "none";
        });
}        

// Update populateTable to handle async responses
async function populateTable(data) {
    const tableBody = document.getElementById("dataTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clearing the Existing Row

    let serial_number = 1;
    for (const item of data) {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = serial_number++;
        row.appendChild(idCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = item.date;
        row.appendChild(dateCell);

        const workUpdatesCell = document.createElement("td");
        workUpdatesCell.textContent = item.workUpdates;
        row.appendChild(workUpdatesCell);

        const taskLinksCell = document.createElement("td");
        const link = document.createElement("a");
        link.href = item.taskLinks;
        link.textContent = item.taskLinks;
        link.target = "_blank";
        taskLinksCell.appendChild(link);
        row.appendChild(taskLinksCell);

        const editCell = document.createElement("td"); 
        const editButton = document.createElement("button"); 
        editButton.textContent = "Edit"; 
        editButton.onclick = function() {
            edit(item.id, item.date, item.workUpdates, item.taskLinks);
        };
        editButton.setAttribute("data-toggle", "modal");
        editButton.setAttribute("data-target", "#exampleModalCenter");
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Create the status cell
        const statusCell = document.createElement("td");
        const statusButton = document.createElement("button");
        statusButton.textContent = "Show";
        statusButton.classList.add("btn", "btn-warning", "btn-sm");

        const popover = document.createElement("div");
        popover.classList.add("popover", "popover-bs", "bg-dark", "text-white", "p-2", "rounded", "shadow-lg");
        popover.style.position = "absolute";
        popover.style.visibility = "hidden";
        popover.style.zIndex = "1000";
        document.body.appendChild(popover);

        statusButton.addEventListener("click", async () => {
            const rect = statusButton.getBoundingClientRect();
            popover.style.left = `${rect.right + 10}px`;
            popover.style.top = `${rect.top}px`;

            // const resmessage ="Request is Pending"
            const resmessage = await AdminValidateResponse(item.id);
            console.log(resmessage)
            popover.textContent = resmessage;
            popover.style.visibility = (popover.style.visibility === "hidden") ? "visible" : "hidden";
        });

        document.addEventListener("click", (event) => {
            if (event.target !== statusButton && event.target !== popover) {
                popover.style.visibility = "hidden";
            }
        });

        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    }
}

//This Function is used for Edit the Existing Data
function edit(id, date, workUpdate, workUpdateLink) {
    // Populate modal fields with existing values
    document.getElementById("dateSelect").value = date;
    document.getElementById("workUpdate").value = workUpdate;
    document.getElementById("workUpdateLink").value = workUpdateLink;

    // Change the modal action button to "Edit"
    const actionButton = document.getElementById("modalActionButton");
    actionButton.textContent = "Edit";
    actionButton.onclick = function() {
        updateWorkDetails(id); // Call the function to update details
    };

}

// Function to handle saving changes for an existing entry
function updateWorkDetails(id) {


    const date = document.getElementById('dateSelect').value;
    const workUpdate = document.getElementById('workUpdate').value;
    const workUpdateLink = document.getElementById('workUpdateLink').value;
   
    feedbackmessage="Request is Pending"
    const data = {
        Id:id,
        Email:Email1,
        date: date,
        WorkUpdates: workUpdate,
        TaskLinks: workUpdateLink, 
        statusmessage:statusmessage,
        feedbackmessage:feedbackmessage
    };
   

    console.log(data);
    fetch("https://localhost:7035/api/WorkUpdate/ExistingDetailsUpdate", {
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
        displayAllData();
        document.getElementById("dateSelect").value = "";
        document.getElementById("workUpdate").value = "";
        document.getElementById("workUpdateLink").value = "";
    })
    
    .catch(error => {
         alert(error);
         document.getElementById("message").textContent = error;
    });
}
    
function AdminValidateResponse(id) {
    const data = {
        Id: id,
        statusmessage: "",
        feedbackmessage: ""
    };

    return fetch("https://localhost:7035/api/WorkUpdate/AdminValidateResponse", {
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
    .catch(error => {
        console.error(error);
        return "Error occurred";
    });
}














//Chat Community
const chatButton = document.getElementById('chatButton');
const chatModal = document.getElementById('chatModal');
const closeModal = document.getElementById('closeModal');
const groupFrame = document.getElementById('groupFrame');
const cancelGroupButton = document.getElementById('cancelGroup');
const createGroupButton = document.getElementById('createGroup');
const chatGroups = document.getElementById('chatGroups');
const employeeList = document.getElementById('employeeList');
const selectedNames = document.getElementById('selectedNames');
// Variables for the new group chat modal
const newGroupModal = document.getElementById('newGroupModal');
const groupNameHeading = document.getElementById('GroupName');
const closeGroupModal = document.getElementById('closeGroupModal');
var selected;
var groupName;
var groupDescription;


// Open My Chat Modal
chatButton.addEventListener('click', () => {
    chatModal.style.display = 'flex';
    checkDbForGroups()
});

// Close My Chat Modal
closeModal.addEventListener('click', () => {
    chatModal.style.display = 'none';
});


let sendMessageHandler;
let isSendMessageAttached = false; // Flag to prevent multiple event listener attachments

document.addEventListener('DOMContentLoaded', () => {

    // Setup SignalR connection
    chatConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7035/hubs/Chat").withAutomaticReconnect().build();

    // Handle reconnection logic
    chatConnection.onreconnecting(() => {
        console.warn("Reconnecting to the chat hub...");
    });

    chatConnection.onreconnected(() => {
        console.log("Reconnected to the chat hub.");
        if (GroupStatus) {
            chatConnection.invoke("JoinGroup", GroupStatus).catch(err => console.error("Error rejoining group:", err));
        }
    });

    chatConnection.onclose(async () => {
        console.error("Chat connection lost. Attempting to reconnect...");
        await chatConnection.start().catch(err => console.error("Reconnection failed:", err));
    });

    // Start the connection
    chatConnection.start().then(() => console.log("Chat Connection Started Successfully")).catch(err => console.error("Chat Connection Failed", err));
});


    // Open the new group chat modal
    function openGroupModal(groupName) {
        chatModal.style.display = 'none';
        newGroupModal.style.display = 'flex';

        // Set the group name in the new modal
        groupNameHeading.textContent = groupName;
        chatMessages.innerHTML = "";

        RetriveChatMessage(groupName);

        // Join the group
        if (chatConnection.state === "Disconnected") {
            chatConnection.start()
                .then(() => {
                    chatConnection.invoke("JoinGroup", groupName).catch(err => console.error("Error joining group:", err));
                    GroupStatus = groupName;
                })
                .catch(err => console.error("Chat Connection Failed", err));
        } else {
            chatConnection.invoke("JoinGroup", groupName).catch(err => console.error("Error joining group:", err));
            GroupStatus = groupName;
        }

        // Remove previous SignalR listener before adding a new one
        chatConnection.off("addNewMessageToPage");

        // Add SignalR listener for new messages
        chatConnection.on("addNewMessageToPage", (name, message, time, groupName) => {
            const newMessage = document.createElement('li');
            newMessage.classList.add('chat-message');

            newMessage.innerHTML = `
                <div class="chat-bubble">
                    <span class="chat-name">${name}</span>
                    <span class="chat-time">[${time}]</span>    
                    <p class="chat-text">${message}</p>
                </div>
            `;

            chatMessages.appendChild(newMessage);
            chatInput.value = '';
        });

        // Ensure the handler is only attached once
        if (!isSendMessageAttached) {
            sendMessageHandler = function() {
                time = displayCurrentTime();
                const currentDate = new Date();
                ResDate = currentDate.toLocaleDateString();
                resmessage = chatInput.value.trim();

                if (resmessage) {
                    chatConnection.invoke("Send", groupName, RetriveUserNameForChatMessages, resmessage, time)
                        .catch(err => console.error(err));
                    chatMessageSave(groupName);
                    chatInput.value = '';
                }
            };

            sendMessage.addEventListener('click', sendMessageHandler);
            isSendMessageAttached = true; // Mark the listener as attached
        }
    }

    // Close the new group chat modal
    closeGroupModal.addEventListener('click', () => {
        if (GroupStatus) {
            chatConnection.invoke("LeaveGroup", GroupStatus).catch(err => console.error("Error leaving group:", err));
            GroupStatus = null;
        }

        // Clean up SignalR listener for the current group
        chatConnection.off("addNewMessageToPage");

        // Remove event listener to prevent duplicate listeners
        if (sendMessageHandler) {
            sendMessage.removeEventListener('click', sendMessageHandler);
            isSendMessageAttached = false; // Reset the flag
        }

        newGroupModal.style.display = 'none';
        chatModal.style.display = 'flex'; // Open the "My Chat" modal again
        chatMessages.innerHTML = "";
    });




//Chat Message
var chatConnection;
var GroupStatus;
var ResDate;
var time;
var resmessage;
var groupName;
var groupDescription;
var RetriveUserNameForChatMessages;
const sendMessage = document.getElementById('sendMessage');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');


// document.addEventListener('DOMContentLoaded', () => { // Setup SignalR connection 
// const chatConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7035/hubs/Chat").build();

//     chatConnection.start().then(() => {
//         console.log("Chat Connection Started Successfully");

//         // Send Message
//         sendMessage.addEventListener('click', () => {
//             time = displayCurrentTime();
//             let currentDate = new Date();
            
//             var GroupName =  document.getElementById("GroupName").innerText;
//             console.log(GroupName)
    
//              ResDate = currentDate.toLocaleDateString();
//              resmessage = chatInput.value.trim();
    
    
//             if (resmessage) {
//                 chatConnection.invoke("Send", RetriveUserNameForChatMessages, resmessage, time).catch(err => console.error(err));
//                 chatMessageSave(GroupName);
//                 chatInput.value = '';
//             }
//         });
//     }).catch(err => console.error("Chat Connection Failed", err));
    
    
    
//     // Listen for new messages from the server
//     chatConnection.on("addNewMessageToPage", (name, message, time) => {
//             // Create a new list item for the message
//             const newMessage = document.createElement('li');
//             newMessage.classList.add('chat-message');
    
            
//             newMessage.innerHTML = `
//                 <div class="chat-bubble">
//                     <span class="chat-name">${name}</span>
//                     <span class="chat-time">[${time}]</span>    
//                     <p class="chat-text">${message}</p>
//                 </div>
//             `;
    
//             // Append the new message to the chat container
//             chatMessages.appendChild(newMessage);
    
//             chatInput.value = '';
//     });



// });
    




//Retrive the Matches Group Name


function checkDbForGroups() {
    const data = {
        UserName: RetriveUserNameForChatMessages
    };
    
    fetch("https://localhost:7035/api/UserLogins/checkDbForGroups", {
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
        return response.json(); // Ensure the response is parsed as JSON
    })
    .then(message => {
        console.log(message);
        displayGroupname(message);
    })
    .catch(error => {
        alert(error);
    });
}


function displayGroupname(data) {
    if (Array.isArray(data)) {  // Check if data is an array
        data.forEach((message) => {
            const groupElement = document.createElement('div');
            groupElement.style.padding = '10px';
            groupElement.style.marginBottom = '10px';
            groupElement.style.border = '1px solid #ccc';
            groupElement.style.borderRadius = '5px';
            groupElement.style.background = '#f8f9fa';
            groupElement.style.color = 'black';
            groupElement.innerHTML = `
                <strong class="group-name">${message.groupName}</strong>
                <p>${message.description || 'No description provided'}</p>
            `;

            // Add event listener for opening group modal when the div(groupElement) is clicked
            groupElement.addEventListener('click', () => {
                openGroupModal(message.groupName);
            });

            // Append to chat modal
            chatGroups.appendChild(groupElement);
        });
    } else {
        console.error('Expected an array but received:', data);
    }
}


    
    // //Save the ChatMessage
    function chatMessageSave(GroupName) {
        const localDate = new Date(ResDate);
        ResDate = localDate.toLocaleDateString('en-CA');
        const data = {
            GroupName: GroupName,
            UserName: RetriveUserNameForChatMessages,
            Email: Email1,
            Message: resmessage,
            Date: ResDate,
            Time: time
        };
    
        console.log(data); // Debugging purpose
        fetch("https://localhost:7035/api/GroupChat/GroupChat", {
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
        })
        .catch(error => {
            alert(error);
        });
    }
    
    //Retrive the ChatMessage for DB
    function RetriveChatMessage(groupName) {
        const data = {
            GroupName: groupName
        };
        fetch("https://localhost:7035/api/GroupChat/RetriveChatMessage", {
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
            return response.text(); // Returns the response as a string
        })
        .then(message => {
            DisplayChatMessage(message); // Pass the response text to DisplayChatMessage
        })
        .catch(error => {
            alert(error);
        });
    }
    
    //After Retrive the ChatMessage from DB it will display in the Model
    function DisplayChatMessage(chatMessage) {
        // Parse the JSON string into an array of objects
        const messages = JSON.parse(chatMessage);
        console.log(chatMessage)

        // Iterate over the array and display each message
        for (let item1 of messages) {
            const newMessage = document.createElement('li');
                newMessage.classList.add('chat-message');

                // Add message content with structured HTML for a chat bubble style
                newMessage.innerHTML = `
                    <div class="chat-bubble">
                        <span class="chat-name">${item1.userName}</span>
                        <span class="chat-time">[${item1.time}]</span>    
                        <p class="chat-text">${item1.message}</p>
                    </div>
                `;

                // Append the new message to the chat container
                chatMessages.appendChild(newMessage);
        }
    }

    
    // // Retrieve the Username using Email
    function RetriveUserNameForChatMessage(Email) {
        const data = {
            Email: Email
        };
        fetch("https://localhost:7035/api/GroupChat/RetriveUserName", {
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
            RetriveUserNameForChatMessages = message;
        })
        .catch(error => {
            alert(error);
            document.getElementById("message").textContent = error;
        });
    }
    
    function displayCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // Format hours as two digits
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Format minutes as two digits
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}:${seconds}`;
        timewithoutseconds = `${hours}:${minutes}`;
        return currentTime;
    }
    
    // Update the time every second
    setInterval(displayCurrentTime, 1000);
    
    
    //Chat Message Logic End
