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

$user->setEmail($email);
$user->setPassword($cryptedPass);

echo $user->createUser();
