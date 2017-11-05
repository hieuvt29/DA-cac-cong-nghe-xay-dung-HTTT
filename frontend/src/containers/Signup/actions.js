export const signup = (username, password) => {
    return {
        type: 'SIGNUP',
        username,
        password,
    }
};