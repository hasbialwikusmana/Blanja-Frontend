import { FaAngleDown, FaBox, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import profile from "../../assets/img/profile/1.png";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../services/Api";

function SidebarSeller() {
  const location = useLocation();
  const [isStoreDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setProductDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const sellerResponse = await api.get("/sellers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = sellerResponse.data.data;

        if (data.photo) {
          setProfileImage(data.photo);
        }
        if (data.name) {
          setName(data.name);
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You do not have permission to view this profile.",
          }).then(() => {
            localStorage.clear();
            window.location.href = "/";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching the profile.",
          });
        }
      }
    };

    fetchProfile();
  }, []);

  const toggleStoreDropdown = () => {
    setStoreDropdownOpen(!isStoreDropdownOpen);
  };

  const toggleProductDropdown = () => {
    setProductDropdownOpen(!isProductDropdownOpen);
    if (!isProductDropdownOpen) {
      setOrderDropdownOpen(false); // Tutup dropdown order jika terbuka
    }
  };

  const toggleOrderDropdown = () => {
    setOrderDropdownOpen(!isOrderDropdownOpen);
    if (!isOrderDropdownOpen) {
      setProductDropdownOpen(false); // Tutup dropdown product jika terbuka
    }
  };

  return (
    <div className="w-2/5 top-16 left-0 bg-white shadow-md mt-16">
      <div className="mt-8 flex flex-col items-center">
        {/* Profile Image and Name */}
        <div className="flex items-center mb-12 ml-16">
          <img src={profileImage || profile} alt="Profile Image" className="w-24 h-24 rounded-full mr-4 shadow-lg object-cover" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">{name}</h1>
            <div className="flex items-center text-gray-400">
              <FaPencil className="mr-2" /> Edit Profile
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <ul className="w-full lg:w-1/2 px-4 lg:px-0">
          {/* Store */}
          <li className="relative mb-2">
            <div className="flex items-center justify-between py-3 px-6 cursor-pointer bg-white hover:bg-gray-50 rounded-md shadow-sm" onClick={toggleStoreDropdown}>
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-full p-2 mr-3">
                  <FaHome className="text-white" size={20} />
                </div>
                <span className={`font-semibold transition-colors duration-200 ${location.pathname === "/profile-seller" ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}>Store</span>
              </div>
              <FaAngleDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isStoreDropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
            {/* Dropdown for Store */}
            {isStoreDropdownOpen && (
              <div className="mt-2 pl-10">
                <NavLink to="/profile-seller" className={`block py-2 px-4 rounded-md transition-colors duration-200 hover:bg-gray-100 ${location.pathname === "/profile-seller" ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                  Store Profile
                </NavLink>
              </div>
            )}
          </li>

          {/* Product */}
          <li className="relative mb-2">
            <div className="flex items-center justify-between py-3 px-6 cursor-pointer bg-white hover:bg-gray-50 rounded-md shadow-sm" onClick={toggleProductDropdown}>
              <div className="flex items-center">
                <div className="bg-[#F36F45] rounded-full p-2 mr-3">
                  <FaBox className="text-white" size={20} />
                </div>
                <span className={`font-semibold transition-colors duration-200 ${location.pathname === "/my-products" || location.pathname === "/selling-products" ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}>Product</span>
              </div>
              <FaAngleDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProductDropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
            {/* Dropdown for Product */}
            {isProductDropdownOpen && (
              <div className="mt-2 pl-10 space-y-1">
                <NavLink to="/my-products" className={`block py-2 px-4 rounded-md transition-colors duration-200 hover:bg-gray-100 ${location.pathname === "/my-products" ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                  My Products
                </NavLink>
                <NavLink to="/selling-products" className={`block py-2 px-4 rounded-md transition-colors duration-200 hover:bg-gray-100 ${location.pathname === "/selling-products" ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                  Selling Products
                </NavLink>
              </div>
            )}
          </li>

          {/* Order */}
          <li className="relative mb-2">
            <div className="flex items-center justify-between py-3 px-6 cursor-pointer bg-white hover:bg-gray-50 rounded-md shadow-sm" onClick={toggleOrderDropdown}>
              <div className="flex items-center">
                <div className="bg-[#F3456F] rounded-full p-2 mr-3">
                  <FaShoppingCart className="text-white" size={20} />
                </div>
                <span className={`font-semibold transition-colors duration-200 ${location.pathname === "/my-orders" ? "text-gray-800" : "text-gray-500"} hover:text-gray-800`}>Order</span>
              </div>
              <FaAngleDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOrderDropdownOpen ? "rotate-180" : "rotate-0"}`} />
            </div>
            {/* Dropdown for Order */}
            {isOrderDropdownOpen && (
              <div className="mt-2 pl-10">
                <NavLink to="/my-orders" className={`block py-2 px-4 rounded-md transition-colors duration-200 hover:bg-gray-100 ${location.pathname === "/my-orders" ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                  My Order
                </NavLink>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarSeller;
