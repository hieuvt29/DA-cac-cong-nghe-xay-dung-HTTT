var validator = require('validator');

module.exports = {
    checkAuthenInfo: function (email, password) {

        if (validator.isEmail(email)) {

            if (checkValidPass(password)) {

                return "Valid";
            } else {
                return "Invalid Password";
            }
        } else {
            return "Invalid Email";
        }
    },

    checkPassword: function (oldPass, newPass) {
        if (checkValidPass(oldPass)) {

            if (checkValidPass(newPass)) {

                return "Valid";
            } else {
                return "Invalid NewPass";
            }
        } else {
            return "Invalid OldPass";
        }

    }
}

function checkValidPass(password) {
    if (validator.isLength(password, { min: 6, max: undefined })) {
            return true;
    } else {
        return false;
    }
}

function checkValidPassStrong(password) {
    if (validator.isLength(password, { min: 6, max: undefined })
        && !validator.isAlphanumeric(password)
        && !validator.isLowercase(password)
        && !validator.isUppercase(password)) {
            return true;
    } else {
        return false;
    }
}

