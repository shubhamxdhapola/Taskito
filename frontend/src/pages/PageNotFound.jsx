import { BiSolidMessageSquareError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
  
  const navigate = useNavigate();

  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <BiSolidMessageSquareError className="w-15 h-15 mx-auto text-gray-900" />
        <h2 className="text-2xl font-bold text-gray-700">
          Error 404 ! <br /> Page Not Found
        </h2>
        <div className="mt-8 mb-14 text-md font-normal text-gray-500 mx-auto md:max-w-sm">
          Oops! It looks like you’ve lost your way.
          <br /> The page you’re looking for doesn’t exist or might have been
          moved..
        </div>
        <button
          className="bg-gray-800 px-4 py-2 text-white rounded-lg cursor-pointer hover:bg-gray-900 duration-300"
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
