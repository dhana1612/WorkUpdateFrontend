const statusmessage = "Request is Pending"
var EmailFromURL;

//This will call 1st when the page loads
window.onload = function () {
    myFunction();
};

function myFunction() {
    const params1 = new URLSearchParams(window.location.search); 
    EmailFromURL = params1.get('value'); 
    displayAllData()
    displayAllUserName()
    RetriveExistingGroupName()
    RetriveUserNameForChatMessage(EmailFromURL) 
}




//Workstatus button

//When I click the Workupdate button it will display the Table
    document.getElementById('toggleTableButton').onclick = function() {
        var table = document.getElementById('dataTable');
        if (table.style.display === 'none') {
            table.style.display = 'block'; // Show the table
        } else {
            table.style.display = 'none'; // Hide the table
        }
    };

//Retrive all Data from Database 
    async function displayAllData() {
        try {
            const response = await fetch(`https://workupdate.onrender.com/api/Admin`);
            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Network response was not ok");
            }

            const data = await response.json();

            if (Array.isArray(data)) {
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
        const tableBody = document.getElementById("dataTable").querySelector("tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        let serial_number = 1;

        for (let item of data) 
        {
            const unqiuevalue = item.id;
            const emailres = item.email;
            const workstatusres = item.workUpdates;
            const taskLinksres = item.taskLinks;
            const dateres = item.date;
            var feedbackmessage= item.feedbackmessage;
            var responsemessage =item.statusmessage;
            


    //serial Number
            const row = document.createElement("tr");
            var idCell = document.createElement("td");
            idCell.textContent = serial_number;
            serial_number = serial_number + 1;
            row.appendChild(idCell);

    // Create username column
            const name = document.createElement("td");
            const email_Id = item.email;
            const username = await RetriveUserNAme(email_Id); 
            name.textContent = username;
            row.appendChild(name);

    // Create date column
            const date = document.createElement("td");
            date.textContent = item.date;
            row.appendChild(date);

    // Create work updates column
            const workUpdates = document.createElement("td");
            workUpdates.textContent = item.workUpdates;
            row.appendChild(workUpdates);

    // Create task links column
            const taskLinks = document.createElement("td");
            const link = document.createElement("a");
            link.href = item.taskLinks; 
            link.textContent = item.taskLinks; 
            link.target = "_blank"; 
            taskLinks.appendChild(link);
            row.appendChild(taskLinks); 


    //workstatus dropdown
            const status = document.createElement("td");
            const statusDropdown = document.createElement("select");
            statusDropdown.classList.add("form-select", "form-select-sm");
            statusDropdown.style.border = "none";
            
            // Define the options for the dropdown
            const options = [
                { value: "Pending", text: "Pending", class: "btn-warning" },
                { value: "Success", text: "Success", class: "btn-success" },
                { value: "Rejected", text: "Rejected", class: "btn-danger" },
            ];
            
            // Populate the dropdown with options
            options.forEach(optionData => {
                const option = document.createElement("option");
                option.value = optionData.value;
                option.textContent = optionData.text;
                option.classList.add(optionData.class);
                if (optionData.value === responsemessage) {
                    option.selected = true; 
                }
                statusDropdown.appendChild(option);
            });
            
            // statusDropdown.className = "form-select form-select-sm " + options.find(o => o.value === "Pending").class;
            const feedbackBox = document.createElement("div");
            feedbackBox.classList.add("feedback-box", "bg-light", "p-3", "rounded", "shadow-lg");
            feedbackBox.style.position = "absolute";
            feedbackBox.style.visibility = "hidden";
            feedbackBox.style.zIndex = "950"; 
            feedbackBox.style.width = "150px"; 
            feedbackBox.style.maxWidth = "50%"; 
            
            // Add a heading for the feedback box
            const feedbackTitle = document.createElement("h6");
            feedbackTitle.textContent = "Feedback";
            feedbackBox.appendChild(feedbackTitle);
            
            // Add an input for feedback inside the box
            const feedbackInput = document.createElement("textarea");
            feedbackInput.placeholder = "Write your feedback here...";
            feedbackInput.classList.add("form-control", "mb-2");
            feedbackInput.style.height = "100px"; 
            feedbackBox.appendChild(feedbackInput);
            
            // Create the "OK" button to close the box
            const okButton = document.createElement("button");
            okButton.textContent = "OK";
            okButton.classList.add("btn", "btn-primary", "btn-sm");
            feedbackBox.appendChild(okButton);
            
        
            const showFeedbackBox = () => {
                const rect = statusDropdown.getBoundingClientRect();
                feedbackBox.style.left = `${rect.right + 10}px`; 
                feedbackBox.style.top = `${rect.top}px`;
                feedbackBox.style.visibility = "visible"; 
            };
            
            const hideFeedbackBox = () => {
                feedbackBox.style.visibility = "hidden"; 
            };
            
            //feedback textarea selected 
            okButton.addEventListener("click", () => {
                const feedback = feedbackInput.value; 
                feedbackmessage = "Rejected : "  + feedback;
                updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                hideFeedbackBox(); 
            });
            
            //dropdown box change
            statusDropdown.addEventListener("change", () => {
                //statusDropdown.classList.remove("btn-warning", "btn-success", "btn-danger");
                responsemessage =statusDropdown.value;
                const selectedOption = options.find(o => o.value === statusDropdown.value);
                statusDropdown.classList.add(selectedOption.class);
            
                
                if (statusDropdown.value === "Rejected") 
                {
                    document.body.appendChild(feedbackBox);  
                    showFeedbackBox();  
                } else if(statusDropdown.value === "Success"){
                    document.body.appendChild(feedbackBox);
                    showFeedbackBox();
                    updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                }
                else {
                    hideFeedbackBox();  
                }

                // if(statusDropdown.value === "Success"){
                //     feedbackmessage = "Approved";
                //     updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                //     statusDropdown.classList("btn-success");
                // }
                // else 
                if(statusDropdown.value === "Pending"){
                    feedbackmessage = "Request is Pending";
                    updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                    statusDropdown.classList("btn-warning");
                }
            
            });
        

            // Append the dropdown to the status cell
            status.appendChild(statusDropdown);
            
            // Append the status cell to the row
            row.appendChild(status);
            
            // Append the row to the table body
            tableBody.appendChild(row);
            
        }
    }

// Retrieve the UserName through Email
    async function RetriveUserNAme(Email_through_populate_function) {
        const data = { Email: Email_through_populate_function };
        
        try {
            const response = await fetch("https://workupdate.onrender.com/api/Admin/RetriveUserName", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const message = await response.text();
            return message; 

        } catch (error) {
            return ""; 
        }
    }

//Updated the ResponseMessage
    function updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres) {        

        const data = {
            Id:unqiuevalue,
            Email:emailres,
            date:dateres,
            WorkUpdates:workstatusres,
            TaskLinks:taskLinksres,
            statusmessage:responsemessage,
            feedbackmessage: feedbackmessage 
        };
        console.log(data);

        fetch("https://workupdate.onrender.com/api/Admin/updateResponseMessage", {
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
        })
        
        .catch(error => {
        
        });


    }

//WorkStatus button Logic End





//DropDown Logic

// Retrieve the Data from Database through Email
    async function displayAllUserName() {
        try {
            const response = await fetch(`https://workupdate.onrender.com/api/Admin/ListOfUserNames`);
            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Network response was not ok");
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                console.log(data)

                if(data!=null){
                    ListUserName(data); 
                    console.log(data)
                    retriveAllUserName_through_ListofEmail(data);
                }
                
            } else {
                alert("Unexpected data format");
            }
        } catch (error) {
            alert(error);
        }
    }

//display the username return by displayAllUserName function in dropdown
    async function ListUserName(data) {
        const listbody = document.getElementById("EmployeeName");
        listbody.className = "dropdown-menu";
    
        for (let item of data) {
            const listelement = document.createElement("li");
            listelement.textContent = item.userName;
            listelement.style.cursor = 'pointer';

            listelement.onclick = function() {
                handleListItemClick(item.email,item.userName); 
            };

            listbody.appendChild(listelement);
        }
    }

//when i click the particular UserName in the dropdown this function will execute
    async function handleListItemClick(itemValue_Email,itemValue_Name) {
        console.log(itemValue_Email)
        document.getElementById("user1").innerHTML = itemValue_Name;user1
        var table = document.getElementById('dataTable1');
        if (table.style.display === 'none') {
            table.style.display = 'block'; // Show the table
        }
        // var email_throught_name = await RetriveEmailthroughUserName(itemValue_Name);
        displayAllDatabasedEmail(itemValue_Email);


    }

//Retrive the Data from Database through Email
    function displayAllDatabasedEmail(email_throught_name) {
        fetch(`https://workupdate.onrender.com/api/WorkUpdate/${encodeURIComponent(email_throught_name)}`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage || "Network response was not ok");
                    });
                }
                return response.json(); 
            })
            .then(data => { 
                console.log(data);
                if (Array.isArray(data)) {
                    populateTablebasedEmail(data); 
                } else {
                    alert("Unexpected data format");
                }
            })
            .catch(error => {
                document.getElementById("dataTable").style.display = "none";
            });
    }  

