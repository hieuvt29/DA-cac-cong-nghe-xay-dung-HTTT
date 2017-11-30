export const get_product = (productId) => {
    // console.log('---TuyenTN---request action');
    return {
        type: 'GET_PRODUCT',
        productId,
    };
}