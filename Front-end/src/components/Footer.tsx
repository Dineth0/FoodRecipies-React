import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-gradient-to-br from-yellow-200 via-orange-200 to-amber-300 text-gray-800 py-12  shadow-inner'>
        <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10'>
            <div>
                <h2 className='text-3xl font-extrabold text-brown-900 tracking-tight'>
                    DON Recipes
                </h2>
                <p className='mt-3 text-sm text-gray-700 leading-relaxed'>
                     Discover easy, delicious, and healthy recipes for every occasion.
                </p>
            </div>
            <div>
                <h3 className='font-semibold text-lg mb-3 text-brown-900'>Quick Links</h3>
                <ul className='space-y-2 text-sm'>
                    <li><Link to="/" className='hover:text-brown-700 transition'>Home</Link></li>
                    <li><Link to="/category" className='hover:text-brown-700 transition'>Category</Link></li>
                    <li><Link to="/submit" className='hover:text-brown-700 transition'>Submit</Link></li>
                    <li><Link to="/about" className='hover:text-brown-700 transition'>About</Link></li>
                </ul>
            </div>

                <div>
                    <h3 className="font-semibold text-lg mb-3 text-brown-900">Join Our Newsletter</h3>
                    <p className="text-sm text-gray-700 mb-3">
                        Get the latest recipes and cooking tips directly in your inbox.
                    </p>
                    <form className="flex">
                        <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button
                        type="submit"
                        className="bg-orange-400 px-4 py-2 rounded-r-lg font-semibold hover:bg-orange-500 text-white transition"
                        >
                        Subscribe
                        </button>
                    </form>
                </div>
         </div>       


             <div className="border-t border-amber-400 mt-10 pt-5 text-center text-sm text-brown-800">
                ©        {new Date().getFullYear()} DON Recipes — All Rights Reserved.
            </div>
       
    </footer>
  )
}
