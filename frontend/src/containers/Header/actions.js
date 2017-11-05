export const signin = (username, password) => {
    // console.log('---TuyenTN---SignIn', );
    return {
        type: 'SIGNIN',
        username,
        password,
    }
};