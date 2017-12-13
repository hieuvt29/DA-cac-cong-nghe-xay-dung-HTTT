export const getCustomerOrders = (customerId) => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'GET_CUSTOMER_ORDERS',
        customerId
    }
};

export const changeOrderState = (orderId) => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'CANCEL_CUSTOMER_ORDER',
        orderId
    }
};

