import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllFoods } from "../../services/FoodAPI";

interface Food {
  _id: string;
  name: string;
  category: string;
  images: string[];
}

export default function CategoryFoods() {
  const { category } = useParams();
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getAllFoods();
        const filtered = response.data.data.foods.filter(
          (f: Food) => f.category.toLowerCase() === category?.toLowerCase()
        );
        setFoods(filtered);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoods();
  }, [category]);

  return (
    <section className="px-8 md:px-20 py-10 bg-[#f8e1b8]">
      <h2 className="text-3xl font-bold text-[#2d1b0b] mb-8">
        {category} Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {foods.map((food) => (
          <div
            key={food._id}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:-translate-y-2"
          >
            <img
              src={food.images?.[0]}
              alt={food.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#2d1b0b]">
                {food.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
