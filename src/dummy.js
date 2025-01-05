


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




// Open My Chat Modal
chatButton.addEventListener('click', () => {
    chatModal.style.display = 'flex';
});

// Close My Chat Modal
closeModal.addEventListener('click', () => {
    chatModal.style.display = 'none';
});



// Open Group Modal
groupIcon.addEventListener('click', () => {
    chatModal.style.display = 'none';
    groupFrame.style.display = 'flex';
});

// Close Group Modal
closeGroupFrame.addEventListener('click', () => {
    groupFrame.style.display = 'none';
    chatModal.style.display = 'flex';
});

// Cancel Group Creation
cancelGroupButton.addEventListener('click', () => {
    groupFrame.style.display = 'none';
    chatModal.style.display = 'flex';
});


// Create New Group
createGroupButton.addEventListener('click', () => {
    groupName = document.getElementById('groupName').value.trim();
    groupDescription = document.getElementById('groupDescription').value.trim();
    createGroup(selected,groupName,groupDescription)

       // Close group modal
       groupFrame.style.display = 'none';
       chatModal.style.display = 'flex';

       // Reset fields
       document.getElementById('groupName').value = '';
       document.getElementById('groupDescription').value = '';
       document.querySelectorAll('#employeeList input[type="checkbox"]').forEach(item => item.checked = false);
       selectedNames.innerText = 'Selected: None';


        // Create new group element 
           const groupElement = document.createElement('div');
           groupElement.style.padding = '10px';
           groupElement.style.marginBottom = '10px';
           groupElement.style.border = '1px solid #ccc';
           groupElement.style.borderRadius = '5px';
           groupElement.style.background = '#f8f9fa';
           groupElement.style.color = 'black';
           groupElement.innerHTML = `
               <strong class="group-name">${groupName}</strong>
               <p>${groupDescription || 'No description provided'}</p>
           `;

           // Add event listener for opening group modal when the group name is clicked
           groupElement.addEventListener('click', () => {
               openGroupModal(groupName);
           });

           // Append to chat modal
           chatGroups.appendChild(groupElement);
});

// Update selected members
employeeList.addEventListener('change', () => {
        selected = Array.from(document.querySelectorAll('#employeeList input[type="checkbox"]:checked'))
           .map(el => el.name);
       selectedNames.innerText = `Selected: ${selected.join(' , ') || 'None'}`;
});

// Create Group DB Store
function createGroup(selected,groupName,groupDescription)
{
   const data = {
         UserName :selected,
         GroupName : groupName,
         Description : groupDescription
   }

   console.log(data)
    return fetch("https://localhost:7035/api/Admin/Save_the_GroupDetails", {
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

//RetriveExistingGroupName from DB
async function RetriveExistingGroupName(){

    try {
        const response = await fetch(`https://localhost:7035/api/Admin/GetExistingGroupName`);
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
         displayGroupname(data);

        
    } catch (error) {
        alert(error);
    }
  
}

//displayGroupname in Mychat
function displayGroupname(data) {
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
}



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




document.addEventListener('DOMContentLoaded', () => {
    // Setup SignalR connection
    chatConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7035/hubs/Chat")
        .withAutomaticReconnect() // Automatically reconnect on disconnection
        .build();

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
    chatConnection.start()
        .then(() => console.log("Chat Connection Started Successfully"))
        .catch(err => console.error("Chat Connection Failed", err));
});

// Open the new group chat modal
function openGroupModal(groupName) {
    console.log(groupName + " group opened")
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
                console.log( groupName + " Opened")
            })
            .catch(err => console.error("Chat Connection Failed", err));
    } else {
        chatConnection.invoke("JoinGroup", groupName).catch(err => console.error("Error joining group:", err));
        GroupStatus = groupName;
        console.log( groupName + " Opened")
    }

    // Send Message Handler
    sendMessage.removeEventListener('click', sendMessageHandler); // Remove any existing handler
    sendMessage.addEventListener('click', sendMessageHandler);

    // Define the handler function
    function sendMessageHandler() {
        time = displayCurrentTime();
        const currentDate = new Date();
        ResDate = currentDate.toLocaleDateString();
        resmessage = chatInput.value.trim();

        if (resmessage) {
            chatConnection.invoke("Send", groupName, RetriveUserNameForChatMessages, resmessage, time).catch(err => console.error(err));
            chatMessageSave(groupName);
            chatInput.value = '';
        }
    }

    // Listen for new messages from the server
    chatConnection.on("addNewMessageToPage", (name, message, time, groupName) => {
        // Create a new list item for the message
        const newMessage = document.createElement('li');
        newMessage.classList.add('chat-message');

        newMessage.innerHTML = `
            <div class="chat-bubble">
                <span class="chat-name">${name}</span>
                <span class="chat-time">[${time}]</span>    
                <p class="chat-text">${message}</p>
            </div>
        `;

        // Append the new message to the chat container
        chatMessages.appendChild(newMessage);

        chatInput.value = '';
    });
}

// Close the new group chat modal
closeGroupModal.addEventListener('click', () => {
    if (GroupStatus) {
        chatConnection.invoke("LeaveGroup", GroupStatus).catch(err => console.error("Error leaving group:", err));
        console.log(GroupStatus + " Connection is closed")
        GroupStatus = null;
        console.log(GroupStatus)
    }
    newGroupModal.style.display = 'none';
    chatModal.style.display = 'flex'; // Open the "My Chat" modal again
    chatMessages.innerHTML = "";
});











    // //Save the ChatMessage
    function chatMessageSave(GroupName) {
        const localDate = new Date(ResDate);
        ResDate = localDate.toLocaleDateString('en-CA');
        const data = {
            GroupName: GroupName,
            UserName: RetriveUserNameForChatMessages,
            Email: EmailFromURL,
            Message: resmessage,
            Date: ResDate,
            Time: time
        };

        // console.log(data); // Debugging purpose
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
            GroupName:groupName
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
            //console.log(message)
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
        //console.log(chatMessage)

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