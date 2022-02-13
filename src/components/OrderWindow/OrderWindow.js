import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleShowOrderWindow, addDeal } from "../../store/actions";

function OrderWindow(props) {
  const { toggleShowOrderWindow, mainDealDetails, addDeal } = props;
  let [bidDetails, setBidDetails] = useState("");
  let [volumeOfDeal, setVolumeOfDeal] = useState("");

  // функция-обработчик клика по области вне модального окна
  function handleWindowClick(e) {
    if (e.target.classList.contains("order-window-wrapper")) {
      toggleShowOrderWindow();
    }
  }

  // функция-обработчик кликов по кнопка Ok/Cancel
  function handleBtnClick(e) {
    if (volumeOfDeal) {
      addDeal({
        ...mainDealDetails,
        volumeOfDeal: volumeOfDeal,
        dateOfDeal: new Date().toLocaleString(),
        dealId: Math.random(),
      });
    }
    toggleShowOrderWindow();
  }

  return (
    <>
      <div
        className="order-window-wrapper"
        onClick={(e) => handleWindowClick(e)}
      >
        <div className="order-window">
          <div className="order-window-top">
            <p>Make order</p>
            <button
              className="btn btn-close"
              onClick={() => toggleShowOrderWindow()}
            >
              &#10006;
            </button>
          </div>
          <div className="order-window-details">
            <p
              className={
                mainDealDetails.dealType === "buy"
                  ? "order-window-info buy-item"
                  : "order-window-info sell-item"
              }
            >
              {mainDealDetails.dealType}
            </p>
            <p className="order-window-info">{mainDealDetails.dealPrice}</p>
            <p className="order-window-info">
              {mainDealDetails.dealInstrument}
            </p>
          </div>
          <div className="input-wrapper">
            <label>Volume</label>
            <input
              value={volumeOfDeal}
              onChange={(e) => setVolumeOfDeal(() => e.target.value)}
            ></input>
          </div>
          <div className="buttons-wrapper">
            <button
              type="button"
              className="btn btn-reject"
              onClick={(e) => handleBtnClick(e)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-accept"
              onClick={(e) => handleBtnClick(e)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dealsList: state.dealsList,
  };
};

const mapDispatchToProps = {
  toggleShowOrderWindow,
  addDeal,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderWindow);
