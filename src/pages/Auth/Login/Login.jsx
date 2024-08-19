import { useEffect, useState } from "react";
import logo from "../../../assets/img/logo/blanja.png";
import { useNavigate } from "react-router-dom";
import api from "../../../services/Api";
import Swal from "sweetalert2";

const Login = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formLogin);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);

      Swal.fire({
        icon: "success",
        title: "Login Success!",
        text: "You have successfully logged in!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded shadow-sm px-6 py-8">
        <div>
          <img className="mx-auto h-12 w-auto" src={logo} alt="Logo" />
          <p className="mt-4 text-center text-base font-extrabold text-gray-900">Please login with your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formLogin.email}
                onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formLogin.password}
                onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end mb-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-hoverPrimary">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Login
              </button>
            </div>
          </div>
        </form>
        <div>
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/auth/register" className="font-medium text-primary hover:text-hoverPrimary">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
