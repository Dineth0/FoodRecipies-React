

interface FoodsFormProps {
  onClose: () => void;
  onSave: (player: {
    id: string;
    name: string;
    age: number;
    country: string;
    main_role: string;
    batting: string;
    balling: string;
  }) => void;
}

export const FoodForm: React.FC<FoodsFormProps> = ({ onClose }) => {
  

  

  return (
   
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
      {/* Modal Card */}
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all scale-100 hover:scale-[1.01] my-auto">
        <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
          Add New Player
        </h2>

        <form  className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Player ID</label>
            <input
              name="id"
              placeholder="P001"
              
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Player Name</label>
            <input
              name="name"
              placeholder="Enter name"
              
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-gray-300 text-sm">Age</label>
            <input
              name="age"
              type="file"
             
             
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          

          

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
              Save
            </button>
          </div>
        </form>

        {/* Close Button (optional top-right “X”) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default FoodForm;