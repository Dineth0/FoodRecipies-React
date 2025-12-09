import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg flex">

        {/* LEFT SIDEBAR */}
        <div className="w-64 border-r p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">
            Hello, {user?.name}
          </h2>

          <div className="text-sm text-gray-600 space-y-2">
            <div className="font-bold text-gray-800">Manage My Account</div>
            <p className="cursor-pointer hover:text-blue-600">My Profile</p>
            <p className="cursor-pointer hover:text-blue-600">Address Book</p>
            <p className="cursor-pointer hover:text-blue-600">My Payment Options</p>
            <p className="cursor-pointer hover:text-blue-600">Points</p>

            <div className="pt-3 font-bold text-gray-800">My Orders</div>
            <p className="cursor-pointer hover:text-blue-600">My Returns</p>
            <p className="cursor-pointer hover:text-blue-600">My Cancellations</p>

            <div className="pt-3 font-bold text-gray-800">My Reviews</div>

            <div className="pt-3 font-bold text-gray-800">My Wishlist</div>
          </div>
        </div>

        {/* RIGHT SIDE PROFILE DETAILS */}
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

          <div className="grid grid-cols-2 gap-10 text-gray-700">

            <div>
              <p className="font-semibold">Full Name</p>
              <p className="mt-1">{user?.name}</p>
            </div>

            <div>
              <p className="font-semibold">Email Address</p>
              <p className="mt-1">{user?.email}</p>
            </div>

            <div>
              <p className="font-semibold">Birthday</p>
              <p className="mt-1 text-gray-400">Please enter your birthday</p>
            </div>

            <div>
              <p className="font-semibold">Gender</p>
              <p className="mt-1 text-gray-400">Please enter your gender</p>
            </div>
          </div>

          <button className="mt-10 px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
            EDIT PROFILE
          </button>
        </div>

      </div>
    </div>
  );
}
