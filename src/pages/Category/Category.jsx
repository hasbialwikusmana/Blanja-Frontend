import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import api from "../../services/Api";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaFilter, FaStar } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortby, setSortBy] = useState("");
  const [sort, setSort] = useState("");
  const [selectedTypes] = useState([]);
  const { id } = useParams(); // Get the current category ID from URL
  const navigate = useNavigate(); // Hook to programmatically navigate

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortby, sort, selectedTypes, id]); // Added id dependency

  const getCategories = async () => {
    try {
      const response = await api.get(`/category`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get(`/products/category/${id}`, {
        params: {
          sortby,
          sort,
          types: selectedTypes.join(","),
        },
      });
      setFilteredProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSort(e.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    // Update the URL parameter to the selected category ID
    navigate(`/products/category/${categoryId}`);
  };

  return (
    <>
      <Navbar />
      <div className="w-4/5 mx-auto pt-32">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">Home &gt; Category &gt; {categories.find((cat) => cat.id === id)?.name || "Loading..."}</div>

        {/* Main Container */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 border-gray-200">
          {/* Category Filter */}
          <div className="w-full sm:w-1/4 min-w-60">
            {/* Filter Toggle for Smaller Screens */}
            <p onClick={() => setShowFilter(!showFilter)} className="text-lg font-semibold flex items-center cursor-pointer gap-2 mb-4 sm:hidden">
              Filter
              <FaFilter size={20} className={`transform transition-transform ${showFilter ? "rotate-180" : ""}`} />
            </p>

            {/* Filter Section */}
            <div className={`border border-gray-300 p-4 bg-white shadow-md rounded-lg ${showFilter ? "" : "hidden"} sm:block`}>
              <p className="text-sm font-semibold text-gray-900 mb-4">Filter</p>
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      className="form-checkbox h-4 w-4 text-primary"
                      type="checkbox"
                      value={cat.id}
                      onChange={() => handleCategoryChange(cat.id)}
                      checked={id === cat.id} // Ensure checkbox reflects the selected category ID
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area (e.g., Product List) */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">{categories.find((cat) => cat.id === id)?.name || "Loading..."}</h2>

              {/* Sorting Dropdown */}
              <div className="flex gap-4">
                <select value={sortby} onChange={handleSortByChange} className="border border-gray-300 rounded-md text-sm px-4 py-2 bg-white focus:outline-none focus:border-primary">
                  <option value="">Sort By</option>
                  <option value="product_name">Name</option>
                  <option value="price">Price</option>
                </select>

                {/* Order Direction Dropdown */}
                <select value={sort} onChange={handleSortOrderChange} className="border border-gray-300 rounded-md text-sm px-4 py-2 bg-white focus:outline-none focus:border-primary">
                  <option value="">Order</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
                    <img className="w-full h-40 object-cover object-center" src={product.photo} alt={product.product_name} />
                    <div className="p-4">
                      <h3 className="text-gray-900 font-semibold text-lg">{product.product_name}</h3>
                      <p className="mt-1 text-gray-700 text-sm">{product.category_name}</p>
                      <p className="mt-1 text-red-700 text-md font-semibold">$ {product.price}</p>
                      <div className="flex mt-2">
                        <FaStar className="text-yellow-500 mr-1" />
                        <FaStar className="text-yellow-500 mr-1" />
                        <FaStar className="text-yellow-500 mr-1" />
                        <FaStar className="text-yellow-500 mr-1" />
                        <FaStar className="text-yellow-500 mr-1" />
                        <span className="text-gray-600 text-sm">(5)</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>

            {/* Pagination */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Category;
