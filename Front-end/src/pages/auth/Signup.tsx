import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { showErrorAlert } from '../../utils/SweetAlerts';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      const errorMessage = 'Passwords do not match';
      setPasswordError(errorMessage);
      showErrorAlert('Password Error', errorMessage);
      return;
    }
    
    setPasswordError('');
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe4c3] to-[#f8cd96] flex justify-center items-center p-6">
      <div className="w-[400px] max-w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
        

          <div className="flex items-center justify-center mb-5">
            <h1 className="text-3xl font-extrabold text-[#ff9f1c] tracking-wide">
             DON Food<span className="text-[#3b2f2f]">ie</span>
            </h1>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#3b2f2f]">Create your account</h2>
            <p className="text-sm text-gray-600 mt-1">Join the Foodie community 🍽️</p>
          </div>

          {/* Error Messages */}
          {(error || passwordError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error || passwordError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#3b2f2f] mb-1">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]"
                placeholder="Enter your full name  "            />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#3b2f2f] mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]"
                 placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#3b2f2f] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]"
                 placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#3b2f2f] mb-1">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]"
                placeholder="Confirm your password"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ff7f00] text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-center text-sm text-gray-600 mt-5">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-[#ff9f1c] hover:text-[#ff7f00]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    
  );
};

export default Signup;