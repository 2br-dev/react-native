import $ from 'jquery';
import { AsyncStorage } from 'react-native';

function AuthCheck()
{
    // проверка авторизации
    //localStorage.clear();
    // const accessToken = localStorage.getItem('accessToken');
    const accessToken = AsyncStorage.getItem('accessToken');
    let result = false;
    if (accessToken) {
        /* $.ajax({
            type: "POST",
            url: "http://react-basic.local/back-end/api/AuthController.php",
            data: "signedIn=q&accessToken="+accessToken,
            async: false,
            success: function (response) {
                switch (response) {
                    case 'guest':
                        result = false;
                        break;
                    
                    case 'token expired':
                        // const refreshToken = localStorage.getItem('refreshToken');
                        const refreshToken = AsyncStorage.getItem('refreshToken');
                        $.ajax({
                            type:"POST",
                            url: "http://react-basic.local/back-end/api/AuthController.phpp",
                            data: "signedIn=q&refreshToken="+refreshToken,
                            async: false,
                            success: function (response) {
                                if (response === 'guest') {
                                    result = false;
                                } else {
                                    const tokenArr = response.split(" && ");
                                    // localStorage.setItem('accessToken', tokenArr[0]);
                                    // localStorage.setItem('refreshToken', tokenArr[1]);
                                    AsyncStorage.setItem('accessToken', tokenArr[0]);
                                    AsyncStorage.setItem('refreshToken', tokenArr[1]);
                                    result = true;
                                }
                            }
                        });
                        break;
                
                    case 'token is valid':
                        result = true;
                        break;

                    default:
                        result = false;
                        break;
                }
            },
            error: function (xhr, status) {

            },
        }); */
    } else {
        result = false;
    }

    return result;
}

export {AuthCheck};
