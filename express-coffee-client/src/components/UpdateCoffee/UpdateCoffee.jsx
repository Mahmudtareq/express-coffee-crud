import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const singleCoffee = useLoaderData();
  const { name, chefname, category, photo, taste, details, supplier, _id } =
    singleCoffee;
  const navigate = useNavigate();
  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const from = e.target;
    const name = from.coffeeName.value;
    const chefname = from.chefname.value;
    const supplier = from.supplier.value;
    const taste = from.taste.value;
    const category = from.category.value;
    const details = from.details.value;
    const photo = from.photo.value;
    const updateCoffee = {
      name,
      chefname,
      category,
      photo,
      taste,
      details,
      supplier,
    };
    fetch(`http://localhost:5000/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "success",
            text: "Update Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate("/");
        }
        from.reset();
      });
  };
  console.log(singleCoffee);
  return (
    <div className=" container  mx-auto bg-[#F4F3F0] lg:w-1/2 my-8 rounded ">
      <div className="p-4">
        <h1 className="mt-8 mb-5 text-center font-bold text-lg">
          Update a Coffee
        </h1>
        <p className=" text-center text-sm text-gray-400">
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>
      <div className="p-4">
        <form onSubmit={handleUpdateCoffee}>
          <div className="lg:flex gap-4">
            <div className="form-control w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Coffee Name</span>
              </label>
              <input
                type="text"
                defaultValue={name}
                placeholder="Enter coffee name"
                className="input input-bordered w-full "
                name="coffeeName"
              />
            </div>
            <div className="form-control w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Chef</span>
              </label>

              <input
                type="text"
                placeholder="Enter coffee chef"
                className="input input-bordered w-full "
                name="chefname"
                defaultValue={chefname}
              />
            </div>
          </div>
          {/* -------------------- */}
          <div className="lg:flex gap-4">
            <div className="form-control w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Supplier</span>
              </label>
              <input
                type="text"
                placeholder="Enter Supplier name"
                className="input input-bordered w-full "
                name="supplier"
                defaultValue={supplier}
              />
            </div>
            <div className="form-control  w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Taste</span>
              </label>

              <input
                type="text"
                placeholder="Enter coffee taste"
                className="input input-bordered w-full "
                name="taste"
                defaultValue={taste}
              />
            </div>
          </div>
          {/* ----------------- */}
          <div className="lg:flex gap-4">
            <div className="form-control w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter Category name"
                className="input input-bordered w-full "
                name="category"
                defaultValue={category}
              />
            </div>
            <div className="form-control  w-full lg:w-1/2">
              <label className="label">
                <span className="label-text">Details</span>
              </label>

              <input
                type="text"
                placeholder="Enter coffee Details"
                className="input input-bordered w-full "
                name="details"
                defaultValue={details}
              />
            </div>
          </div>
          {/* ----------- */}
          <div className="form-control  w-full ">
            <label className="label">
              <span className="label-text">Photo Url</span>
            </label>

            <input
              type="text"
              placeholder="Enter Photo Url"
              className="input input-bordered w-full"
              name="photo"
              defaultValue={photo}
            />
          </div>
          {/* ----button---------- */}
          <button
            type="submit"
            className="btn btn-block my-5 bbtn-active btn-neutral"
          >
            Update Coffee
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
