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

<h4>Screenshots:</h4>
<h5>Login Portal</h5>

![image](https://github.com/user-attachments/assets/1c93d8b3-40a2-4abb-a3a4-27403da4f2d1)

<h5>User Dashboard</h5>
 
![image](https://github.com/user-attachments/assets/03ac0ff0-92ef-4ad9-a454-78ad3afe6511)

<h5>1. Work Status Update Model</h5>

![image](https://github.com/user-attachments/assets/44654b47-8b25-4969-8c12-f5fdd83f2cf6)

<h5>2. Work Status Edit Model</h5>

![image](https://github.com/user-attachments/assets/f2d6ff2d-efd0-425d-b11c-ca18a7e17fa8)

<h5>User Details Dashboard</h5>

![image](https://github.com/user-attachments/assets/3f1555fa-b257-4334-91ab-a3577d65da87)

<h5>Group Community</h5>

![image](https://github.com/user-attachments/assets/f4d59480-fd4c-4a89-85f2-ec5cda973cf4)

<h5>Chat Page</h5>

![image](https://github.com/user-attachments/assets/83f91496-3707-42b4-8ba1-1d6484f38802)

<h5>Admin Dashboard</h5>

![image](https://github.com/user-attachments/assets/dcbb3211-7d40-49d2-9d6b-8d5c64972446)

<h5>User Work Update Details</h5>

![image](https://github.com/user-attachments/assets/a46e37c3-2057-4afd-ac59-f70dc95474f7)

<h5>User WorkStatus validate</h5>

![image](https://github.com/user-attachments/assets/0969edee-8e99-4730-b264-6505de26e0c9)

<h5>Create New Group Community</h5>

![image](https://github.com/user-attachments/assets/c5adef6a-e6c1-40e4-8e6b-cec9f8af652b)

<h5>Chat Page</h5>

![image](https://github.com/user-attachments/assets/ed960367-424e-4b93-a7df-2240bf7efbce)

<h5>Group Dashboard</h5>

![image](https://github.com/user-attachments/assets/7e2dd515-f602-4139-9c1a-1d52ea69ed07)

<h5>Add New Member</h5>

![image](https://github.com/user-attachments/assets/2f7e5d12-fe41-44d3-ae7a-4a5ecaee346b)

<h5>Remove existing Member</h5>

![image](https://github.com/user-attachments/assets/f9d4d195-7756-4f45-9a89-8d12f0149f3f)

<h5>Create New User</h5>

![image](https://github.com/user-attachments/assets/6bc8ff20-5a7e-4561-9bd6-60527730db8f)

<h5>Forget Password</h5>

![image](https://github.com/user-attachments/assets/e20f3ddb-63ff-4841-b51c-07b9b5eef7a9)

<h5>Email Verfication</h5>

![image](https://github.com/user-attachments/assets/244ade04-965d-4784-8ed6-8d1c3393847f)

<h5>Update New Password</h5>

![image](https://github.com/user-attachments/assets/b9578e71-9a8e-4f3a-b4c0-1d79195f56e0)

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




### Backend Code Link
[WorkUpdateBackend GitHub Repository](https://github.com/dhana1612/WorkUpdateBackend.git)

