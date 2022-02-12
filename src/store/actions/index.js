const toggleShowOrderWindow = (typeOfChange) => {
  return {
    type: "TOGGLE_SHOW_ORDER_WINDOW",
    typeOfChange: typeOfChange,
  };
};

const addDeal = (dealDetails) => {
  return {
    type: "ADD_DEAL",
    dealDetails: dealDetails,
  };
};

export { toggleShowOrderWindow, addDeal };
