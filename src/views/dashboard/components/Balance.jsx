const Balance = ({
  saving,
  returns,
  investment,
  wallet,
  net_asset_naira,
  net_asset_dollar,
}) => {
  return (
    <div className="w-[336px] h-[225px] rounded-lg shadow-2xl grid grid-cols-2 pt-[10px] pl-[10px] pr-[21px] mt-10">
      <div>
        <p>Net assets(#)</p>
        <p>{net_asset_naira}</p>
      </div>
      <div>
        <p>Net assets($)</p>
        <p>{net_asset_dollar}</p>
      </div>
      <div>
        <p>Wallet</p>
        <p>{wallet}</p>
      </div>
      <div>
        <p>Returns</p>
        <p>{returns}</p>
      </div>
      <div>
        <p>Savings</p>
        <p>{saving}</p>
      </div>
      <div>
        <p>Investment</p>
        <p>{investment}</p>
      </div>
    </div>
  );
};
export default Balance;
