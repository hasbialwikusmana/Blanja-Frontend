import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import gambar1 from "../../assets/img/products/1.png";
import gambar2 from "../../assets/img/products/2.png";
import gambar3 from "../../assets/img/products/3.png";
import gambar4 from "../../assets/img/products/4.png";
import gambar5 from "../../assets/img/products/5.png";
// import thumbnail1 from "../../assets/img/products/1.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import api from "../../services/Api";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(gambar1);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch product by ID
    const fetchProductById = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        if (response.data && response.data.data) {
          setProduct(response.data.data);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        console.error(error);
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  // Function to handle incrementing the quantity
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { productId: product.id, quantity } });
  };

  const handleAddToBag = () => {
    dispatch({ type: "ADD_TO_MYBAG", payload: { ...product, quantity } });
  };

  return (
    <>
      <Navbar />

      {/* Product Detail */}
      <div className="container w-4/5 mx-auto py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-10">Home &gt; Category &gt; {product?.category_name}</div>

        <div className="flex flex-wrap">
          {/* Image product */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img src={selectedImage && product.photo} alt="Product Image" className="w-full rounded-md mb-4" />
            {/* Thumbnail */}
            <div className="flex space-x-5 overflow-x-auto">
              {[gambar1, gambar2, gambar3, gambar4, gambar5].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-1/5 md:w-1/6 h-auto rounded-md border border-gray-300 cursor-pointer ${selectedImage === img ? "border-primary" : ""}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Informasi Produk */}
          <div className="w-full md:w-1/2 md:pl-8">
            {/* Product Title */}
            <h1 className="text-2xl font-semibold mb-4">{product?.product_name}</h1>

            {/* Brand */}
            <p className="text-gray-600 mb-4">{product?.category_name}</p>

            {/* Rating */}
            <div className="flex items-center mb-10">
              <span className="text-yellow-500 mr-1">
                <FaStar className="inline-block mr-1" />
                <FaStar className="inline-block mr-1" />
                <FaStar className="inline-block mr-1" />
                <FaStar className="inline-block mr-1" />
                <FaStar className="inline-block mr-1" />
              </span>
              <span className="text-gray-600">(10)</span>
            </div>

            {/* Price */}
            <p className="text-gray-600 mb-2">Price</p>
            <p className="text-2xl font-semibold mb-10">{formatCurrency(product?.price)}</p>

            <div className="flex items-center mb-10">
              {/* Quantity */}
              <div>
                <p className="text-gray-600 mb-2">Quantity</p>
                <div className="flex items-center">
                  <button onClick={handleDecrement} className="bg-gray-300 text-white px-2 py-2 rounded-full focus:outline-none">
                    <FaMinus />
                  </button>
                  <span className="px-3 font-semibold">{quantity}</span>
                  <button onClick={handleIncrement} className="bg-white border text-black px-2 py-2 rounded-full focus:outline-none">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex mb-4">
              <button className="w-1/2 border border-primary text-primary px-4 py-2 rounded-full mr-4 focus:outline-none hover:text-white hover:bg-primary">Chat</button>
              <button className="w-1/2 border border-primary text-primary px-4 py-2 rounded-full mr-4 focus:outline-none hover:text-white hover:bg-primary" onClick={handleAddToBag}>
                Add Bag
              </button>
              <button onClick={handleCheckout} className="w-1/3 bg-primary text-white px-4 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="border-t pt-10">
          <h2 className="text-lg font-semibold mb-10">Informasi Produk</h2>
          <div className="flex mb-10 flex-col">
            <span className="text-black font-bold mb-2">Condition</span>
            <span className="text-red-500 font-semibold">New</span>
          </div>

          <div className="flex mb-2 flex-col">
            <span className="text-black font-bold mr-2">Description</span>
            <p className="text-gray-600">{product?.description}</p>
          </div>
        </div>

        {/* Product Review */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Product Review</h2>

          {/* Total Rating */}
          <div className="flex items-center mb-2">
            <div className="mr-16">
              <span className="text-6xl font-semibold">5.0</span>
              <span className="text-gray-600">/10</span>

              <div className="flex items-center justify-center mt-4 mb-10">
                <FaStar className="text-yellow-500 mr-1" />
                <FaStar className="text-yellow-500 mr-1" />
                <FaStar className="text-yellow-500 mr-1" />
                <FaStar className="text-yellow-500 mr-1" />
                <FaStar className="text-yellow-500 mr-1" />
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-600 mr-2">5</span>
                <div className="bg-gray-200 h-4 w-1/4 rounded-full">
                  <div className="bg-primary h-full w-2/5 rounded-full"></div>
                </div>
                <span className="text-gray-600 ml-2">2</span>
              </div>

              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-600 mr-2">4</span>
                <div className="bg-gray-200 h-4 w-1/4 rounded-full">
                  <div className="bg-primary h-full w-0 rounded-full"></div>
                </div>
                <span className="text-gray-600 ml-2">0</span>
              </div>

              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-600 mr-2">3</span>
                <div className="bg-gray-200 h-4 w-1/4 rounded-full">
                  <div className="bg-primary h-full w-0 rounded-full"></div>
                </div>
                <span className="text-gray-600 ml-2">0</span>
              </div>

              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-600 mr-2">2</span>
                <div className="bg-gray-200 h-4 w-1/4 rounded-full">
                  <div className="bg-primary h-full w-0 rounded-full"></div>
                </div>
                <span className="text-gray-600 ml-2">0</span>
              </div>

              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-gray-600 mr-2">1</span>
                <div className="bg-gray-200 h-4 w-1/4 rounded-full">
                  <div className="bg-primary h-full w-0 rounded-full"></div>
                </div>
                <span className="text-gray-600 ml-2">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* You can also like this */}
        <div className="border-t pt-10">
          <h2 className="text-2xl font-bold mb-2">You can also like this</h2>
          <p className="text-gray-600 mb-4">You’ve never seen it before!</p>
          {/* Similar products component here */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="bg-white shadow-lg hover:shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
                  <img className="w-full h-40 object-cover object-center" src={product.photo} alt={product.product_name} />
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold text-lg">{product.product_name}</h3>
                    <p className="mt-1 text-gray-700 text-sm">{product.category_name}</p>
                    <p className="mt-1 text-red-700 text-md font-semibold">{product.price}</p>
                    <div className="flex mt-2">
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
