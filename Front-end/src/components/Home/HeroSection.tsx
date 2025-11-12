import heroPic from "../../assets/heropic.png";

export default function HeroSection() {
  return (
    <section className="bg-[#f8e1b8] min-h-[100vh] flex flex-col md:flex-row items-start justify-between px-8 md:px-20 py-7">
      
      {/* Left Side - Text */}
      <div className="flex flex-col justify-start mt-10 md:mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#2d1b0b] leading-tight mb-6">
          Discover and <br /> Cook Amazing <br /> Recipes
        </h1>

        <div className="bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex items-center p-4 w-full md:w-[420px] mt-4">
          <input
            type="text"
            placeholder="Search recipes, ingredients..."
            className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-600 text-lg"
          />
        </div>
      </div>

    
      <div className="flex  md:justify-end w-full md:w-auto mt-7 md:mt-0">
        <img
          src={heroPic}
          alt="Delicious food"
          className="w-[380px] md:w-[480px] lg:w-[520px] rounded-full shadow-2xl border-[10px] border-[#f8e1b8] mb-360"
        />
      </div>
    </section>
  );
}
