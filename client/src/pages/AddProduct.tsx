import axios from "axios";
import { useState } from "react";
import NavBar from "../components/NavBar";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/products", {
        name: name,
        description: description,
      });
      const data = response.data;
      setName("");
      setDescription("");
      console.log(data);
    } catch (error) {
      console.error("Error adding product:", error);
    }

    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="flex justify-center items-center py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Product</h2>
          <p className="text-gray-600 mb-6">
            Enter the details of your new product.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none "
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label
                htmlFor="description"
                className="font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none "
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-slate-600 text-white font-semibold py-2 rounded-md shadow hover:bg-slate-700 transition duration-200"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
