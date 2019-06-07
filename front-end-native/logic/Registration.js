import $ from 'jquery';

function Registration(email, password)
{
    let result = '';
    $.ajax({
        type: "POST",
        url: "http://react-native.local/back-end/api/RegistrationController.php",
        data: "email="+email+"&password="+password,
        async: false,
        success: function (responseMsg) {
            if (responseMsg === 'Дубликат') {
                result = 'дубль';
            } else {
                result = responseMsg;
            }
        },
        error: function (xhr, status) {
            result = 'error';
        }
    });

    return result;
}

export { Registration };
