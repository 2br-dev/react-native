<?php

require_once "user/User.php";

$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

if (isset($_POST['check'])) {
    $user = new User($email);
    if ($user->exists()) {
        echo 'user already exists';
    } else {
        echo 'ok';
    }
    exit();
}

$password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING);
$cryptedPass = password_hash($password, PASSWORD_BCRYPT);

$user = new User($email, $cryptedPass);

$result = $user->createUser();
if ($result == 'Успешная регистрация') {
    $to = 'prog@2-br.ru';
    $subject = 'Регистрация нового пользователя';
    $message = "Новый пользователь был зарегистрирован на сайте react.native".PHP_EOL.
                "Email: ".$email;
    $headers = 'From: React.Native <prog@2-br.ru>\r\n'.
                'Reply-To: prog@2-br.ru\r\n'.
                'X-Mailer: PHP/'.phpversion();
    if (mail($to, $subject, $message, $headers)) {
        $result = "На указанный вами Email адрес направлено письмо с инструкцией по завершению регистрации";
    } else {
        $result = "Что-то пошло не так";
    }
}

echo $result;