// PopulateTable() Function store the retrive datas in Table Format 
    async function populateTablebasedEmail(data) {
        const tableBody = document.getElementById("dataTable1").querySelector("tbody");
        tableBody.innerHTML = ""; // Clear existing rows

        let serial_number = 1;

        for (let item of data) 
        {
            
            console.log(item)
            const unqiuevalue = item.id;
            const emailres = item.email;
            const workstatusres = item.workUpdates;
            const taskLinksres = item.taskLinks;
            const dateres = item.date;
            var feedbackmessage= item.feedbackmessage;
            var responsemessage =item.statusmessage;


    //serial Number
            const row = document.createElement("tr");
            var idCell = document.createElement("td");
            idCell.textContent = serial_number;
            serial_number = serial_number + 1;
            row.appendChild(idCell);


    // Create date column
            const date = document.createElement("td");
            date.textContent = item.date;
            row.appendChild(date);

    // Create work updates column
            const workUpdates = document.createElement("td");
            workUpdates.textContent = item.workUpdates;
            row.appendChild(workUpdates);

    // Create task links column
            const taskLinks = document.createElement("td");
            const link = document.createElement("a");
            link.href = item.taskLinks; 
            link.textContent = item.taskLinks; 
            link.target = "_blank"; 
            taskLinks.appendChild(link);
            row.appendChild(taskLinks); 


    //workstatus dropdown
            const status = document.createElement("td");
            const statusDropdown = document.createElement("select");
            statusDropdown.classList.add("form-select", "form-select-sm");
            statusDropdown.style.border = "none";
            
            // Define the options for the dropdown
            const options = [
                { value: "Pending", text: "Pending", class: "btn-warning" },
                { value: "Success", text: "Success", class: "btn-success" },
                { value: "Rejected", text: "Rejected", class: "btn-danger" },
            ];
            
            // Populate the dropdown with options
            options.forEach(optionData => {
                const option = document.createElement("option");
                option.value = optionData.value;
                option.textContent = optionData.text;
                option.classList.add(optionData.class);
                if (optionData.value === responsemessage) {
                    option.selected = true; 
                }
                statusDropdown.appendChild(option);
            });
            
            // statusDropdown.className = "form-select form-select-sm " + options.find(o => o.value === "Pending").class;
            const feedbackBox = document.createElement("div");
            feedbackBox.classList.add("feedback-box", "bg-light", "p-3", "rounded", "shadow-lg");
            feedbackBox.style.position = "absolute";
            feedbackBox.style.visibility = "hidden";
            feedbackBox.style.zIndex = "950"; 
            feedbackBox.style.width = "150px"; 
            feedbackBox.style.maxWidth = "50%"; 
            
            // Add a heading for the feedback box
            const feedbackTitle = document.createElement("h6");
            feedbackTitle.textContent = "Feedback";
            feedbackBox.appendChild(feedbackTitle);
            
            // Add an input for feedback inside the box
            const feedbackInput = document.createElement("textarea");
            feedbackInput.placeholder = "Write your feedback here...";
            feedbackInput.classList.add("form-control", "mb-2");
            feedbackInput.style.height = "100px"; 
            feedbackBox.appendChild(feedbackInput);
            
            // Create the "OK" button to close the box
            const okButton = document.createElement("button");
            okButton.textContent = "OK";
            okButton.classList.add("btn", "btn-primary", "btn-sm");
            feedbackBox.appendChild(okButton);
            
        
            const showFeedbackBox = () => {
                const rect = statusDropdown.getBoundingClientRect();
                feedbackBox.style.left = `${rect.right + 10}px`; 
                feedbackBox.style.top = `${rect.top}px`;
                feedbackBox.style.visibility = "visible"; 
            };
            
            const hideFeedbackBox = () => {
                feedbackBox.style.visibility = "hidden"; 
            };
            
            // var responsemessage ="";
            // var feedbackmessage = "";

            //feedback textarea selected 
            okButton.addEventListener("click", () => {
                const feedback = feedbackInput.value; 
                feedbackmessage = feedback;
                console.log(responsemessage);
                console.log(feedbackmessage);
                updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                
                hideFeedbackBox(); 
            });
            
            //dropdown box change
            statusDropdown.addEventListener("change", () => {
                statusDropdown.classList.remove("btn-warning", "btn-success", "btn-danger");
                responsemessage =statusDropdown.value;
                const selectedOption = options.find(o => o.value === statusDropdown.value);
                statusDropdown.classList.add(selectedOption.class);
            
                
                if (statusDropdown.value === "Rejected") 
                {
                    document.body.appendChild(feedbackBox);  
                    showFeedbackBox();  
                } else {
                    hideFeedbackBox();  
                }

                if(statusDropdown.value === "Success"){
                    feedbackmessage = "Approved";
                    updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                }
                else if(statusDropdown.value === "Pending"){
                    console.log(responsemessage);
                    console.log(feedbackmessage);
                    feedbackmessage = "Request is Pending";
                    updateResponseMessage(responsemessage,feedbackmessage, unqiuevalue,emailres,workstatusres,taskLinksres,dateres);
                }
            
            });
        

            // Append the dropdown to the status cell
            status.appendChild(statusDropdown);
            
            // Append the status cell to the row
            row.appendChild(status);
            
            // Append the row to the table body
            tableBody.appendChild(row);
            
        }
    }

