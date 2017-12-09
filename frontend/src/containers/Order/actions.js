export const createOrder = (order) => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'CREATE_ORDER',
        order,
    }
};