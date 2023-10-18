import React from "react";
import coffeeImage from "../../assets/images/coffee1.png";
import { FaRegEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CoffeeCard = ({ coffee, coffees, setCoffees }) => {
  const { name, chefname, category, photo, taste, details, supplier, _id } =
    coffee;
  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Coffee has been deleted.", "success");
              const remaining = coffees.filter((coffee) => coffee._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="container">
      <div className="lg:flex shadow items-center rounded mx-4 lg:mx-0">
        <figure className="">
          <img
            src={coffeeImage}
            alt="Movie"
            className="
            "
          />
        </figure>
        <div className="lg:flex justify-between w-full px-4 items-center">
          <div>
            <h2 className="text-base font-bold">Name : {name}</h2>
            <p>supplier : {supplier}</p>
          </div>

          <div className="join lg:join-vertical space-x-2 lg:space-x-0 lg:space-y-3 py-3 join-horizontal">
            <Link to={`updateCoffee/${_id}`}>
              <button className="btn btn-circle join-item">
                <FaRegEdit className="h-5 w-5" />
              </button>
            </Link>

            <button
              className="btn btn-circle join-item"
              onClick={() => handleDelete(_id)}
            >
              <AiTwotoneDelete className="h-5 w-5" />
            </button>
            <button className="btn btn-circle join-item">view</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
