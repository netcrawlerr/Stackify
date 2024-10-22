import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/images/api.png";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/account/register", {
        email: email,
        userName: username,
        password: password,
      });
      const data = await response.data;
      navigate("/login");

      console.log("Registration status", data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  return (
    <section className="bg-white min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-stone-900"
        >
          {/* <img className="w-8 h-8 mr-2" src={logo} alt="logo" /> */}
          Stackify 💼
        </Link>
        <div className="w-full bg-stone-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-stone-900 md:text-2xl">
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 text-stone-900 rounded-lg block w-full p-2.5 bg-white placeholder-gray-400 focus:outline-none focus:ring "
                  placeholder="Email"
                  required={true}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-300 text-stone-900 rounded-lg block w-full p-2.5 bg-white placeholder-gray-400 focus:outline-none focus:ring "
                  placeholder="Username"
                  required={true}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border border-gray-300 text-stone-900 rounded-lg block w-full p-2.5 bg-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-stone-500"
                  required={true}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-stone-600 hover:bg-stone-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-sm text-stone-900">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-stone-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
