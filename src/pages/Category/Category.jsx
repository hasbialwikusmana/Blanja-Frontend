import { FaStar } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import api from "../../services/Api";
import { useEffect, useState } from "react";

function Category() {
  const [category, setCategory] = useState([]);
  const [sortby, setSortBy] = useState("product_name");
  const [sort, setSort] = useState("asc");
  const { id } = useParams();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sortby, sort]);

  const getProducts = async () => {
    try {
      const response = await api.get(`/products/category/${id}`, {
        params: {
          sortby,
          sort,
        },
      });

      setCategory(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container w-4/5 mx-auto py-8">
        <div className="text-sm text-gray-600 mb-10">Home &gt; Category &gt; {category[0]?.category_name || "Loading..."}</div>
        <div>
          <h2 className="text-2xl font-bold mb-5">{category[0]?.category_name || "Loading..."}</h2>

          {/* Category Filter */}
          <div className="flex justify-between mb-5">
            <div className="flex items-center">
              <label className="mr-2">Sort by:</label>
              <select value={sortby} onChange={handleSortByChange} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary">
                <option value="product_name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="mr-2">Order:</label>
              <select value={sort} onChange={handleSortOrderChange} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {category.length > 0 ? (
              category.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <div className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
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
                  </div>
                </Link>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center items-center space-x-2">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              <i className="fas fa-chevron-left"></i> Prev
            </button>

            <span className="text-gray-800 font-bold">
              Page {currentPage} of {totalPages}
            </span>

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Category;
