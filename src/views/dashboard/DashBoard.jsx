import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APP_LINK } from "../../services/api";
import Balance from "./components/Balance";
import Payment from "./components/Payment";
const DashBoard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState({
    saving: 0.0,
    returns: 0.0,
    investment: 0.0,
    wallet: 0.0,
    net_asset_naira: 0.0,
    net_asset_dollar: 0.0,
  });
  const redirect = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      redirect("/auth/login");
    }

    try {
      axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}${APP_LINK.GETPROFILE}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((result) => {
        if (result.data.status === false) throw new Error(result.data.message);
        setName(`${result.data.data.firstName} ${result.data.data.lastName}`);
        setEmail(result.data.data.email);
      });
      axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}${APP_LINK.GETBALANCE}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then((result) => {
        // console.log(result.data.data);
        // if (result.data.status === false)
        //   throw new Error(response.data.message);
        setWallet({
          ...wallet,
          saving: result.data.data.savings,
          returns: result.data.data.returns,
          investment: result.data.data.investments,
          wallet: result.data.data.wallet_balance,
          net_asset_naira: result.data.data.net_asset,
          net_asset_dollar: result.data.data.net_asset * 987,
        });
        console.log(result.data.data);
      });
    } catch (e) {
      alert(e.response.data.message || "Sorry something went wrong");
    }
  }, []);
  return (
    <div className=" flex gap-10 ">
      <div>
        <Navbar name={name} />
      </div>
      <div>
        <h1 className="border border-b-lime-400">Overview</h1>
        <div className="flex justify-center items-center gap-10">
          <Balance
            saving={wallet.saving.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            returns={wallet.returns.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            investment={wallet.investment.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            wallet={wallet.wallet.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            net_asset_naira={wallet.net_asset_naira.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            net_asset_dollar={wallet.net_asset_dollar.toLocaleString(
              undefined,
              { minimumFractionDigits: 2 }
            )}
          />
          <Payment email={email} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
