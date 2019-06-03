import $ from 'jquery';

function AuthCheck()
{
    // проверка авторизации
    //localStorage.clear();
    const accessToken = localStorage.getItem('accessToken');
    console.log('AuthCheck -> localStorage -> accessToken = '+accessToken);
    let result = false;
    if (accessToken) {
        $.ajax({
            type: "POST",
            url: "/back-end/api/AuthController.php",
            data: "signedIn=q&accessToken="+accessToken,
            async: false,
            success: function (response) {
                console.log('User status AuthCheck = '+response);
                switch (response) {
                    case 'guest':
                        console.log('guest logged');
                        result = false;
                        break;
                    
                    case 'token expired':
                        console.log('Просроченый токен доступа. Запрос нового токена.');
                        const refreshToken = localStorage.getItem('refreshToken');
                        $.ajax({
                            type:"POST",
                            url: "/back-end/api/AuthController.php",
                            data: "signedIn=q&refreshToken="+refreshToken,
                            async: false,
                            success: function (response) {
                                console.log('User status after send refreshToken = '+response);
                                if (response === 'guest') {
                                    result = false;
                                } else {
                                    const tokenArr = response.split(" && ");
                                    localStorage.setItem('accessToken', tokenArr[0]);
                                    localStorage.setItem('refreshToken', tokenArr[1]);
                                    console.log('Access Token = '+localStorage.getItem('accessToken'));
                                    console.log('Refresh Token = '+localStorage.getItem('refreshToken'));
                                    result = true;
                                }
                            }
                        });
                        break;
                
                    case 'token is valid':
                        console.log('valid token logged');
                        result = true;
                        break;

                    default:
                        console.log('default logged');
                        result = false;
                        break;
                }
            },
            error: function (xhr, status) {
                console.log('Ошибка отправки запроса на сервер. Проверьте ваше интернет соединение.');
                console.log('Статус: '+status);
            },
        });
    } else {
        console.log('without token logged');
        result = false;
    }

    console.log('AuthCheck return');
    return result;
}

export {AuthCheck};
