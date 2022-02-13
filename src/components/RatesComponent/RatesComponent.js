import React from "react";

export default function RatesComponent(props) {
  let { currencyRateBuy, currencyRateSell } = props.currencyRates;
  const { handleRateClick } = props;

  return (
    <>
      <div className="rates-wrapper">
        <div className="rates-item buy-item">
          <p>BUY</p>
          <div
            className="rates-item-price buy-item"
            onClick={(e) => handleRateClick(e)}
          >
            {currencyRateBuy}
          </div>
        </div>
        <div className="rates-item sell-item ">
          <p>SELL</p>
          <div
            className="rates-item-price sell-item"
            onClick={(e) => handleRateClick(e)}
          >
            {currencyRateSell}
          </div>
        </div>
      </div>
    </>
  );
}
