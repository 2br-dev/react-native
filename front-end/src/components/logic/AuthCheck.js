import $ from 'jquery';

function AuthCheck()
{
    // проверка авторизации
    //localStorage.clear();
    const accessToken = localStorage.getItem('accessToken');
    console.log('AuthCheck -> localStorage -> accessToken = '+accessToken);
    if (accessToken) {
        $.ajax({
            type: "POST",
            url: "/back-end/api/AuthController.php",
            data: "signedIn=q&accessToken="+accessToken,
            async: false,
            success: function (response) {
                console.log('User status App = '+response);
                switch (response) {
                    case 'guest':
                        return false;
                    
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
                                    return false;
                                } else {
                                    const tokenArr = response.split(" && ");
                                    localStorage.setItem('accessToken', tokenArr[0]);
                                    localStorage.setItem('refreshToken', tokenArr[1]);
                                    console.log('Access Token = '+localStorage.getItem('accessToken'));
                                    console.log('Refresh Token = '+localStorage.getItem('refreshToken'));
                                    return true;
                                }
                            }
                        });
                        break;
                
                    case 'token is valid':
                        return true;

                    default:
                        return false;
                }
            },
            error: function (xhr, status) {
                console.log('Ошибка отправки запроса на сервер. Проверьте ваше интернет соединение.');
                console.log('Статус: '+status);
            },
        });
    } else {
        return false;
    }
}

export {AuthCheck};
