import { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { APP_LINK } from "../../services/api";
import { AppLink } from "../../router/applink";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddPassword = () => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    comfirmPassword: "",
  });
  const handlePasswordSubmit = async (e) => {
    try {
      const email = localStorage.getItem("email");
      e.preventDefault();
      console.log(formData, email);

      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_API_BASE_URL}${APP_LINK.ADDPASSWORD}`,
        data: { ...formData, email: email },
      });

      if (response.data.status === false)
        throw new Error(response.data.message);
      console.log(response);
      alert(response.data.message);
      redirect(AppLink.login.path);
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
        <h1>Set Password</h1>
        <p>
          Enter a password that will be easy for you and difficult for others to
          remember
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
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
            placeholder="Enter your password"
            className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
          ></input>
        </fieldset>
        <fieldset className="">
          <label className="block text-xs mb-2" htmlFor="">
            Comfirm Password
          </label>
          <input
            required
            name="comfirmPassword"
            value={formData.comfirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, comfirmPassword: e.target.value })
            }
            type="password"
            placeholder="Enter the password entered above"
            className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
          ></input>
        </fieldset>
        <button
          type="button"
          className="text-[1.5rem] text-center text-white font-semibold w-[9rem] bg-[#99bf38] rounded-lg py-2"
          onClick={handlePasswordSubmit}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddPassword;
