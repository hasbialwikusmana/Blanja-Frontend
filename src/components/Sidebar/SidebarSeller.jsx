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
    <div className="w-2/5 bg-white shadow-md min-h-screen">
      <div className="mt-8 flex flex-col items-center">
        {/* Profile Image and Name */}
        <div className="flex items-center mb-10 ml-14">
          <img src={profileImage || profile} alt="Profile Image" className="w-20 h-20 rounded-full mr-2" />
          <div>
            <h1 className="text-xl font-bold mb-1">{name}</h1>
            <a href="#" className="flex items-center text-gray-400 text-left">
              <FaPencil className="mr-2" /> Edit Profile
            </a>
          </div>
        </div>
        {/* Sidebar Navigation */}
        <ul>
          {/* Store */}
          <li className="relative" style={{ marginBottom: isStoreDropdownOpen ? "30px" : "0" }}>
            <div className="flex items-center justify-between py-4 px-6 cursor-pointer" onClick={toggleStoreDropdown}>
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-full p-1 mr-2">
                  <FaHome className="text-white" size={22} />
                </div>
                <span className={`font-semibold ${location.pathname === "/profile-seller" ? "text-[#222222]" : "text-[#9B9B9B]"} hover:text-[#222222] mr-24`}>Store</span>
              </div>
              <FaAngleDown className="w-4 h-4 text-gray-500 transition-transform transform" style={{ transform: isStoreDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            {/* Dropdown untuk Store */}
            {isStoreDropdownOpen && (
              <div className="absolute ml-10 -mt-2 z-10">
                <NavLink to="/profile-seller" className={`block py-2 px-6 text-sm hover:bg-gray-100 ${location.pathname === "/profile-seller" ? "text-black font-medium" : "text-gray-800"}`}>
                  Store Profile
                </NavLink>
              </div>
            )}
          </li>
          {/* Product */}
          <li className="relative" style={{ marginBottom: isProductDropdownOpen ? "60px" : "0" }}>
            <div className="flex items-center justify-between py-4 px-6 cursor-pointer" onClick={toggleProductDropdown}>
              <div className="flex items-center">
                <div className="bg-[#F36F45] rounded-full p-1 mr-2">
                  <FaBox className="text-white" size={22} />
                </div>
                <span className={`font-semibold ${location.pathname === "/my-products" || location.pathname === "/selling-products" ? "text-[#222222]" : "text-[#9B9B9B]"} hover:text-[#222222]`}>Product</span>
              </div>
              <FaAngleDown className="w-4 h-4 text-gray-500 transition-transform transform" style={{ transform: isProductDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            {/* Dropdown untuk Product */}
            {isProductDropdownOpen && (
              <div className="absolute ml-10 -mt-2 z-10">
                <NavLink to="/my-products" className={`block py-2 px-6 text-sm hover:bg-gray-100 ${location.pathname === "/my-products" ? "text-black font-medium" : "text-gray-800"}`}>
                  My Products
                </NavLink>
                <NavLink to="/selling-products" className={`block py-2 px-6 text-sm hover:bg-gray-100 ${location.pathname === "/selling-products" ? "text-black font-medium" : "text-gray-800"}`}>
                  Selling Products
                </NavLink>
              </div>
            )}
          </li>
          {/* Order */}
          <li className="relative" style={{ marginBottom: isOrderDropdownOpen ? "60px" : "0" }}>
            <div className="flex items-center justify-between py-4 px-6 cursor-pointer" onClick={toggleOrderDropdown}>
              <div className="flex items-center">
                <div className="bg-[#F3456F] rounded-full p-1 mr-2">
                  <FaShoppingCart className="text-white" size={22} />
                </div>
                <span className={`font-semibold ${location.pathname === "/my-orders" ? "text-[#222222]" : "text-[#9B9B9B]"} hover:text-[#222222]`}>Order</span>
              </div>
              <FaAngleDown className="w-4 h-4 text-gray-500 transition-transform transform" style={{ transform: isOrderDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>
            {/* Dropdown untuk Order */}
            {isOrderDropdownOpen && (
              <div className="absolute ml-10 -mt-2 z-10">
                <NavLink to="/my-orders" className={`block py-2 px-6 text-sm hover:bg-gray-100 ${location.pathname === "/my-orders" ? "text-black font-medium" : "text-gray-800"}`}>
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
