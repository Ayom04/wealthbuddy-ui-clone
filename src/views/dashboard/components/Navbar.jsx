import Logo from "../../../assets/images/logo.svg";

const Navbar = () => {
  return (
    <div className="bg-[#99bf38] h-screen w-[20%] flex flex-col items-center justify-between pt-10 px-4 text-xl">
      <div>
        <div className="flex items-center justify-center">
          <img src={Logo} alt="" />
        </div>
        <p>Abdullah Saba</p>
      </div>
      <div className="space-y-7">
        <div>Dashboard</div>
        <div>Savings</div>
        <div>Investment</div>
        <div>Wallet and billings</div>
        <div>Settings</div>
      </div>
      <div className="space-y-3">
        <div>Legal</div>
        <div>Sign out</div>
        <div className="flex gap-2 pb-3">
          <span className="">
            <img src={Logo} alt="" width={30} />
          </span>
          <p>Wealth buddy</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
