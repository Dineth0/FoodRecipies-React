import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"
import { useDispatch, useSelector } from "react-redux"
import type { AppDisPatch, RootState } from "../../redux/store"
import { resetError, sendOtp } from "../../redux/slices/authSlice"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch<AppDisPatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    
    const navigate = useNavigate()

    useEffect(() => {
     dispatch(resetError());
    }, [dispatch]);


    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        dispatch(sendOtp(email))
            .unwrap()
            .then(() => {
                showSuccessAlert("OTP sent to your email");
                navigate('/reset-password', { state: { email } });
            })
            .catch((error) => {
                showErrorAlert('OTP Send Failed', error);
            });
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe4c3] to-[#f8cd96] flex justify-center items-center p-6">
        <div className="w-[400px] max-w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-3xl font-extrabold text-[#ff9f1c] tracking-wide">
                    DON Food<span className="text-[#3b2f2f]">ie</span>
                </h1>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#3b2f2f]">Forgot Password?</h2>
                <p className="text-sm text-gray-600 mt-2">Enter your email to receive a reset OTP.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-[#3b2f2f] mb-1">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#ff9f1c]"/>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ff7f00] text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50">
                        {loading ? 'Sending...': 'Send OTP'}
                </button>
                <div className="text-center">
                    <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-[#ff9f1c]">
                        ← Back to Login
                    </Link>
                </div>
                {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            </div>
                            <div className="ml-3">
                            <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                        </div>
                    )}
            </form>
        </div>
    </div>
  )
}
