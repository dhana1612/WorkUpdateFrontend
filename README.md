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

<h3>Key Features:</h3>

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
    <li>Success</li>
     <li>Pending (default)</li>
     <li>Failed</li>
  </ul>
  <li>If the status is marked as Failed, the admin can provide feedback explaining the reason.</li>
  <li>Once validated, the status and feedback are visible to the respective user.</li>
</ul>

<hr>

<h3>3. User Dashboard</h3>

The User Dashboard is designed to allow users to manage their daily updates and interact with their community.

<h3>Key Features:</h3>

<h4>1. Daily Work Update Module</h4>
<ul>
  <ol>Users can submit their daily work status.</ol>
   <ol>Updates are immediately reflected on the Admin Dashboard for review.</ol>
</ul>

<h4>2. User Profile</h4>

Users can view and update their profile information.

<h4>3. Group Chat Community</h4>

Users can engage in dynamic group chats using SignalR technology.

Facilitates real-time communication within groups.

<h4>4. Work Status Feedback</h4>

Users can view feedback and status updates from the admin.

<hr>

<h2>Technologies Used</h2>

<h3>Backend:</h3>

<ul>
  <li>ASP.NET Core Web API</li>
  <li>C#</li>
  <li>SignalR for dynamic, real-time chat functionality</li>
  <li>LINQ for database queries</li>
</ul>


<h3>Frontend:</h3>

<h5>HTML5, CSS3, JavaScript, Bootstrap 5 </h5>



