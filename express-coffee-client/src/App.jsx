import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import CoffeeCard from "./components/Coffeecard/CoffeeCard";

const App = () => {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);
  console.log(coffees);
  return (
    <div className="container mx-auto my-8">
      <button className="btn btn-outline btn-accent hover:underline">
        <Link to="/addCoffee" className="hover:text-red-500">
          Add New Coffee
        </Link>
      </button>
      <div className="grid lg:grid-cols-3 gap-5 mt-8">
        {coffees.map((coffee) => (
          <CoffeeCard
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
