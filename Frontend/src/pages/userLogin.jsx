import { useUserAuthStore } from "../store/userAuth.store";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";



export function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn,loginWithGoogle } = useUserAuthStore();
  const navigate = useNavigate();
 
  useEffect(() => {
    const storedEmail=localStorage.getItem("email");
    setFormData({...formData, email: storedEmail || "" });
  },[]
) 

  const validateForm = () => {
    if (!formData.email.trim()) {
       toast.error("Email is required");
       return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is invalid");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
       toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      localStorage.setItem("email", formData.email);
      try {
        await login(formData);
        toast.success("Login successful!");
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
      }
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Login with Google successful!");
    loginWithGoogle();
    
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 bg-white">
        <div className="w-full max-w-md py-12">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-base text-gray-600 mb-8">Login to your account</p>
  
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full h-12 flex items-center justify-center gap-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
            >
              <img 
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" 
                alt="Google logo" 
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
  
            {/* Divider */}
            <div className="w-full flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
  
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full h-12 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
  
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full h-12 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link to="/user/forget-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
  
              <button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-4 shadow-md"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
  
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/user/signup" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      {/* Right Side - Enhanced Design */}
      <div className="hidden md:block md:w-1/2 bg-blue-500 relative overflow-hidden">
        {/* Animated Background Circles */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/5 w-48 h-48 bg-white opacity-15 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-white opacity-15 rounded-full"></div>
          <div className="absolute bottom-1/6 right-1/6 w-36 h-36 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-1/6 left-1/6 w-20 h-20 bg-blue-300 opacity-20 rounded-full"></div>
        </div>
  
        {/* Content Container */}
        <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-12 z-10">
          <div className="max-w-lg text-center">
            {/* Icon or Logo */}
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">Welcome back!</h2>
            <p className="text-xl text-white text-opacity-90 mb-12">
              Login to continue your shopping journey and explore amazing deals tailored just for you.
            </p>
            
            {/* Features List */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-white text-opacity-90 text-left">Exclusive access to premium products</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-white text-opacity-90 text-left">Personalized recommendations</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-white text-opacity-90 text-left">Special member discounts</p>
              </div>
            </div>
            
            {/* Indicator Dots */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white opacity-60 rounded-full"></div>
              <div className="w-2 h-2 bg-white opacity-60 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


  
 