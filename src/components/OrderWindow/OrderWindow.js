import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toggleShowOrderWindow } from "../../store/actions";

function OrderWindow(props) {
  const { toggleShowOrderWindow } = props;
  let [bidDetails, setBidDetails] = useState("");

  function handleWindowClick(e) {
    if (e.target.classList.contains("order-window-wrapper")) {
      toggleShowOrderWindow();
    }
  }

  function handleBtnClick(e) {
    if (e.target.textContent === "Cancel") {
      toggleShowOrderWindow();
    }
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
            <div>&#10006;</div>
          </div>
          <div className="order-window-details">
            <p className="order-window-type"></p>
          </div>
          <div className="input-wrapper">
            <label>Volume</label>
            <input
              value={bidDetails}
              onChange={(e) => setBidDetails(e.target.value)}
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
            <button type="button" className="btn btn-accept">
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  toggleShowOrderWindow,
};

export default connect(null, mapDispatchToProps)(OrderWindow);
