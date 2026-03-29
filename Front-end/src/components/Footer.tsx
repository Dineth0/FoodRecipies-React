import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-[#1a0d08] text-[#f3e8dd] py-12 shadow-inner border-t border-[#3e2418]'>
        <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10'>
            <div>
             
                <h2 className='text-3xl font-extrabold text-[#f59e0b] tracking-tight'>
                    DON Foodie
                </h2>
                <p className='mt-3 text-sm text-[#ab886d] leading-relaxed'>
                     Discover easy, delicious, and healthy recipes for every occasion. Stay inspired with our cooking secrets.
                </p>
            </div>
            
            <div>
                <h3 className='font-semibold text-lg mb-4 text-[#f3e8dd]'>Quick Links</h3>
                <ul className='space-y-2 text-sm text-[#ab886d]'>
                    <li><Link to="/" className='hover:text-[#f59e0b] transition'>Home</Link></li>
                    <li><Link to="/all-foods" className='hover:text-[#f59e0b] transition'>Foods</Link></li>
                    <li><Link to="/all-recipes" className='hover:text-[#f59e0b] transition'>Recipes</Link></li>
                    <li><Link to="/about" className='hover:text-[#f59e0b] transition'>About</Link></li>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-4 text-[#f3e8dd]">Join Our Newsletter</h3>
                <p className="text-sm text-[#ab886d] mb-4">
                    Get the latest recipes and cooking tips directly in your inbox.
                </p>
                <form className="flex">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 rounded-l-lg bg-[#2d1b0b] border border-[#3e2418] text-white focus:outline-none focus:ring-1 focus:ring-[#f59e0b]"
                    />
                    <button
                        type="submit"
                        className="bg-[#f59e0b] px-4 py-2 rounded-r-lg font-semibold hover:bg-[#d97706] text-[#2d1b0b] transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>       

        <div className="border-t border-[#3e2418] mt-10 pt-5 text-center text-sm text-[#634832]">
            © {new Date().getFullYear()} DON Foodie — All Rights Reserved.
        </div>
    </footer>
  )
}