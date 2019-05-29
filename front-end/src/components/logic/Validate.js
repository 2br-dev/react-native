function validateEmail(email)
{
    if (email.search(/^[-._+a-z0-9]+@(?:[a-z0-9][-a-z0-9]*\.)+[a-z]{2,6}$/i) === -1 && email.length > 0) {
        return false;
    }
    
    return true;
}

function validatePass(password)
{
    if (password.length < 8)
        return false;
    
    return true;
}

function confirmPass(password, confirm)
{
    return password === confirm ? true : false;
}

export { validateEmail, validatePass, confirmPass };