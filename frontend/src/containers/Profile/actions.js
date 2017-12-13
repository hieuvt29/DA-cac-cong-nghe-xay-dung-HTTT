
export const updateInfo = (customer) => {
    // console.log('---TuyenTN---request action');
    return {
        type: 'UPDATE_INFO',
        customer,
    };
}