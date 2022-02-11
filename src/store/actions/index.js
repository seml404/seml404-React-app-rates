const toggleShowOrderWindow = (typeOfChange) => {
  return {
    type: "TOGGLE_SHOW_ORDER_WINDOW",
    typeOfChange: typeOfChange,
  };
};

export { toggleShowOrderWindow };
