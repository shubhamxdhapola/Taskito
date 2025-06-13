import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateSignUpForm } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/authSlice";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const initialFormData = {
    name: "",
    email: "",
    profileImageUrl: null,
    password: "",
    adminInviteToken: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { uploading } = useSelector((state) => state.upload);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const isFormOkay = validateSignUpForm(
      formData.name,
      formData.email,
      formData.password,
      formData.adminInviteToken
    );
    if (isFormOkay === true) {
      dispatch(signup(formData))
        .unwrap()
        .then((res) => {
          if (res.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
          toast.success("Registered successfully");
          setFormData(initialFormData);
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <AuthLayout>
      <div className=" h-auto flex flex-col justify-center card">
        <h3 className=" sm:text-lg font-semibold text-black text-center sm:text-left ">
          Create an Account
        </h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-8 sm:mb-6 text-center sm:text-left">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleOnSubmit}>
          <ProfilePhotoSelector setFormData={setFormData} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={formData.name}
              onChange={handleOnChange}
              label="Full Name"
              placeholder="John Doe"
              type="text"
              name="name"
            />
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
              placeholder="Create a password"
              type="password"
              name="password"
            />
            <Input
              value={formData.adminInviteToken}
              onChange={handleOnChange}
              label="Admin Invite Token"
              placeholder="6 Digits Code"
              type="text"
              name="adminInviteToken"
            />
          </div>
          <button
            className={`btn-primary ${
              (loading || uploading) &&
              "!bg-blue-400 !cursor-not-allowed hover:!text-neutral-50"
            }`}
            type="submit"
            disabled={uploading || loading}
          >
            {uploading ? (
              <div className="flex justify-center items-center gap-2">
                <span>Uploading image...</span>
              </div>
            ) : loading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 size={20} className="animate-spin" />{" "}
              </div>
            ) : (
              "SIGN UP"
            )}
          </button>
        </form>
        <p className="text-sm text-slate-800 mt-3 text-center sm:text-left">
          Already have an account?{" "}
          <Link className="underline text-primary" to="/login">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
