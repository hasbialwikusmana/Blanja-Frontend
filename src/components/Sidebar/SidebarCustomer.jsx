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
    <div className="w-2/5 top-16 left-0  bg-white shadow-md  mt-16 ">
      <div className="mt-8 flex flex-col items-center">
        {/* Profile Image and Name */}
        <div className="flex items-center mb-12 ml-16">
          <img src={profileImage || defaultProfile} alt="Profile Image" className="w-24 h-24 rounded-full mr-4 shadow-lg object-cover" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">{name}</h1>
            <div className="flex items-center text-gray-400">
              <FaPencil className="mr-2" /> Edit Profile
            </div>
          </div>
        </div>
        {/* Sidebar Navigation */}
        <ul className="w-full lg:w-1/2 px-4 lg:px-0">
          <li className="relative mb-2">
            <div className="flex items-center justify-between py-3 px-6 cursor-pointer bg-white hover:bg-gray-50 rounded-md shadow-sm">
              <NavLink to="/profile" className={`flex items-center ${isActive("/profile") ? "text-[#222222]" : "text-[#9B9B9B]"} font-semibold hover:text-[#222222]`}>
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-full p-2 mr-3">
                    <FaUser className="text-white" size={20} />
                  </div>
                  My Profile
                </div>
              </NavLink>
            </div>
          </li>
          <li className="relative mb-2">
            <div className="flex items-center justify-between py-3 px-6 cursor-pointer bg-white hover:bg-gray-50 rounded-md shadow-sm">
              <NavLink to="/shipping-address" className={`flex items-center ${isActive("/shipping-address") ? "text-[#222222]" : "text-[#9B9B9B]"} font-semibold hover:text-[#222222]`}>
                <div className="flex items-center">
                  <div className="bg-[#F36F45] rounded-full p-2 mr-3">
                    <FaMapMarkerAlt className="text-white" size={20} />
                  </div>
                  Shipping Address
                </div>
              </NavLink>
            </div>
          </li>
          <li className="relative mb-2">
            <div className="flex items-center justify-between py-3 px-6 cursor-pointer bg-white hover:bg-gray-50 rounded-md shadow-sm">
              <NavLink to="/my-order" className={`flex items-center ${isActive("/my-order") ? "text-[#222222]" : "text-[#9B9B9B]"} font-semibold hover:text-[#222222]`}>
                <div className="flex items-center">
                  <div className="bg-[#F3456F] rounded-full p-2 mr-3">
                    <FaFileAlt className="text-white" size={20} />
                  </div>
                  My Order
                </div>
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarCustomer;