//Display All User Through list of Email
    function retriveAllUserName_through_ListofEmail(data){

        console.log(data)
        const employeeList = document.getElementById('employeeList');

        for (let item of data) {
            // Create a new div for each username
            const userDiv = document.createElement('div');

            // Create the checkbox input element
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.userName.replace(/\s+/g, ''); // Remove spaces for a valid ID
            checkbox.name = item.userName ;

            // Create the label element
            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.textContent = item.userName;

            label.style.marginLeft = '8px'; // You can adjust this value as needed

            // Append the checkbox and label to the div
            userDiv.appendChild(checkbox);
            userDiv.appendChild(label);

            // Append the div to the employeeList container
            employeeList.appendChild(userDiv);

        }
        
    }
//DropDown Logic End






//Chat Community start
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
//Group DashBoard
const groupFrame1 = document.getElementById('groupFrame1');
const GroupDashboard = document.getElementById('GroupDashboard');
const closeGroupDashBoard = document.getElementById('closeGroupDashBoard');
const cancelGroupDashBoard = document.getElementById('cancelGroupDashBoard');



/*----------Chat Model Icon start--------------*/

// Open My Chat Modal
    chatButton.addEventListener('click', () => {
        chatModal.style.display = 'flex';
    });

// Close My Chat Modal
    closeModal.addEventListener('click', () => {
        chatModal.style.display = 'none';
    });

