import { useEffect, useState } from "react";
import logo from "../../../assets/img/logo/blanja.png";
import api from "../../../services/Api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [activeTab, setActiveTab] = useState("customer");
  const [registerCustomer, setRegisterCustomer] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerSeller, setRegisterSeller] = useState({
    name: "",
    email: "",
    phone: "",
    store_name: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChangeCustomer = (e) => {
    setRegisterCustomer({
      ...registerCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSeller = (e) => {
    setRegisterSeller({
      ...registerSeller,
      [e.target.name]: e.target.value,
    });
  };

  const handleCustomerRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers/register", registerCustomer);
      Swal.fire({
        icon: "success",
        title: "Register Success!",
        text: "You have successfully registered!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/auth/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: error.response.data.message,
      });
    }
  };

  const handleSellerRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/sellers/register", registerSeller);
      Swal.fire({
        icon: "success",
        title: "Register Success!",
        text: "You have successfully registered!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/auth/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded shadow-sm px-6 py-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
          <p className="mt-4 text-center text-base font-extrabold text-gray-900">Please register with your account</p>
        </div>
        <div className="mb-8">
          <nav className="flex justify-center" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("customer")}
              className={`${activeTab === "customer" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"} 
      w-full sm:w-1/3 py-2 px-4 text-center border-r-0 sm:border-r rounded-l-md border border-gray-200 focus:outline-none`}
            >
              Customer
            </button>
            <button
              onClick={() => setActiveTab("seller")}
              className={`${activeTab === "seller" ? "bg-primary text-white" : "text-gray-500 hover:text-gray-700"} 
      w-full sm:w-1/3 py-2 px-4 text-center rounded-r-md border-l-0 sm:border-l border border-gray-200 focus:outline-none`}
            >
              Seller
            </button>
          </nav>
        </div>
        <form className="mt-8 space-y-6" onSubmit={activeTab === "customer" ? handleCustomerRegister : handleSellerRegister}>
          {activeTab === "customer" && (
            <div>
              <div className="mb-4">
                <label htmlFor="customerName" className="sr-only">
                  Name
                </label>
                <input
                  id="customerName"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={registerCustomer.name}
                  onChange={handleChangeCustomer}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="customerEmail" className="sr-only">
                  Email address
                </label>
                <input
                  id="customerEmail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={registerCustomer.email}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="customerPassword" className="sr-only">
                  Password
                </label>
                <input
                  id="customerPassword"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={registerCustomer.password}
                  onChange={handleChangeCustomer}
                />
              </div>
            </div>
          )}
          {activeTab === "seller" && (
            <div>
              <div className="mb-4">
                <label htmlFor="sellerName" className="sr-only">
                  Name
                </label>
                <input
                  id="sellerName"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={registerSeller.name}
                  onChange={handleChangeSeller}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sellerEmail" className="sr-only">
                  Email address
                </label>
                <input
                  id="sellerEmail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={registerSeller.email}
                  onChange={handleChangeSeller}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="sellerPhone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="sellerPhone"
                  name="phone"
                  type="number"
                  autoComplete="phone"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  value={registerSeller.phone}
                  onChange={handleChangeSeller}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="storeName" className="sr-only">
                  Store Name
                </label>
                <input
                  id="storeName"
                  name="store_name"
                  type="text"
                  autoComplete="store_name"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Store Name"
                  value={registerSeller.store_name}
                  onChange={handleChangeSeller}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="sellerPassword" className="sr-only">
                  Password
                </label>
                <input
                  id="sellerPassword"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={registerSeller.password}
                  onChange={handleChangeSeller}
                />
              </div>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Register
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="font-medium text-primary hover:text-hoverPrimary">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
