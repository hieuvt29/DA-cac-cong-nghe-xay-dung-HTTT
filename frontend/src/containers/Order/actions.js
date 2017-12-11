export const createOrder = (order) => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'CREATE_ORDER',
        order,
    }
};

export const removeOrder = () => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'REMOVE_ORDER'
    }
};