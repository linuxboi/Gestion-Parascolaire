import React, { useState } from "react";
import axios from "axios";

const UserManagementWithAxios = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create a new user using Axios
  const createUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users", formData);
      alert(`User created: ${response.data.name}`);
      setFormData({ name: "", email: "", password: "" }); // Reset form
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.response ? error.response.data.error : error.message);
    }
  };

  // Fetch all users using Axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">User Management with Axios</h1>
      
      {/* User Creation Form */}
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 mb-4 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 mb-4 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 mb-4 rounded-md"
        />
        <button
          onClick={createUser}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </div>

      {/* Fetch Users */}
      <div className="bg-white p-6 shadow-md rounded-md w-full max-w-md mt-8">
        <h2 className="text-xl font-bold mb-4">Users List</h2>
        <button
          onClick={fetchUsers}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4"
        >
          Fetch Users
        </button>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="border-b border-gray-300 py-2">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagementWithAxios;
