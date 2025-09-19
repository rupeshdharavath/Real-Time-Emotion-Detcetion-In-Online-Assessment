import { useState } from "react";

const StudentLogin = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Simulated database (Replace with backend API in real apps)
  const storedUsers = JSON.parse(localStorage.getItem("students")) || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (storedUsers[rollNumber] === password) {
      setMessage("Login Successful ✅");
    } else {
      setMessage("Invalid Credentials ❌");
    }
  };

  const handleRegister = () => {
    storedUsers[rollNumber] = password;
    localStorage.setItem("students", JSON.stringify(storedUsers));
    setMessage("Student Registered Successfully ✅");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Student Login</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Roll Number</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleRegister}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
