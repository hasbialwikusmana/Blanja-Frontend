import { useState, useEffect } from "react";
import { FaFileAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import api from "../../services/Api";
import Swal from "sweetalert2";
import defaultProfile from "../../assets/img/profile/1.png";

function SidebarCustomer() {
  const location = useLocation();
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const customerResponse = await api.get("/customers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = customerResponse.data.data;

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

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full lg:w-1/3 bg-white shadow-md lg:min-h-screen lg:h-auto lg:sticky lg:top-0">
      <div className="mt-8 flex flex-col items-center">
        {/* Profile Image and Name */}
        <div className="flex items-center mb-10">
          <img src={profileImage || defaultProfile} alt="Profile Image" className="w-20 h-20 rounded-full mr-2" />
          <div>
            <h1 className="text-xl font-bold mb-1">{name} </h1>
            <a href="#" className="flex items-center text-gray-400 text-left">
              <FaPencil className="mr-2" /> Edit Profile
            </a>
          </div>
        </div>
        {/* Sidebar Navigation */}
        <ul className="w-full lg:w-1/2 px-4 lg:px-0">
          <li className="py-4">
            <NavLink to="/profile" className={`flex items-center ${isActive("/profile") ? "text-[#222222]" : "text-[#9B9B9B]"} font-semibold hover:text-[#222222]`}>
              <div className="bg-blue-500 rounded-full p-1 mr-2">
                <FaUser className="text-white" size={22} />
              </div>
              My Profile
            </NavLink>
          </li>
          <li className="py-4">
            <NavLink to="/shipping-address" className={`flex items-center ${isActive("/shipping-address") ? "text-[#222222]" : "text-[#9B9B9B]"} font-semibold hover:text-[#222222]`}>
              <div className="bg-[#F36F45] rounded-full p-1 mr-2">
                <FaMapMarkerAlt className="text-white" size={22} />
              </div>
              Shipping Address
            </NavLink>
          </li>
          <li className="py-4">
            <NavLink to="/my-order" className={`flex items-center ${isActive("/my-order") ? "text-[#222222]" : "text-[#9B9B9B]"} font-semibold hover:text-[#222222]`}>
              <div className="bg-[#F3456F] rounded-full p-1 mr-2">
                <FaFileAlt className="text-white" size={22} />
              </div>
              My Order
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarCustomer;