//RetriveExistingGroupName from DB
    async function RetriveExistingGroupName(){

        try {
            const response = await fetch(`https://workupdate.onrender.com/api/Admin/GetExistingGroupName`);
            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            displayGroupname(data);

            
        } catch (error) {
           
        }
    
    }

//Display the newly created group in the chat Model
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

/*----------Chat Model Icon End-------------*/





/*-----------New Group Open Icon Start---------------*/
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

// When I click the Create New Group Icon this Function Will Execute
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
        fetch("https://workupdate.onrender.com/api/Admin/Save_the_GroupDetails", {
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
            
            });
    }
/*------------New Group Open Icon End------------------*/






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
let sendMessageHandler;
let isSendMessageAttached = false; // Flag to prevent multiple event listener attachments
//Add New Member
const employeeList1 = document.getElementById('employeeList1');
const selectedNames1 = document.getElementById('selectedNames1');
var selected1;
//Remove Member
const employeeList2 = document.getElementById('employeeList2');
const selectedNames2 = document.getElementById('selectedNames2');
var selected2;





/*-----------Logic for Chat Message Feild start   <<<<<<<<<   signalR     >>>>>>>>>-------------*/

    // This function is responsilble for sending messages to the server
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

    //SignalR connection start
        document.addEventListener('DOMContentLoaded', () => {

            // Setup SignalR connection
            chatConnection = new signalR.HubConnectionBuilder().withUrl("https://workupdate.onrender.com/hubs/Chat").withAutomaticReconnect().build();

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

/*-----------Logic for chat Message feild end      <<<<<<<<<   signalR     >>>>>>>>>------------*/







/*-----------Group DashBoard start-------------*/

// {Open the modal}
groupFrame1.addEventListener('click', () => {
    newGroupModal.style.display = 'none';
    GroupDashboard.style.display = 'flex';
    groupDashboard();
});

// Close Group Modal
closeGroupDashBoard.addEventListener('click', () => {
    GroupDashboard.style.display = 'none';
    newGroupModal.style.display = 'flex';
    employeeList1.innerHTML = '';
    employeeList2.innerHTML = '';
    selectedNames2.innerHTML = 'Selected: None';
    selectedNames1.innerHTML = 'Selected: None';
    

});

// Display the GroupName in the GroupDashboard  
function groupDashboard() {
    const Name = document.getElementById("GroupName")?.textContent || "Default Group Name";
    document.getElementById("GroupDashboardName").innerHTML = Name;
    console.log(Name)
    Display_NewMember_Not_In_A_Group(Name);
    Display_ExistingMember_In_A_Group(Name)


    const member = document.getElementById("Members");
    const member1 = document.getElementById("Members1");
    member.style.display = 'none';
    member1.style.display = 'none';


    const addnewmember = document.getElementById("AddNewMembers");
    addnewmember.addEventListener('click', () => {
        member1.style.display = 'none';
        member.style.display = 'flex'; 
    });


    const RemoveMember = document.getElementById("RemoveMembers");
    RemoveMember.addEventListener('click', () => {
        member.style.display = 'none';
        member1.style.display = 'flex'; 
    });
}




/*-----------Add New Members in Existing Group -----------*/

    //it should display the list of employees who are not in the group
    function Display_NewMember_Not_In_A_Group(groupName) {
        
        const url = `https://workupdate.onrender.com/api/GroupChat/ExistingGroupUserName?groupName=${encodeURIComponent(groupName)}`;
        
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
            
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage || "Network response was not ok");
                });
            }
            return response.json(); 
        })
        .then(usernames => {
            console.log("Usernames not in the group:", usernames);

            retriveAllUserName_through_ListofEmail1(usernames);
        
        })
        .catch(error => {
            alert("Failed to fetch data: " + error.message); 
        });
    }
    //Display the retrive member in check box
    function retriveAllUserName_through_ListofEmail1(data){

        console.log(data)
        const employeeList1 = document.getElementById('employeeList1');

        for (let item of data) {
            // Create a new div for each username
            const userDiv = document.createElement('div');

            // Create the checkbox input element
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.replace(/\s+/g, ''); // Remove spaces for a valid ID
            checkbox.name = item ;

            // Create the label element
            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.textContent = item;

            label.style.marginLeft = '8px'; // You can adjust this value as needed

            // Append the checkbox and label to the div
            userDiv.appendChild(checkbox);
            userDiv.appendChild(label);

            // Append the div to the employeeList container
            employeeList1.appendChild(userDiv);

        }
        
    }
    //When I click the Add New Member button
    function AddNewMember(){
        selectedNames1.innerHTML = 'Selected: None';
        employeeList2.innerHTML = '';
        
        const Name = document.getElementById("GroupName")?.textContent || "Default Group Name";
        console.log(Name)
        console.log(selected1)

        Add_NewMember_In_ExistingGroup(selected1,Name)
        GroupDashboard.style.display = 'none';
        newGroupModal.style.display = 'flex';
        employeeList1.innerHTML = '';
    }
    // Update selected members
    employeeList1.addEventListener('change', () => {
        selected1 = Array.from(document.querySelectorAll('#employeeList1 input[type="checkbox"]:checked'))
        .map(el => el.name);
        selectedNames1.innerText = `Selected: ${selected1.join(' , ') || 'None'}`;
    });
    //Add New Members in Existing Group End
    function Add_NewMember_In_ExistingGroup(selected,groupName)
    {
        var Description = "dfjbdf";
        const data = {
            UserName :selected,
            GroupName : groupName,
            Description :Description  

            }

        console.log(data)

        if (typeof selected1 === 'undefined'){
            alert("Please select at least one employee to add to the group");
        }

        else if(selected1.length != 0)
        {
            fetch("https://workupdate.onrender.com/api/Admin/Add_NewMember_In_ExistingGroup", {
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
                alert(message)
                selected1 = [];
            })
                
                .catch(error => {
                
                });
        }
        
            
    }

