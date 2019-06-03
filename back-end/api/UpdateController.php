<?php

require_once "user/User.php";
require_once "./../vendor/autoload.php";

use Lcobucci\JWT\Parser;

$input = file_get_contents('php://input');

$value = explode("=", $input);

//var_dump($value);

echo "Пароль до фильтрации = ".$value[3]." | ";
$value[3] = filter_var(trim($value[3]), FILTER_SANITIZE_STRING);

$accessToken = (new Parser())->parse((string) $value[1]);

$userId = $accessToken->getClaim('uid');

$user = new User();

$user->loadUserData($userId);

if ($value[2] == 'confirm') {
    echo "Меняю пароль на ".$value[3]." | ";
    $cryptedPass = password_hash($value[3], PASSWORD_BCRYPT);
    $user->updateUser(['password' => $cryptedPass]);
} else {
    $user->updateUser([$value[2] => $value[3]]);
}

echo "Данные успешно обновлены";
