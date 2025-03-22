import { useState } from 'react';
import Title1 from '@/components/shared/typo/Title1';
import Swal from 'sweetalert2'
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Input validation
      if (password !== rePassword) {
        return await Swal.fire({
          title: "Error!",
          text: "Passwords don't match!",
          icon: "error",
          confirmButtonColor: "#3B82F6", // Your desired color (Tailwind blue-500)
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'focus:outline-none' // Remove default focus outline
          }
        });
      }

      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin: isAdmin // Send boolean value
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      await Swal.fire({
        title: "Successful!",
        text: "User registered successfully!",
        icon: "success",
        confirmButtonColor: "#3B82F6", // Your desired color (Tailwind blue-500)
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'focus:outline-none' // Remove default focus outline
        }
      });

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');
      setRePassword('');
      setIsAdmin(false);

      navigate('/login');

    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: 'Registration error',
        icon: "error",
        confirmButtonColor: "#3B82F6", // Your desired color (Tailwind blue-500)
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'focus:outline-none' // Remove default focus outline
        }
      });
    }
  };

  return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-primary p-4">
        <div className="flex flex-col w-full max-w-md bg-black rounded-3xl p-10 mx-auto">
          <div className="flex items-center gap-3 mb-10 mx-auto">
            <p className="text-primary">
              <span className="block text-2xl font-semibold">Daily Delights</span>
            </p>
          </div>
          <Title1 className="text-primary">Sign Up</Title1>
          <div className="mt-6">
            <input
                type="text"
                placeholder="Name"
                className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-4">
              <select
                  className="w-full p-3 pl-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={isAdmin ? "admin" : "user"} // Convert boolean to string
                  onChange={(e) => setIsAdmin(e.target.value === "admin")} // Convert string to boolean
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Re-Password"
                className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />
            <button
                className="w-full mt-6 p-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                onClick={handleLogin}
            >
              Sign Up
            </button>
            <p className="text-center text-gray-500 mt-4">
              <a href="/login" className="text-primary hover:underline">I have an account</a>
            </p>
          </div>
        </div>
      </div>
  );
}