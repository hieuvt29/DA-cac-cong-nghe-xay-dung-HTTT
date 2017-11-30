import { getCookie, setCookie } from '../../globalFunc';
const initialState = {
    count: 88,
    cartAmount: 0,
    listItems: [
        {name: "tuyen1", price: "100", category: "ahihi"},
        {name: "tuyen2", price: "200", category: "ahihi"},
        {name: "tuyen3", price: "300", category: "ahihi"},
    ],
    featuredProducts: [],
    latestProducts: [
        {name: "san pham 1", price: "100"},
        {name: "san pham 2", price: "100"},
        {name: "san pham 3", price: "100"},
    ],
    account: {},
    listProducts: [],
    cartTotal: 0,
    cartQuantity: 0,
    errorLogin: '',
    prevPath: '',
    resSearch: [],
    resDetailProduct: {},
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE': {
        return { ...state, count: state.count + 1 };
    }
    case 'SIGNOUT': {
        setCookie('account', '');
        return { ...state, account: '' };
    }
    case 'INIT_ACCOUNT': {
        let raw = (getCookie('account'));
        let account = (raw)? JSON.parse(raw) : '';
        return { ...state, account: account};
    }
    case 'INIT_CART': {
        let cartTotal = parseFloat(getCookie('cartTotal'));
        let cartQuantity = parseInt(getCookie('cartQuantity'), 10);        
        return { ...state, cartTotal: cartTotal, cartQuantity: cartQuantity};
    }
    case 'RES_PRODUCTS': {
        let featuredProducts = [];
        let temp = [];
        action.response.data.products.map((item, index) => {
            if (index % 4 === 3) {
                temp.push(item);
                featuredProducts.push(temp);
                temp = [];
            } else {
                temp.push(item);
            }
        });
        return { ...state, featuredProducts: featuredProducts, listProducts: action.response.data.products};
    }
    case 'RES_SIGNUP': {
        console.log('---TuyenTN---', action.response);
        return { ...state, account: action.response};
    }
    case 'RES_SEARCH': {
        // console.log('---TuyenTN---', action.response);
        return { ...state, resSearch: action.response.products};
    }
    case 'RES_SIGNIN': {
        // console.log('---Signin res:---', action.response);
        if (action.response.data.errorCode === 1) {
            return { ...state, errorLogin: 'Sai tên đăng nhập hoặc mật khẩu'};
        } else {
            setCookie('account', JSON.stringify(action.response.data.user));
            return { ...state, account: action.response.data.user};
        }
    }
    case 'RES_PRODUCTDETAIL': {
        console.log('---RES_PRODUCTDETAIL---', action.response.product);
        return { ...state, resDetailProduct: action.response.product};
    }
    case 'UPDATECART': {
        return { ...state, cartTotal: action.cartTotal, cartQuantity: action.cartQuantity };
    }
    case 'ADDTOCART': {
        const cartString = getCookie('cart');
        let newCart = [];
        if (cartString === '') {
            newCart = [];
        } else {
            newCart = JSON.parse(cartString);
        }
        let i;
        for (i = 0; i < newCart.length; i++) {
            if (action.product.productId === newCart[i].productId) {
                newCart[i].quantity += 1;
                break;
            }
        }
        if (i === newCart.length) {
            newCart.push(action.product);
        }
        let cartTotal = parseFloat(getCookie('cartTotal'))+action.product.price;
        let cartQuantity = parseInt(getCookie('cartQuantity'), 10)+1;
        setCookie('cart', JSON.stringify(newCart));
        setCookie('cartQuantity', JSON.stringify(cartQuantity));
        setCookie('cartTotal', JSON.stringify(cartTotal));
        return { ...state, cartTotal: cartTotal, cartQuantity: cartQuantity };
    }
    default:
      return state;
  }
}

export default appReducer;
