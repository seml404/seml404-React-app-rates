const initialState = {
  showOrderWindow: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SHOW_ORDER_WINDOW":
      return {
        ...state,
        showOrderWindow: action.typeOfChange
          ? action.typeOfChange
          : !state.showOrderWindow,
      };

    default:
      return state;
  }
};

export default reducer;
