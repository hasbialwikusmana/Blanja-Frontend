import { FaSearch, FaShoppingCart, FaBell, FaEnvelope, FaUser, FaSignOutAlt, FaBars, FaHome } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo/blanja.png";
import Swal from "sweetalert2";
import api from "../../services/Api";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [userRole, setUserRole] = useState("");
  const dropdownRef = useRef(null);
  const myBag = useSelector((state) => state.myBag);

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      if (token) {
        const fetchProfile = async () => {
          try {
            const decodedToken = jwtDecode(token);
            setUserRole(decodedToken.role);
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };

            let profileResponse;
            if (decodedToken.role === "seller") {
              profileResponse = await api.get("/sellers/profile", config);
            } else if (decodedToken.role === "customer") {
              profileResponse = await api.get("/customers/profile", config);
            } else {
              setUserRole("");
            }

            if (profileResponse && profileResponse.data.data.photo) {
              setProfileImage(profileResponse.data.data.photo);
            }
          } catch (error) {
            console.error(error);
          }
        };

        fetchProfile();
      }
    };

    checkUser();
  }, [userRole]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        window.location = "/";
      }
    });
  };

  return (
    <>
      <nav className="bg-white py-4 shadow-md ">
        <div className="flex justify-between items-center w-11/12 md:w-5/6 mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="h-10" />
          </Link>

          {/* Search Input */}
          <div className="relative hidden md:block flex-grow mx-20">
            <input type="text" placeholder="Search..." className="bg-white border px-4 py-2 rounded-full text-gray-700 focus:outline-none w-full pr-12" />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer hover:text-black" />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleDropdown}>
            <FaBars className="text-gray-500" />
          </button>

          {/* Menu for logged in user */}
          <></>
          {isLoggedIn ? (
            <div className="hidden md:flex items-center space-x-4">
              {userRole === "customer" && (
                <>
                  <Link to="/mybag" className="text-slate-500 relative cursor-pointer hover:text-black">
                    <FaShoppingCart className="text-2xl" />

                    {/* Notification Badge */}
                    {myBag.myBag.length > 0 && <div className="absolute -top-3 -right-3   bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">{myBag.myBag.length}</div>}
                  </Link>
                  <Link to="/notification" className="text-slate-500 cursor-pointer hover:text-black">
                    <FaBell className="text-2xl" />
                  </Link>
                  <Link to="/message" className="text-slate-500 cursor-pointer hover:text-black">
                    <FaEnvelope className="text-2xl" />
                  </Link>
                </>
              )}{" "}
              {userRole === "seller" && (
                <>
                  <Link to="/notification" className="text-slate-500 cursor-pointer hover:text-black">
                    <FaBell className="text-2xl" />
                  </Link>
                  <Link to="/message" className="text-slate-500 cursor-pointer hover:text-black">
                    <FaEnvelope className="text-2xl" />
                  </Link>
                </>
              )}
              {/* Dropdown for user profile */}
              <div className="relative" ref={dropdownRef}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-7 h-7 rounded-full object-cover cursor-pointer" onClick={handleProfileClick} />
                ) : (
                  <FaUser className="text-slate-500 text-2xl hover:text-black cursor-pointer" onClick={handleProfileClick} />
                )}
                {showDropdown && (
                  <div className="absolute top-8 right-0 bg-white shadow-md rounded-md z-10" onClick={closeDropdown}>
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-2 hover:bg-gray-100">
                        {userRole === "customer" && (
                          <Link to="/profile" className="block text-gray-700 hover:text-black">
                            <span className="flex items-center space-x-2">
                              <FaUser className="text-slate-500 cursor-pointer hover:text-black" />
                              <span>Profile</span>
                            </span>
                          </Link>
                        )}
                        {userRole === "seller" && (
                          <Link to="/profile-seller" className="block text-gray-700 hover:text-black">
                            <span className="flex items-center space-x-2">
                              <FaUser className="text-slate-500 cursor-pointer hover:text-black" />
                              <span>Profile</span>
                            </span>
                          </Link>
                        )}
                      </li>

                      <li className="px-4 py-2 hover:bg-gray-100">
                        <Link to="#" onClick={handleLogout} className="block text-gray-700 hover:text-black">
                          <span className="flex items-center space-x-2">
                            <FaSignOutAlt className="text-slate-500 cursor-pointer hover:text-black" />
                            <span>Logout</span>
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Jika belum login
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/auth/login">
                <button className="bg-primary text-white px-7 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="bg-outline-primary text-primary border border-primary px-4 py-2 rounded-full focus:outline-none hover:text-white hover:bg-primary">Register</button>
              </Link>
            </div>
          )}

          {/* Dropdown for mobile */}
          {showDropdown && (
            <div className="md:hidden absolute top-20 right-0 bg-white shadow-md rounded-md z-10 w-full">
              <ul className={`md:flex md:items-center md:pb-0 pb-5 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-0 " : "top-[-490px]"}`}>
                <li className="md:ml-8 mr-6 text-xl md:my-0 my-7">
                  <div className="relative">
                    <input type="text" placeholder="Search..." className="bg-white border px-4 py-2 rounded-full text-gray-700 focus:outline-none w-full pr-12" />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 cursor-pointer hover:text-black text-2xl md:text-xl lg:text-lg" />
                  </div>
                </li>

                {isLoggedIn ? (
                  // Jika sudah login
                  <>
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                      <Link to="/" className="text-gray-700 flex items-center hover:text-black">
                        <FaHome className="text-gray-500 mr-2" />
                        <span className="hover:text-black">Home</span>
                      </Link>
                    </li>
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                      <Link to="/mybag" className="text-gray-700 flex items-center hover:text-black">
                        <FaShoppingCart className="text-gray-500 mr-2" />
                        {myBag.myBag.length > 0 && <div className="relative -top-3 right-2 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">{myBag.myBag.length}</div>}
                        <span className="hover:text-black">Cart</span>
                      </Link>
                    </li>
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                      <Link to="/notification" className="text-gray-700 flex items-center hover:text-black">
                        <FaBell className="text-gray-500 mr-2" />
                        <span className="hover:text-black">Notification</span>
                      </Link>
                    </li>
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                      <Link to="/message" className="text-gray-700 flex items-center hover:text-black">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <span className="hover:text-black">Message</span>
                      </Link>
                    </li>
                    {userRole === "customer" && (
                      <li className="md:ml-8 text-xl md:my-0 my-7">
                        <Link to="/profile" className="text-gray-700 flex items-center hover:text-black">
                          <FaUser className="text-gray-500 mr-2" />
                          <span className="hover:text-black">Profile</span>
                        </Link>
                      </li>
                    )}
                    {userRole === "seller" && (
                      <li className="md:ml-8 text-xl md:my-0 my-7">
                        <Link to="/profile-seller" className="text-gray-700 flex items-center hover:text-black">
                          <FaUser className="text-gray-500 mr-2" />
                          <span className="hover:text-black">Profile</span>
                        </Link>
                      </li>
                    )}
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                      <Link to={handleLogout} className="text-gray-700 flex items-center hover:text-black">
                        <FaSignOutAlt className="text-gray-500 mr-2" />
                        <span className="hover:text-black">Logout</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  // Jika belum login
                  <>
                    <li className="md:ml-8 text-xl md:my-0 my-7">
                      <Link to="/auth/login">
                        <button className="bg-primary text-white px-6 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary">Login</button>
                      </Link>
                      <Link to="/auth/register" className="ml-2">
                        <button className="bg-outline-primary text-primary border border-primary px-4 py-2 rounded-full focus:outline-none hover:text-white hover:bg-primary">Register</button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
