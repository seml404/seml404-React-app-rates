import React, { useEffect, useState } from "react";

function App(props) {
  let [time, setTime] = useState(renderTime());
  let [currencyChoosen, setCurrencyChoosen] = useState(renderTime());

  function renderTime() {
    let today = new Date();
    return today.toLocaleTimeString();
  }

  useEffect(() => {
    setInterval(() => {
      setTime(renderTime());
    }, 1000);
  }, [props]);

  function renderCurrencyOptions() {
    let pairs = [
      { id: 1, pairName: "USD/CAD", type: "TOM" },
      { id: 2, pairName: "USD/CAD", type: "SPOT" },
      { id: 3, pairName: "USD/RUB", type: "TOM" },
      { id: 4, pairName: "USD/RUB", type: "SPOT" },
      { id: 5, pairName: "GBP/USD", type: "TOM" },
      { id: 6, pairName: "GBP/USD", type: "SPOT" },
    ];
    pairs = pairs.map((item) => {
      return (
        <option key={item.pairName + item.type}>
          {item.pairName + "_" + item.type}
        </option>
      );
    });
    return pairs;
  }

  function handleCurrencyChoose(e) {
    console.log(e);
  }

  return (
    <div className="App">
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
