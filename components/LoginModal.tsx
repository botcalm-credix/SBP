import React, { useState, useEffect } from 'react';
import { X, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl shadow-brand-blue/10 animate-in zoom-in-95 duration-200 flex flex-col items-center">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Icon & Title */}
        <div className="mb-6 text-center">
          <div className="w-20 h-20 bg-dark-800 rounded-2xl border border-dark-700 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
            <div className="absolute inset-0 bg-brand-blue/20 blur-xl rounded-full"></div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-accent flex items-center justify-center relative z-10">
               <User className="text-white" size={20} />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-status-green rounded-full border-2 border-dark-800"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to unlock live betting and AI insights.</p>
        </div>

        {/* Login Form Fields */}
        <div className="w-full space-y-4">
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-brand-blue transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-dark-800 border border-dark-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-3.5 text-gray-500 group-focus-within:text-brand-blue transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="w-full bg-dark-800 border border-dark-700 rounded-xl py-3 pl-10 pr-10 text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white transition-colors"
                type="button"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {/* Options Row */}
          <div className="flex items-center justify-between ml-1 mr-1">
             <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded bg-dark-800 border-dark-700 text-brand-blue focus:ring-0 w-4 h-4 cursor-pointer" />
                <label htmlFor="remember" className="text-xs text-gray-400 cursor-pointer select-none hover:text-gray-300">Remember me</label>
             </div>
             <button className="text-xs text-brand-blue hover:text-blue-400 transition-colors font-medium">Forgot Password?</button>
          </div>
        </div>

        {/* Primary Button */}
        <button 
          onClick={onLogin}
          className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center mt-8"
        >
          Log In
        </button>

        <div className="mt-6 text-center">
             <p className="text-sm text-gray-400">
                Don't have an account? <button onClick={onSwitchToSignup} className="text-brand-blue hover:underline font-medium">Sign Up</button>
            </p>
        </div>
        
      </div>
    </div>
  );
};