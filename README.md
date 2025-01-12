<h1 style = text-align:center >Daily Work Status Update with Group Chat --- Frontend</h1>

<h3>Overview</h3>

This project is a web-based application designed to streamline daily work status updates and facilitate group communication. It features two distinct dashboards: <b>User Dashboard</b> and <b>Admin Dashboard</b>, each tailored to meet the specific needs of users and administrators.

<hr>


<h4>Features</h4>

<h3>1. User Login</h3>

<ul>
<li>Users log in using their email and password.</li>

<li>A password recovery feature is available for users who forget their credentials.</li>
</ul>

<hr>

<h3>2. Admin Dashboard</h3>

The Admin Dashboard is designed to manage users, groups, and validate work status updates.

<h4>Key Features:</h4>

<h4>1. User Management</h4>

<ul>
  <li>Admin can create new users.</li>
  <li>Automatically sends login credentials to the user's email upon creation.</li>
  <li>Users can log in using the credentials provided.</li>
</ul>

<h4>2. Group Community Management</h4>
<ul>
  <li>Admin can create group communities.</li>
  <li>Admin can add newly created users to selected groups.</li>
</ul>

<h4>3. Work Status Validation</h4>
<ul>
  <li>Admin validates the user’s daily work status using the following categories:</li>
  <ul>
    <li><b>Success</b></li>
     <li><b>Pending</b> (default)</li>
     <li><b>Failed</b></li>
  </ul>
  <li>If the status is marked as <b>Failed</b>, the admin can provide feedback explaining the reason.</li>
  <li>Once validated, the status and feedback are visible to the respective user.</li>
</ul>

<hr>

<h3>3. User Dashboard</h3>

The User Dashboard is designed to allow users to manage their daily updates and interact with their community.

<h3>Key Features:</h3>

<h4>1. Daily Work Update Module</h4>
<ul>
  <li>Users can submit their daily work status.</li>
   <li>Updates are immediately reflected on the Admin Dashboard for review.</li>
</ul>

<h4>2. User Profile</h4>
<ul>
  <li>Users can view and update their profile information.</li>
</ul>

<h4>3. Group Chat Community</h4>
<ul>
  <li>Users can engage in dynamic group chats using SignalR technology.</li>
  <li>Facilitates real-time communication within groups.</li>
</ul>

<h4>4. Work Status Feedback</h4>

<ul>
  <li>Users can view feedback and status updates from the admin.</li>
</ul>

<hr>

<h2>Technologies Used</h2>

<h3>Backend:</h3>

<ul>
  <li><b>ASP.NET Core Web API</b></li>
  <li><b>C#</b></li>
  <li><b>SignalR</b> for dynamic, real-time chat functionality</li>
  <li><b>LINQ</b> for database queries</li>
</ul>


<h3>Frontend:</h3>

<h5><b>HTML5, CSS3, JavaScript, Bootstrap 5</b></h5>

<hr>

<h3>How to Run the Project</h3>

<ul>
  <li>Clone the repository from GitHub.</li>
  <li>Set up the backend by running the ASP.NET Core Web API project.</li>
  <li>Configure the database connection.</li>
  <li>Launch the frontend using any compatible web server.</li>
  <li>Access the application via a web browser.</li>
</ul>

<h4>Screenshots:</h4>
![image](https://github.com/user-attachments/assets/8639ac11-0da5-42d9-901a-45f6c7e9b0af)



### Backend Code Link
[WorkUpdateBackend GitHub Repository](https://github.com/dhana1612/WorkUpdateBackend.git)

