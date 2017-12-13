
export const getProBySupplier = (supplier_id) => {
    // console.log('---TuyenTN---request action');
    return {
        type: 'PRODUCTS_REQUEST_BY_SUPPLIER',
        supplier_id,
    };
}