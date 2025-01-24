import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create a new user
  const createUser = async () => {
    try {
      const response = await fetch("https://gestion-parascolaire.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData);

      if (!response.ok) throw new Error("Failed to create user");
      const data = await response.json();
      alert(`User created: ${data.name}`);
      setFormData({ name: "", email: "", password: "" }); // Reset form
    } catch (error) {
      alert(error.message);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://gestion-parascolaire.onrender.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-700 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      
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

export default UserManagement;
