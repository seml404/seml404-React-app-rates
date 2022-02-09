import React, { useEffect, useState } from "react";
import RatesComponent from "../RatesComponent/RatesComponent";

function App(props) {
  let initialRates = [
    {
      currencyId: 1,
      currencyName: "USD",
      currencyRateBuy: Math.random() * 110,
      currencyRateSell: Math.random() * 120,
    },
    {
      currencyId: 2,
      currencyName: "CAD",
      currencyRateBuy: Math.random() * 120,
      currencyRateSell: Math.random() * 130,
    },
    {
      currencyId: 3,
      currencyName: "RUB",
      currencyRateBuy: Math.random() * 100,
      currencyRateSell: Math.random() * 110,
    },
    {
      currencyId: 4,
      currencyName: "GBP",
      currencyRateBuy: Math.random() * 130,
      currencyRateSell: Math.random() * 140,
    },
  ];
  let [currencyRates, setCurrencyRates] = useState(initialRates);
  let [time, setTime] = useState(renderTime());
  let [currencyChoosen, setCurrencyChoosen] = useState(renderTime());

  function renderTime() {
    let today = new Date();
    return today.toLocaleTimeString();
  }

  function defineCurrencyRates() {
    return [
      {
        currencyId: 1,
        currencyName: "USD",
        currencyRateBuy: Math.random() * 110,
        currencyRateSell: Math.random() * 120,
      },
      {
        currencyId: 2,
        currencyName: "CAD",
        currencyRateBuy: Math.random() * 120,
        currencyRateSell: Math.random() * 130,
      },
      {
        currencyId: 3,
        currencyName: "RUB",
        currencyRateBuy: Math.random() * 100,
        currencyRateSell: Math.random() * 110,
      },
      {
        currencyId: 4,
        currencyName: "GBP",
        currencyRateBuy: Math.random() * 130,
        currencyRateSell: Math.random() * 140,
      },
    ];
  }

  useEffect(() => {
    setInterval(() => {
      setTime(renderTime());
    }, 1000);
    setInterval(() => {
      setCurrencyRates(defineCurrencyRates());
    }, 6000);
  }, [props]);

  function renderCurrencyOptions() {
    let pairs = [
      { pairId: 1, pairName: "USD/CAD", type: "TOM" },
      { pairId: 2, pairName: "USD/CAD", type: "SPOT" },
      { pairId: 3, pairName: "USD/RUB", type: "TOM" },
      { pairId: 4, pairName: "USD/RUB", type: "SPOT" },
      { pairId: 5, pairName: "GBP/USD", type: "TOM" },
      { pairId: 6, pairName: "GBP/USD", type: "SPOT" },
    ];
    pairs = pairs.map((item) => {
      return (
        <option key={item.pairName + item.type} id={"pairId" + item.pairId}>
          {item.pairName + "_" + item.type}
        </option>
      );
    });
    return pairs;
  }

  function handleCurrencyChoose(e) {
    console.log(e);
  }
  function handleShowInfo(e) {
    console.log(currencyRates);
  }

  return (
    <div className="App">
      <button onClick={handleShowInfo}></button>
      <div className="tabs">
        <div className="tab">
          <input type="radio" id="tab1" name="tab-group" defaultChecked></input>
          <label htmlFor="tab1" className="tab-title">
            Вкладка 1
          </label>
          <section className="tab-content">
            <div>{time}</div>
            <select
              value={currencyChoosen}
              onChange={(e) => handleCurrencyChoose(e)}
            >
              {renderCurrencyOptions()}
            </select>
            <RatesComponent></RatesComponent>
          </section>
        </div>
        <div className="tab">
          <input type="radio" id="tab2" name="tab-group"></input>
          <label htmlFor="tab2" className="tab-title">
            Вкладка 2
          </label>
          <section className="tab-content">Два</section>
        </div>
      </div>
    </div>
  );
}

export default App;
