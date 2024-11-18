import { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { APP_LINK } from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppLink } from "../../router/applink";
const Register = () => {
  const redirect = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    referral_code: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      localStorage.setItem("email", formData.email);
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}${APP_LINK.SIGNUP}`,
        data: formData,
      });
      console.log("response", response.data.message);
      alert(response.data.message);
      redirect(AppLink.verify_otp.path);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || "Sorry something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center  flex-col">
      <div className="text-center space-y-2 flex flex-col items-center bg-white fadeIn login-fieldset onboarding-wrap auth-modal">
        <div className="flex justify-center">
          <img src={Logo} alt="" />
        </div>
        <h1 className="text-2xl">Sign Up</h1>
        <p>Well get you set up in less than one minute</p>
      </div>
      <form action="">
        <div className="flex flex-col gap-y-3 mt-[3rem] ">
          <fieldset className="">
            <label className="block text-xs mb-2" htmlFor="">
              FIrst Name
            </label>
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              type="text"
              placeholder="Musa"
              className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
            ></input>
          </fieldset>

          <fieldset className="">
            <label className="block text-xs mb-2" htmlFor="">
              Last Name
            </label>
            <input
              required
              name="othernames"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              type="text"
              placeholder="Musa"
              className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
            />
          </fieldset>
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
              placeholder="musa32@gmail.com"
              className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
            />
          </fieldset>
          <fieldset className="">
            <label className="block text-xs mb-2" htmlFor="">
              Phone Number
            </label>
            <input
              required
              name="email"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              type="text"
              placeholder="06027384848"
              className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
            />
          </fieldset>
          <fieldset className="">
            <label className="block text-xs mb-2" htmlFor="">
              Referral code
            </label>
            <input
              name="email"
              value={formData.referral_code}
              onChange={(e) =>
                setFormData({ ...formData, referral_code: e.target.value })
              }
              type="text"
              placeholder="iy7787"
              className="w-[35rem]  rounded-lg p-[.5rem] outline-none border border-gray-700 "
            />
          </fieldset>
          <fieldset className="mb-5">
            <label className="inline-flex items-center mt-3">
              <input name="agreement" type="checkbox" value="true" />
              <span className="ml-2 text-gray-700 text-sm">
                I agree with the{" "}
                <a
                  rel="noreferrer"
                  href="https://wealthbuddy.ng/terms_conditions"
                  target="_blank"
                  className="text-green-500"
                >
                  terms and condition
                </a>
              </span>
            </label>
          </fieldset>
          <button
            type="submit"
            className="mt-6 w-40 text-center text-white  rounded-lg bg-[#99bf38]  mx-auto py-4 border border-amber-800 "
            disabled=""
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </form>
      <div>
        <div className="mt-8 ">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a className="text-wb-primary" href="/auth/login">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
