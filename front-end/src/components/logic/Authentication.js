import $ from 'jquery';

function auth(login, password)
{
    let result = false;
    $.ajax({
        type: "POST",
        url: "/back-end/api/AuthController.php",
        data: "login="+login+"&password="+password,
        async: false,
        success: function (response) {
            if (response !== 'denied') {
                console.log('Пользователь прошёл авторизацию');
                console.log('Server Response auth = ', response);
                const tokenArr = response.split(" && ");
                localStorage.setItem('accessToken', tokenArr[0]);
                localStorage.setItem('refreshToken', tokenArr[1]);
                result = true;
            }
        },
        error: function (xhr, status) {
            console.log('Неудалось установить соединение с сервером. Проверьте интернет соединение и обновите страницу.');
        }
    });

    return result;
}

export { auth };
