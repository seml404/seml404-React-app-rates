import React, { useEffect, useMemo, useState } from "react";
import RatesComponent from "../RatesComponent/RatesComponent";
import { connect } from "react-redux";
import { toggleShowOrderWindow } from "../../store/actions";
import OrderWindow from "../OrderWindow/OrderWindow";
import ArchiveComponent from "../ArchiveComponent/ArchiveComponent";

function App(props) {
  let { showOrderWindow, toggleShowOrderWindow } = props;
  let [currencyRates, setCurrencyRates] = useState(defineCurrencyRates());
  let [time, setTime] = useState(renderTime());
  let [currencyPairChoosen, setCurrencyPairChoosen] = useState("USD/CAD_TOM");
  let [currencyPairRates, setCurrencyPairRates] = useState(
    defineCurrencyPairRates("USD/CAD")
  );
  let [mainDealDetails, setMainDealDetails] = useState();

  function renderTime() {
    let today = new Date();
    return today.toLocaleTimeString();
  }

  function defineCurrencyPairRates(pair) {
    return currencyRates.find((item) => item.currencyPair === pair)
      .currencyRates;
  }

  function defineCurrencyRates() {
    return [
      {
        currencyPairId: 1,
        currencyPair: "USD/CAD",
        currencyRates: {
          currencyRateBuy: (Math.random() * 120).toFixed(2),
          currencyRateSell: (Math.random() * 130).toFixed(2),
        },
      },
      {
        currencyPairId: 2,
        currencyPair: "USD/RUB",
        currencyRates: {
          currencyRateBuy: (Math.random() * 130).toFixed(2),
          currencyRateSell: (Math.random() * 140).toFixed(2),
        },
      },
      {
        currencyPairId: 3,
        currencyPair: "GBP/USD",
        currencyRates: {
          currencyRateBuy: (Math.random() * 160).toFixed(2),
          currencyRateSell: (Math.random() * 170).toFixed(2),
        },
      },
    ];
  }

  useMemo(defineCurrencyRates, [props]);

  useEffect(() => {
    setInterval(() => {
      setTime(renderTime());
    }, 1000);
    setInterval(() => {
      setCurrencyRates(() => {
        return defineCurrencyRates();
      });
    }, 60000);
  }, []);

  useEffect(() => {
    let value = currencyPairChoosen
      ? currencyPairChoosen.slice(0, 7)
      : "USD/CAD";
    setCurrencyPairRates(defineCurrencyPairRates(value));
  }, [currencyRates]);

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
    setCurrencyPairChoosen(() => e.target.value);
    setCurrencyPairRates(defineCurrencyPairRates(e.target.value.slice(0, 7)));
  }
  function handleShowInfo(e) {
    console.log(currencyPairRates);
  }

  function handleRateClick(e) {
    console.log(e);
    let type = e.target.classList.contains("rates-item-buy") ? "buy" : "sell";
    let details = {
      dealType: type,
      dealPrice: e.target.innerHTML,
      dealInstrument: currencyPairChoosen,
    };
    setMainDealDetails(details);
    toggleShowOrderWindow();
  }

  return (
    <div className="App">
      <div className="container">
        {" "}
        <button onClick={handleShowInfo}></button>
        <div className="tabs">
          <div className="tab">
            <input
              type="radio"
              id="tab1"
              name="tab-group"
              defaultChecked
            ></input>
            <label htmlFor="tab1" className="tab-title">
              Вкладка 1
            </label>
            <section className="tab-content">
              <div>{time}</div>
              <select
                value={currencyPairChoosen}
                onChange={(e) => handleCurrencyChoose(e)}
              >
                {renderCurrencyOptions()}
              </select>
              <RatesComponent
                currencyRates={currencyPairRates}
                handleRateClick={handleRateClick}
              ></RatesComponent>
            </section>
          </div>
          <div className="tab">
            <input type="radio" id="tab2" name="tab-group"></input>
            <label htmlFor="tab2" className="tab-title">
              Вкладка 2
            </label>
            <section className="tab-content">
              <ArchiveComponent></ArchiveComponent>
            </section>
          </div>
          {showOrderWindow && (
            <OrderWindow mainDealDetails={mainDealDetails}></OrderWindow>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showOrderWindow: state.showOrderWindow,
  };
};

const mapDispatchToProps = {
  toggleShowOrderWindow,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
