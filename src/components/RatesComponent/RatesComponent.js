import React from "react";

export default function RatesComponent(props) {
  let { currencyRateBuy, currencyRateSell } = props.currencyRates;
  const { handleRateClick } = props;

  return (
    <>
      <div className="rates-wrapper">
        <div className="rates-item rates-item-buy">
          <p>BUY</p>
          <div className="rates-item-buy" onClick={(e) => handleRateClick(e)}>
            {currencyRateBuy}
          </div>
        </div>
        <div className="rates-item rates-item-sell">
          <p>SELL</p>
          <div className="rates-item-sell" onClick={(e) => handleRateClick(e)}>
            {currencyRateSell}
          </div>
        </div>
      </div>
    </>
  );
}
