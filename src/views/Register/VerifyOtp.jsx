import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_LINK } from "../../services/api";
import Logo from "../../assets/images/logo.svg";
import ReactCodeInput from "react-code-input";
import axios from "axios";
import { AppLink } from "../../router/applink";
const VerifyOtp = () => {
  const redirect = useNavigate();
  const [otp, setOtp] = useState("");
  const handleOtpChange = (_otp) => {
    setOtp(_otp);
  };
  const handleOtpSubmit = async () => {
    const getCustomerEmail = localStorage.getItem("email");
    try {
      const response = await axios({
        method: "patch",
        url: `${import.meta.env.VITE_API_BASE_URL}${
          APP_LINK.VERIFYOTP
        }/${getCustomerEmail}/${otp}`,
      });

      if (response.data.status === false)
        throw new Error(response.data.message);

      alert(response.data.message);
      redirect(AppLink.add_password.path);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || "Sorry something went wrong");
    }
  };
  return (
    <div className="flex flex-col  items-center h-screen justify-center  ">
      <div className="text-center space-y-5">
        <div className="rounded-full flex justify-center items-center">
          <img src={Logo} alt="" />
        </div>
        <h1>Comfirm your email address</h1>
        <p>We sent a 6 digit code to you, please enter it below</p>
      </div>
      <div className=" flex flex-col justify-center items-center bg-polygon bg-no-repeat bg-left-bottom space-y-5 mt-5">
        <ReactCodeInput
          type="text"
          value={otp}
          onChange={handleOtpChange}
          fields={6}
        />

        <button
          onClick={handleOtpSubmit}
          className="text-[1.5rem] text-center text-white font-semibold w-[9rem] bg-[#99bf38] rounded-lg py-2 "
        >
          Comfirm
        </button>
        <p>
          Did not receive an email{" "}
          <button className="text-[#99bf38]">
            <Link to={AppLink.resend_otp.path}>Resend token</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
