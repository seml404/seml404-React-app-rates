const initialState = {
  showOrderWindow: false,
  dealsList: [],
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
    case "ADD_DEAL":
      console.log(action.dealDetails);
      let listUpdated = [...state.dealsList, action.dealDetails];
      console.log(listUpdated);
      return {
        ...state,
        dealsList: [...listUpdated],
      };

    default:
      return state;
  }
};

export default reducer;
