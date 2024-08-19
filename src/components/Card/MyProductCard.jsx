import { useEffect, useState } from "react";
import NoOrderImage from "../../assets/img/order/2.png";
import { FaSearch, FaTrash } from "react-icons/fa";
import api from "../../services/Api";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 5; // Number of items per page

const MyProductCard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.get("/products/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    return product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) && (activeTab === "All" || (activeTab === "Sold out" && product.stock === 0));
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        await api.delete(`/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire("Deleted!", "Your product has been deleted.", "success");

        setProducts(products.filter((product) => product.id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error!", "Something went wrong while deleting the product.", "error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      product_name: e.target.product_name.value,
      price: parseFloat(e.target.price.value),
      stock: parseInt(e.target.stock.value, 10),
      description: e.target.description.value,
      category_id: e.target.category_id.value,
      photo: e.target.photo.files[0] || editingProduct.photo,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await api.put(`/products/${editingProduct.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts(products.map((product) => (product.id === editingProduct.id ? response.data.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="w-3/4 p-8">
      <div className="bg-white rounded-md border shadow-md p-6 mb-8 h-screen">
        <h2 className="text-lg font-semibold mb-4">My Products</h2>
        <div className="flex mb-4">
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "All" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("All")}>
            All items
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "Sold out" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("Sold out")}>
            Sold out
          </button>
        </div>
        <hr className="mb-4" />

        {/* SEARCH */}
        <div className="flex items-center mb-4">
          <div className="relative w-1/4">
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary" />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="w-full max-h-80 overflow-y-auto shadow-md rounded-lg border border-gray-200">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    <img src={NoOrderImage} alt="No Data" className="mx-auto object-cover w-1/3 mb-4 pt-10" />
                    You don&apos;t have a product yet
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.product_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => setEditingProduct(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-primary-dark">
                        <FaPencil />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-600 ml-2">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === 1 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === totalPages ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  id="product_name"
                  name="product_name"
                  type="text"
                  defaultValue={editingProduct.product_name}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editingProduct.price}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  defaultValue={editingProduct.stock}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={editingProduct.description}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  id="category_id"
                  name="category_id"
                  type="text"
                  defaultValue={editingProduct.category_id}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <input id="photo" name="photo" type="file" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600 mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md focus:outline-none hover:bg-primary-dark">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProductCard;
