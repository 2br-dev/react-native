<?php

require_once "../../../protected/config/config.db.php";

$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING);
$cryptedPass = password_hash($password, PASSWORD_BCRYPT);
$createdAt = date('Y-m-d H:i:s');
$updated = $createdAt;

$mysql = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_BASE);
$mysql->set_charset("utf8");

if ($mysql->connect_errno) {
  printf('Не удалось подключиться к БД: %s', $mysql->connect_error);
  exit();
}

if ($mysql->query("INSERT INTO db_mdd_users (email, password, created, updated) VALUES ('$email', '$cryptedPass', '$createdAt', '$updated')")) {
  echo "Успешная регистрация";
} else {
  printf('Ошибка при сохранении: %s', $mysql->error);
}

/*class CreateUser
{
  private $mysql;

  function __construct()
  {
    $this->mysql = new mysqli();
  }
}*/