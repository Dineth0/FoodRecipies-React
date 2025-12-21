import React, { useEffect, useState } from "react"
import {  useLocation, useNavigate } from "react-router-dom"
import { showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"
import { passwordReset } from "../../services/axios"

export default function ResetPassword() {
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const location = useLocation();
    const email = location.state?.email

    useEffect(()=>{
        if(!email){
            navigate('/forgot-password')
        }
    },[email, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(newPassword !== confirmPassword){
            showErrorAlert('Password do not match')
            return
        }

        setLoading(true)
        try{
            await passwordReset({
                email,
                otp:parseInt(otp),
                newPassword
            })
            showSuccessAlert('Password Reset Successful! Login Now' )
            navigate('/login')
        }catch(error:any){
            setLoading(false)
                  let errorMessage = 'Faild to add food. Please try again.';
                        if (error.response?.data?.message) {
                          errorMessage = typeof error.response.data.message === 'object'
                            ? JSON.stringify(error.response.data.message)
                            : String(error.response.data.message);
                        }
                        setError(errorMessage);
                        showErrorAlert('Food Add Failed', errorMessage);
                        console.error(' error:', error);
            
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe4c3] to-[#f8cd96] flex justify-center items-center p-6">
      <div className="w-[400px] max-w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
        
        <div className='flex items-center justify-center mb-6'>
            <h1 className='text-3xl font-extrabold text-[#ff9f1c] tracking-wide'>
              DON Food<span className="text-[#3b2f2f]">ie</span>
            </h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#3b2f2f]">Reset Password</h2>
          <p className="text-sm text-gray-600">Enter the OTP sent to <br/><span className="font-semibold">{email}</span></p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
        
          <div>
            <label className="block text-sm font-medium text-[#3b2f2f] mb-1">OTP Code</label>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-center tracking-widest text-lg focus:ring-[#ff9f1c] focus:outline-none"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-[#3b2f2f] mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#ff9f1c] focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-[#3b2f2f] mb-1">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-[#ff9f1c] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-[#ff9f1c] to-[#ff7f00] text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? 'Reseting...' : 'Reset Password'}
          </button>
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
