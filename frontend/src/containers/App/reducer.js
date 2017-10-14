const initialState = {
    count: 88,
    listItems: [
        {name: "tuyen1", price: "100", category: "ahihi"},
        {name: "tuyen2", price: "200", category: "ahihi"},
        {name: "tuyen3", price: "300", category: "ahihi"},
    ],
    latestProducts: [
        {name: "san pham 1", price: "100"},
        {name: "san pham 2", price: "100"},
        {name: "san pham 3", price: "100"},
    ]
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE': {
        return { ...state, count: state.count + 1 };
    }
    default:
      return state;
  }
}

export default appReducer;
