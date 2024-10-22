import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

interface Product {
  id: number;
  name: string;
  description: string;
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      const data = await response.data;
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleUpdate = (product: Product) => {
    // Your update logic here
    console.log(`Update product: ${product.name}`);
  };

  const handleDelete = (productId: number) => {
    // Your delete logic here
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className="p-4">
      <NavBar />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Product Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-800">
                  {product.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-600">
                  {product.description}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 mr-2"
                    onClick={() => handleUpdate(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListing;
