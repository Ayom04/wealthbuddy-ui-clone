import axios from "axios";
import { useState } from "react";
import { APP_LINK } from "../../services/api";
import { AppLink } from "../../router/applink";

const ResendOtp = () => {
  const [email, setEmail] = useState("");
  const handleResendOtp = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const email = localStorage.getItem("email");
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}${
          APP_LINK.RESENDOTP
        }/${email}`,
      });

      if (response.data.status === false)
        throw new Error(response.data.message);

      alert(response.data.message);
      redirect(AppLink.verify_otp.path);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || "Sorry something went wrong");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5 ">
      <fieldset className="">
        <label className="block text-xs mb-2" htmlFor="">
          Email
        </label>
        <input
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="saba@gamil.com"
          className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
        ></input>
      </fieldset>
      <button
        className="text-[1.5rem] text-center text-white font-semibold w-[9rem] bg-[#99bf38] rounded-lg py-2"
        onClick={handleResendOtp}
      >
        Resend
      </button>
    </div>
  );
};

export default ResendOtp;
