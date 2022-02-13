import React from "react";
import { connect } from "react-redux";

function ArchiveComponent(props) {
  const { dealsList } = props;
  function renderBidsDetails() {
    return dealsList.length > 0
      ? dealsList.map((item) => {
          return (
            <div className="archive-deal-item" key={item.dealId}>
              <p
                className={
                  item.dealType === "buy"
                    ? "archive-text archive-text-small buy-item"
                    : "archive-text archive-text-small sell-item"
                }
              >
                {item.dealType}
              </p>
              <p className="archive-text archive-text-small">
                {item.dealPrice}
              </p>
              <p className="archive-text archive-text-big">
                {item.dealInstrument}
              </p>
              <p className="archive-text archive-text-big">
                {item.volumeOfDeal}
              </p>
              <p className="archive-text archive-text-big">{item.dateOfDeal}</p>
            </div>
          );
        })
      : null;
  }

  return (
    <>
      <div className="archive-wrapper">
        <div className="archive-top">
          <p className="archive-text archive-text-small"> Side</p>
          <p className="archive-text archive-text-small"> Price</p>
          <p className="archive-text archive-text-big"> Instrument</p>
          <p className="archive-text archive-text-big"> Volume</p>
          <p className="archive-text archive-text-big"> Timestamp</p>
        </div>
        <div className="archive-details">{renderBidsDetails()}</div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    dealsList: state.dealsList,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveComponent);
