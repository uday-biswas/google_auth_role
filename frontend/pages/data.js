import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
//data.js
export default function RoleChooser() {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const detailsString = searchParams.get('details');
    const info = JSON.parse(decodeURIComponent(detailsString));
    setDetails(info);
    console.log("details", details)
    console.log("info", info)
  }, []);
  
  useEffect(() => {
    if (details && details.role !== "new") {
      localStorage.setItem("details", JSON.stringify(details));
      router.push(`/${details.role}`);
      console.log("details.role", details.role);
    }
  }, [details]);

  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");

  const handleRoleSelection = async () => {
    try {
      // Make an API call to update the user's role in the backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${details.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });
      const data = await response.json();
      localStorage.setItem("details", JSON.stringify(data.user));
      console.log("Role updated successfully:", data.user);

      // Handle success (e.g., show a success message)
      // Redirect to the home page
      router.push(`/${data.user.role}`);
    } catch (e) {
      setError(e.message);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="w-[70%] min-w-52 mx-auto p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-2">Choose a role:</h3>
    <select
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="">Select a role</option>
      <option value="superadmin">Superadmin</option>
      <option value="admin">Admin</option>
      <option value="client">Client</option>
      <option value="user">User</option>
    </select>
    <button
      onClick={handleRoleSelection}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      Update Role
    </button>
    {error && <p className="mt-2 text-red-500">{error}</p>}
  </div>
  
  );
}
