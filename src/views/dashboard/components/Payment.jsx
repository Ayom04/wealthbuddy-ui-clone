import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useAsyncError, useNavigate } from "react-router-dom";
import { APP_LINK } from "../../../services/api";
import { AppLink } from "../../../router/applink";
import axios from "axios";

const Payment = ({ email }) => {
  const redirect = useNavigate();
  const [payment, setPayment] = useState({
    amount: "",
  });

  const payWithPaystack = async (e) => {
    e.preventDefault();
    let Paystack = new PaystackPop();
    console.log("crt", email);
    Paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_KEY,
      email: email,
      amount: payment.amount * 100,

      onSuccess(transaction) {
        const userToken = localStorage.getItem("token");
        try {
          const response = axios({
            method: "POST",
            url: `${import.meta.env.VITE_API_BASE_URL}${
              APP_LINK.COMPLETEPAYMENT
            }`,
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            data: { reference: transaction.reference },
          }).then((result) => {
            console.log(result);
            if (result.data.status === false)
              throw new Error(response.data.message);
          });
          if (response.data.status !== true)
            throw new Error(response.data.message);
          let message = `Transaction successful with refrence ${transaction.reference}`;
          alert(message);

          redirect(AppLink.dashboard.path);
        } catch (error) {
          console.log(error);
          alert(error.response.data.message);
        }
      },

      onCancel() {
        alert("Transaction cancelled");
        redirect(AppLink.dashboard.path);
      },
    });
  };
  return (
    <div>
      <form
        onSubmit={payWithPaystack}
        className="flex flex-col gap-5 items-center justify-center h-[100vh]"
      >
        {/* <p>{`here ${email}`}</p> */}
        {/* <div className="flex flex-col items-start gap-2">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={payment.email}
            onChange={(e) => setPayment({ ...payment, email: e.target.value })}
            className="p-4 bg-g#99bf38 w-96"
          />
        </div> */}
        <div className="flex flex-col items-start gap-2">
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            placeholder="Enter your amount"
            value={payment.amount}
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
            className="p-4 bg-[#99bf38] w-96"
          />
        </div>
        <div>
          <button
            className="p-4 bg-[#99bf38] rounded-md text-white"
            type="submit"
            // onClick={payWithPaystack}
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
