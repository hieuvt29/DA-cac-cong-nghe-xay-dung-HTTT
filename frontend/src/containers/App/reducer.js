// import { getCookie, setCookie } from '../../globalFunc';
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
    resCategories: [],
    resDetailProduct: {},
    resProByCategory: [],
    resCreateOrder: '',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE': {
        return { ...state, count: state.count + 1 };
    }
    case 'SIGNOUT': {
        localStorage.setItem('account', '');
        return { ...state, account: '' };
    }
    case 'INIT_ACCOUNT': {
        let raw = localStorage.getItem('account');
        let account = (raw && raw !== "undefined")? JSON.parse(raw) : '';
        return { ...state, account: account};
    }
    case 'INIT_CART': {
        let cartTotal = localStorage.getItem('cartTotal');
        cartTotal = (!cartTotal || cartTotal == 'undefined')? 0: parseFloat(cartTotal);
        let cartQuantity = localStorage.getItem('cartQuantity');
        cartQuantity = (!cartQuantity || cartQuantity == 'undefined')?0: parseInt(localStorage.getItem('cartQuantity'), 10);
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
        localStorage.setItem('account', JSON.stringify(action.response.data.account));
        return { ...state, account: action.response.data.account, signup_failed: null};
    }
    case 'SIGNUP_FAILED': {
        console.log('---TuyenTN---', action.error);
        let err = action.error.response.data;
        let message = null;
        switch (err.message) {
            case "Duplicated":
                message = "Tên người dùng đã được sử dụng";
                break;
            case "Bad Request": 
                message = "Vui lòng kiểm tra lại thông tin đăng ký";
                break;
            default: 
                message = "Hệ thống không thể tạo tài khoản";
                break;
        }
        return { ...state, signup_failed: message};
    }
    case 'RES_SEARCH': {
        // console.log('---TuyenTN---', action.response);
        return { ...state, resSearch: action.response.products};
    }
    case 'RES_CATEGORIES': {
        // console.log('---TuyenTN---', action.response);
        return { ...state, resCategories: action.response.categories};
    }
    case 'RES_SUPPLIERS': {
        // console.log('---TuyenTN---', action.response);
        return { ...state, resSuppliers: action.response.suppliers};
    }
    case 'RES_SIGNIN': {
        // console.log('---Signin res:---', action.response);
        if (action.response.data.errorCode === 1) {
            return { ...state, errorLogin: 'Sai tên đăng nhập hoặc mật khẩu'};
        } else {
            localStorage.setItem('account', JSON.stringify(action.response.data.user));
            return { ...state, account: action.response.data.user};
        }
    }
    
    case 'SIGNIN_FAILED': {
        // console.log('---Signin res:---', action.response);
        return { ...state, errorLogin: 'Sai tên đăng nhập hoặc mật khẩu'};
    }

    case 'RES_CREATE_ORDER': {
        console.log('---RES_CREATE_ORDER---', action.response);
        return { ...state, resCreateOrder: action.response};
    }
    case 'ORDER_FAILDED': {
        console.log('---ORDER_FAILDED---', action.error);
        return { ...state, order_failed: action.error};
    }
    case 'RES_REMOVE_ORDER': {
        return { ...state, resCreateOrder: ""};
    }
    case 'RES_CUSTOMER_ORDERS' : {
        console.log("RES_CUSTOMER_ORDERS: ", action.response);
        return {...state, customerOrders: action.response.orders};
    }
    case 'RES_CANCEL_ORDER' : {
        console.log("RES_CANCEL_ORDER: ", action.response);
        return {...state, cancelledOrder: action.response.order};
    }
    case 'CANCEL_ORDER_FAILED' : {
        console.log("CANCEL_ORDER_FAILED: ", action.response);
        return {...state, cancelOrderFailed: action.error};
    }
    case 'RES_PRODUCTDETAIL': {
        console.log('---RES_PRODUCTDETAIL---', action.response.product);
        return { ...state, resDetailProduct: action.response.product};
    }
    
    case 'RES_PRODUCTBYCAT': {
        console.log('---RES_PRODUCTBYCAT---', action.response.category.Products);
        return { ...state, resProByCategory: action.response.category.Products};
    }
    case 'RES_PRODUCTBYSUP': {
        console.log('---RES_PRODUCTBYSUP---', action.response.supplier.Products);
        return { ...state, resProByCategory: action.response.supplier.Products};
    }
    case 'UPDATECART': {
        return { ...state, cartTotal: action.cartTotal, cartQuantity: action.cartQuantity };
    }
    case 'ADDTOCART': {
        const cartString = localStorage.getItem('cart');
        let newCart = [];
        if (cartString && cartString != "null" && cartString != "undefined") {
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
        // let cartTotal = parseFloat(getCookie('cartTotal')) != NaN?(parseFloat(getCookie('cartTotal'))+action.product.price): action.product.price;
        // let cartQuantity = parseInt(getCookie('cartQuantity'), 10) != NaN?parseInt(getCookie('cartQuantity'), 10)+1: 1;
        let cartTotal = 0;
        let cartQuantity = 0;
        if (parseFloat(localStorage.getItem('cartTotal'))) {
            cartTotal = parseFloat(localStorage.getItem('cartTotal')) + action.product.price;
        } else {
            cartTotal = action.product.price;
        }
        if (parseInt(localStorage.getItem('cartQuantity'), 10)) {
            cartQuantity = parseInt(localStorage.getItem('cartQuantity'), 10) + 1;
        } else {
            cartQuantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
        return { ...state, cartTotal: cartTotal, cartQuantity: cartQuantity };
    }
    case 'RES_UPDATE_INFO': {
        console.log('---RES_UPDATE_INFO---', action.response.data.account);
        localStorage.setItem('account', JSON.stringify(action.response.data.account));
        return {...state, updatedAccount: action.response.data.account};
    }
    case 'UPDATE_INFO_FAILED': {
        return {...state, updateInfoFailed: action.error};
    }
    default:
      return state;
  }
}

export default appReducer;
