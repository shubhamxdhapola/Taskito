import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import toast from "react-hot-toast";
import { validateLoginForm } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isFormOkay = validateLoginForm(formData.email, formData.password);
    if (isFormOkay === true) {
      dispatch(login(formData))
        .unwrap()
        .then((res) => {
          if (res.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
          toast.success("Logged in successfully!");
          setFormData(initialFormData);
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center mx-auto">
        <h3 className="text-lg md:text-xl font-semibold text-black text-center sm:text-left">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-8 sm:mb-6 text-center sm:text-left">
          Please enter your details to login
        </p>

        <form onSubmit={handleOnSubmit}>
          <Input
            value={formData.email}
            onChange={handleOnChange}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            name="email"
          />
          <Input
            value={formData.password}
            onChange={handleOnChange}
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
          />

          <button
            className={`btn-primary ${
              loading && "!cursor-not-allowed !bg-blue-400 hover:!text-neutral-50"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 size={20} className="animate-spin" />{" "}
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
        <p className="text-[12px] sm:text-[13px] text-slate-800 mt-3 text-center sm:text-left">
          Don't have an account?{" "}
          <Link className="underline text-primary" to="/signup">
            SignUp
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
