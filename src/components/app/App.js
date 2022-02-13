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

  // мемоизация функции генерации случайных курсов
  useMemo(defineCurrencyRates, [props]);

  // хук для установки таймеров (1) для вычисления и отображения вермени и (2) генерации случайных курсов
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

  // хук для вычисления и отрисовки необходимых курсов валютной пары в зависимости от (1) выбранной пары валют и (2) периодического (соответствующим таймером) изменения курсов
  useEffect(() => {
    let value = currencyPairChoosen
      ? currencyPairChoosen.slice(0, 7)
      : "USD/CAD";
    setCurrencyPairRates(defineCurrencyPairRates(value));
  }, [currencyRates]);

  function defineCurrencyPairRates(pair) {
    return currencyRates.find((item) => item.currencyPair === pair)
      .currencyRates;
  }

  // функция генерации случайных курсов валютных пар
  function defineCurrencyRates() {
    let ratesRandom = [
      (Math.random() * 100).toFixed(4),
      (Math.random() * 120).toFixed(4),
      (Math.random() * 130).toFixed(4),
    ];

    return [
      {
        currencyPairId: 1,
        currencyPair: "USD/CAD",
        currencyRates: {
          currencyRateBuy: ratesRandom[0],
          currencyRateSell: (ratesRandom[0] * 0.9999).toFixed(4),
        },
      },
      {
        currencyPairId: 2,
        currencyPair: "USD/RUB",
        currencyRates: {
          currencyRateBuy: ratesRandom[1],
          currencyRateSell: (ratesRandom[1] * 0.9999).toFixed(4),
        },
      },
      {
        currencyPairId: 3,
        currencyPair: "GBP/USD",
        currencyRates: {
          currencyRateBuy: ratesRandom[2],
          currencyRateSell: (ratesRandom[2] * 0.9999).toFixed(4),
        },
      },
    ];
  }

  // функция обработки выбора пользователем валютной пары
  function handleCurrencyChoose(e) {
    setCurrencyPairChoosen(() => e.target.value);
    setCurrencyPairRates(defineCurrencyPairRates(e.target.value.slice(0, 7)));
  }

  // функция обработки клика пользователем по желаемой им операции
  function handleRateClick(e) {
    console.log(e);
    let type = e.target.classList.contains("buy-item") ? "buy" : "sell";
    let details = {
      dealType: type,
      dealPrice: e.target.innerHTML,
      dealInstrument: currencyPairChoosen,
    };
    setMainDealDetails(details);
    toggleShowOrderWindow();
  }

  // функция для отрисовки списка опций (вариантов валютных пар)
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

  // функция для вычисления текущего времени
  function renderTime() {
    let today = new Date();
    return today.toLocaleTimeString();
  }

  return (
    <div className="App">
      <div className="container">
        <div className="tabs">
          <div className="tab">
            <input
              type="radio"
              id="tab1"
              name="tab-group"
              defaultChecked
            ></input>
            <label htmlFor="tab1" className="tab-title tab-title-first">
              Trading
            </label>
            <section className="tab-content">
              <div className="tab-content-wrapper">
                <div className="time-info">{time}</div>
                <select
                  className="select"
                  value={currencyPairChoosen}
                  onChange={(e) => handleCurrencyChoose(e)}
                >
                  {renderCurrencyOptions()}
                </select>
                <RatesComponent
                  currencyRates={currencyPairRates}
                  handleRateClick={handleRateClick}
                ></RatesComponent>
              </div>
            </section>
          </div>
          <div className="tab">
            <input type="radio" id="tab2" name="tab-group"></input>
            <label htmlFor="tab2" className="tab-title">
              Archive
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
