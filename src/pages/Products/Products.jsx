import { Link } from "react-router-dom";
// import productImage from "../../assets/img/products/product.jpeg";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../services/Api";
import { formatCurrency } from "../../utils/formatCurrency";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products?sortby=created_at&sort=desc");
        setProducts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-4/5 container mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-4">New</h1>
        <p className="text-gray-700 mb-8">You’ve never seen it before!</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden ">
                <img className="w-full h-40 sm:h-48 object-cover object-center hover:scale-110 transition ease-in-out" src={product.photo} alt={product.product_name} />
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-base sm:text-lg md:text-xl lg:text-lg">{product.product_name}</h3>
                  <p className="mt-1 text-gray-700 text-sm">{product.category_name}</p>
                  <p className="mt-1 text-red-700 text-md font-semibold">{formatCurrency(product.price)}</p>
                  <div className="flex mt-2">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-4/5 container mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-4">Popular</h1>
        <p className="text-gray-700 mb-8">Find clothes that are trending recently</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden ">
                <img className="w-full h-40 sm:h-48 object-cover object-center hover:scale-110 transition ease-in-out" src={product.photo} alt={product.product_name} />
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-base sm:text-lg md:text-xl lg:text-lg">{product.product_name}</h3>
                  <p className="mt-1 text-gray-700 text-sm">{product.category_name}</p>
                  <p className="mt-1 text-red-700 text-md font-semibold">{formatCurrency(product.price)}</p>
                  <div className="flex mt-2">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
