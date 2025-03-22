import { useState } from 'react';
import Title1 from '@/components/shared/typo/Title1';
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true); // Set loading to true when login starts

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and isAdmin to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', data.isAdmin);

      // Navigate based on user role
      if (data.isAdmin) {
        navigate('/admin-home');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      // Show error message using SweetAlert
      await Swal.fire({
        title: "Error!",
        text: error.message || 'Login failed',
        icon: "error",
        confirmButtonColor: "#3B82F6", // Your desired color (Tailwind blue-500)
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'focus:outline-none' // Remove default focus outline
        }
      });
    } finally {
      setLoading(false); // Reset loading state after login completes
    }
  };

  return (
      <div  className="flex flex-col items-center justify-center w-full h-screen bg-primary p-4">
        <div className="flex flex-col w-full max-w-md bg-black rounded-3xl p-10 mx-auto">
          <div className="flex items-center gap-3 mb-10 mx-auto">
            <p className="text-primary">
      
              <span className="block text-2xl font-semibold">Daily Delights</span>
            </p>
          </div>
          <div className="mt-6">
            <input
                type="text"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="w-full mt-6 p-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition"
                onClick={handleLogin}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="text-center text-gray-500 mt-4">
              <a href="#" className="text-primary hover:underline">Forgot Password?</a>
            </p>
            <p className="text-center text-gray-500 mt-4">
              <a href="/sign-up" className="text-primary hover:underline">Don't have an account</a>
            </p>
          </div>
        </div>
      </div>
  );
}