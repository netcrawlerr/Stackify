import { Link } from "react-router-dom";
import warehouse from "../assets/warehouse.png";
import NavBar from "../components/NavBar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-stone-900">
      <NavBar />

      <div className="flex flex-wrap justify-center items-center h-screen p-5 ">
        <div className="w-full lg:w-1/2 flex-col justify-center items-center space-y-5 p-5">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold text-center lg:text-left">
            Welcome to Stackify
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-center lg:text-left">
            Take control of your product management with{" "}
            <span className="text-yellow-700 font-extrabold">Stackify</span>.
            Simplify your processes and enhance your efficiency with our
            intuitive platform designed to help you manage your products
            seamlessly. Start optimizing your workflow today!
          </p>

          <button className="border bg-gray-600 hover:bg-gray-700 text-slate-100 transition-all duration-300 rounded px-5 py-2 text-xl sm:text-xl">
            <Link to="/login">Get Started!</Link>
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={warehouse}
            alt=""
            className="max-w-full h-auto w-3/4 sm:w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
