export const signin = (username, password) => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'SIGNIN',
        username,
        password,
    }
};

export const signout = () => {
    return {
        type: 'SIGNOUT',
    }
};

export const initCart = () => {
    return {
        type: 'INIT_CART',
    }
}

export const initAccount = () => {
    return {
        type: 'INIT_ACCOUNT',
    }
}

export const search = (searchKey) => {
    return {
        type: 'SEARCH',
        searchKey,
    }
};

export const reqCategories = () => {
    return {
        type: 'REQ_CATEGORIES',
    }
};
