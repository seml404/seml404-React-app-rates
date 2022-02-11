import React from "react";

export default function RatesComponent(props) {
  let { currencyRateBuy, currencyRateSell } = props.currencyRates;
  const { handleRateClick } = props;

  return (
    <>
      <div className="rates-wrapper">
        <div className="rates-item rates-item-buy">
          <p>BUY</p>
          <div onClick={() => handleRateClick()}>{currencyRateBuy}</div>
        </div>
        <div className="rates-item rates-item-sell">
          <p>SELL</p>
          <div onClick={() => handleRateClick()}>{currencyRateSell}</div>
        </div>
      </div>
    </>
  );
}