/*-----------Add New Members in Existing Group -----------*/






/*----------- Remove Members in Existing Group -----------*/
 
    //it should display the list of employees who are already
    function Display_ExistingMember_In_A_Group(groupName) {
        
        const url = `https://workupdate.onrender.com/api/GroupChat/Display_ExistingMember_In_A_Group?groupName=${encodeURIComponent(groupName)}`;
        
        fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
            
                return response.text().then(errorMessage => {
                    throw new Error(errorMessage || "Network response was not ok");
                });
            }
            return response.json(); 
        })
        .then(usernames => {
            console.log("Existing Usernames in the group:", usernames);

            retriveAllUserName_through_ListofEmail2(usernames);
        
        })
        .catch(error => {
            alert("Failed to fetch data: " + error.message); 
        });
    }
    //Display the retrive member in check box
    function retriveAllUserName_through_ListofEmail2(data){

        console.log(data)
        const employeeList2 = document.getElementById('employeeList2');

        for (let item of data) {
            // Create a new div for each username
            const userDiv = document.createElement('div');

            // Create the checkbox input element
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.replace(/\s+/g, ''); // Remove spaces for a valid ID
            checkbox.name = item ;

            // Create the label element
            const label = document.createElement('label');
            label.setAttribute('for', checkbox.id);
            label.textContent = item;

            label.style.marginLeft = '8px'; // You can adjust this value as needed

            // Append the checkbox and label to the div
            userDiv.appendChild(checkbox);
            userDiv.appendChild(label);

            // Append the div to the employeeList container
            employeeList2.appendChild(userDiv);

        }
        
    }
    //When I click the Remove Member button
    function RemoveMember(){
        selectedNames2.innerHTML = 'Selected: None';
        employeeList1.innerHTML = '';
        const Name = document.getElementById("GroupName")?.textContent || "Default Group Name";
        console.log(Name)
        console.log(selected2)

        Remove_ExistingMember_in_the_Group(selected2,Name)
        GroupDashboard.style.display = 'none';
        newGroupModal.style.display = 'flex';
        employeeList2.innerHTML = '';
    }
    // Update selected members
    employeeList2.addEventListener('change', () => {
        selected2 = Array.from(document.querySelectorAll('#employeeList2 input[type="checkbox"]:checked'))
        .map(el => el.name);
        selectedNames2.innerText = `Selected: ${selected2.join(' , ') || 'None'}`;
    });
    //Remove Existing Members in the Group
    function Remove_ExistingMember_in_the_Group(selected,groupName)
    {
        var Description = "dfjbdf";
        const data = {
            UserName :selected,
            GroupName : groupName,
            Description :Description  

            }

        console.log(data)

        if (typeof selected2 === 'undefined'){
            alert("Please select at least one employee to Remove to the group");
        }

        else if(selected2.length != 0)
        {
            fetch("https://workupdate.onrender.com/api/Admin/Remove_ExistingMember_in_the_Group", {
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
                alert(message)
                selected2 = [];
            })
                
                .catch(error => {
                
                });
        }
        
            
    }

/*----------- Remove Members in Existing Group -----------*/

/*-----------Group DashBoard End-------------*/





    //Save the ChatMessage
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
        fetch("https://workupdate.onrender.com/api/GroupChat/GroupChat", {
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
        fetch("https://workupdate.onrender.com/api/GroupChat/RetriveChatMessage", {
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
            // window.globalChatMessages[groupName] = message;

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

    // Retrieve the Username using Email
    function RetriveUserNameForChatMessage(Email) {
        const data = {
            Email: Email
        };
        fetch("https://workupdate.onrender.com/api/GroupChat/RetriveUserName", {
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

    //Display Time
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
