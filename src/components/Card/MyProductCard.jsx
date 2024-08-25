import { useEffect, useState } from "react";
import NoOrderImage from "../../assets/img/order/2.png";
import { FaSearch } from "react-icons/fa";
import api from "../../services/Api";
import Swal from "sweetalert2";
import { formatCurrency } from "../../utils/formatCurrency";
import { HiPencilAlt, HiTrash } from "react-icons/hi";

const ITEMS_PER_PAGE = 5; // Number of items per page

const MyProductCard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

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

    const formData = new FormData();
    formData.append("product_name", e.target.product_name.value);
    formData.append("price", parseFloat(e.target.price.value));
    formData.append("stock", parseInt(e.target.stock.value, 10));
    formData.append("description", e.target.description.value);
    formData.append("category_id", e.target.category_id.value);

    // Handle the photo file
    if (e.target.photo.files[0]) {
      formData.append("photo", e.target.photo.files[0]);
    } else if (editingProduct.photo) {
      // If no new photo selected, append the existing photo URL
      formData.append("photo", editingProduct.photo);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await api.put(`/products/${editingProduct.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire("Updated!", "Product has been updated successfully.", "success");
      setProducts(products.map((product) => (product.id === editingProduct.id ? response.data.data : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="w-3/4 p-8 mt-16">
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

        <div className="w-full bg-white pb-4 rounded-lg border border-gray-200">
          <table className="w-full overflow-x-auto text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr className="text-left text-sm font-semibold text-gray-600 uppercase">
                <th scope="col" className="text-center px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Price
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="text-center px-6 py-3">
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
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">{product.product_name}</td>
                    <td className=" text-center whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.price)}</td>
                    <td className=" text-center whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                    <td className=" text-center whitespace-nowrap text-sm font-medium">
                      <button onClick={() => setEditingProduct(product)} className="text-green-500 hover:text-green-700">
                        <HiPencilAlt className="w-6 h-6 mr-2" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                        <HiTrash className="w-6 h-6" />
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
            className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === 1 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-hoverPrimary"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none ${currentPage === totalPages ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-hoverPrimary"}`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input type="text" name="product_name" defaultValue={editingProduct.product_name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input type="text" name="price" defaultValue={editingProduct.price} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input type="text" name="stock" defaultValue={editingProduct.stock} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select name="category_id" defaultValue={editingProduct.category_id} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary">
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea name="description" defaultValue={editingProduct.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="flex items-center space-x-4">
                    {editingProduct.photo && <img src={editingProduct.photo} alt="Current photo" className="w-32 h-32 object-cover border border-gray-300 rounded-lg" />}
                    <input type="file" name="photo" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md focus:outline-none hover:bg-primary-dark">
                  Update
                </button>
                <button onClick={() => setEditingProduct(null)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-600">
                  Cancel
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
