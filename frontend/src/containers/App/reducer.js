const initialState = {
    count: 88,
    listItems: [
        {name: "tuyen1", price: "100", category: "ahihi"},
        {name: "tuyen2", price: "200", category: "ahihi"},
        {name: "tuyen3", price: "300", category: "ahihi"},
    ],
    featuredProducts: [
        { id: "1", name: "tuyen1", price: "100", category: "ahihi"},
        { id: "2", name: "tuyen2", price: "200", category: "ahihi"},
        { id: "3", name: "tuyen3", price: "300", category: "ahihi"},
        { id: "4", name: "tuyen4", price: "100", category: "ahihi"},
        { id: "5", name: "tuyen5", price: "200", category: "ahihi"},
        { id: "6", name: "tuyen6", price: "300", category: "ahihi"},
        { id: "7", name: "tuyen7", price: "100", category: "ahihi"},
        { id: "8", name: "tuyen8", price: "200", category: "ahihi"},
        { id: "9", name: "tuyen9", price: "300", category: "ahihi"},
        { id: "10", name: "tuyen10", price: "100", category: "ahihi"},
        { id: "11", name: "tuyen11", price: "200", category: "ahihi"},
        { id: "12", name: "tuyen12", price: "300", category: "ahihi"},
        { id: "13", name: "tuyen13", price: "100", category: "ahihi"},
        { id: "14", name: "tuyen14", price: "200", category: "ahihi"},
        { id: "15", name: "tuyen15", price: "300", category: "ahihi"},
        { id: "16", name: "tuyen16", price: "300", category: "ahihi"},        
    ],
    latestProducts: [
        {name: "san pham 1", price: "100"},
        {name: "san pham 2", price: "100"},
        {name: "san pham 3", price: "100"},
    ],
    account: {
        // username: '',
        // password: '',
        // role: '',
        // firstname: '',
        // lastname: '',
        // gender: '',
        // dob: '',
        // email: '',
        // telephone: '',
        // address: '',
    },
    listProducts: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE': {
        return { ...state, count: state.count + 1 };
    }
    case 'RES_PRODUCTS': {
        console.log('Action.rés', action.response );
        return { ...state, listProducts: action.response.data.products};
    }
    case 'RES_SIGNUP': {
        console.log('Action.rés', action.response );
        return { ...state, account: action.response};
    }
    case 'RES_SIGNIN': {
        console.log('Action.rés', action.response );
        return { ...state, account: action.response};
    }
    default:
      return state;
  }
}

export default appReducer;
