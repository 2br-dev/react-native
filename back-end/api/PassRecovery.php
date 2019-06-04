<?php

require_once "user/User.php";

if (isset($_POST['login'])) {
    $login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
    $loginType = preg_match("/@/", $login) ? 'Email' : 'Login';
    $user = new User();
    $set = "set$loginType";
    $user->$set($login);

    if ($user->loadUserData()) {
        $to = 'prog@2-br.ru';
        $subject = 'Восстановление пароля';
        $message = "Для того, чтобы восстановить пароль, перейдите по ссылке".PHP_EOL.
                    "https://www.google.com/";
        $headers = 'From: React.Basic <prog@2-br.ru>\r\n'.
                    'Reply-To: prog@2-br.ru\r\n'.
                    'X-Mailer: PHP/'.phpversion();
        if (mail($to, $subject, $message, $headers)) {
            $result = "ok";
        } else {
            $result = "Что-то пошло не так";
        }

        echo $result;
    } else {
        echo 'user does not exist';
    }
}
