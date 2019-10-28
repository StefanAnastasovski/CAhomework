emailValidator = (email) => {
    if (email.length < 5) {
        return false;
    }
    else {
        return true;
    }
};

module.exports = {
    emailValidator
}