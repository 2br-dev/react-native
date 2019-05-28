<?php

require_once "user/User.php";

$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING);
$cryptedPass = password_hash($password, PASSWORD_BCRYPT);

$user = new User($email, $cryptedPass);

if ($user->createUser()) {
    echo "Успешная регистрация";
} else {
    echo "Во время регистрации возникли технические трудности. Попробуйте зарегистрироваться позже или обратитесь к администрации сайта.";
}