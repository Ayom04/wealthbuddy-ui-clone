import { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { AppLink } from "../../router/applink";
import { APP_LINK } from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);

      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}${APP_LINK.LOGIN}`,
        data: formData,
      });

      if (response.data.status === false)
        throw new Error(response.data.message);
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      redirect(AppLink.dashboard.path);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || "Sorry something went wrong");
    }
  };
  return (
    <div className="h-screen flex-col justify-center items-center flex gap-5">
      <div className="text-center space-y-2">
        <div className="rounded-full flex justify-center items-center">
          <img src={Logo} alt="" />
        </div>
        {/* <h1>Set Password</h1>
        <p>
          Enter a password that will be easy for you and difficult for others to
          remember
        </p> */}
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <fieldset className="">
          <label className="block text-xs mb-2" htmlFor="">
            Email
          </label>
          <input
            required
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            placeholder="Enter your email"
            className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
          ></input>
        </fieldset>
        <fieldset className="">
          <label className="block text-xs mb-2" htmlFor="">
            Password
          </label>
          <input
            required
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            placeholder="Enter the password entered above"
            className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
          ></input>
        </fieldset>
        <button
          type="button"
          className="text-[1.5rem] text-center text-white font-semibold w-[9rem] bg-[#99bf38] rounded-lg py-2"
          onClick={handleLogin}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Login;
