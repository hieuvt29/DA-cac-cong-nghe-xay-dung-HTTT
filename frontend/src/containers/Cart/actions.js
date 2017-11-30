export const addToCart = (product) => {
    return {
        type: 'ADDTOCART',
        product,
    }
};

export const updateCart = (cartTotal, cartQuantity) => {
    return {
        type: 'UPDATECART',
        cartTotal,
        cartQuantity,
    }
};