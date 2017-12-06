
export const getProByCategory = (category_id) => {
    // console.log('---TuyenTN---request action');
    return {
        type: 'PRODUCTS_REQUEST_BY_CATEGORY',
        category_id,
    };
}