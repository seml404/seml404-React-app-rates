import React from "react";

export default function RatesComponent(props) {
  let { buyRate, sellRate } = props;

  return (
    <>
      <div className="rates-wrapper">
        <div className="rates-item rates-item-buy">
          <p>BUY</p>
          <div>{buyRate}</div>
        </div>
        <div className="rates-item rates-item-sell">
          <p>SELL</p>
          <div>{sellRate}</div>
        </div>
      </div>
    </>
  );
}
