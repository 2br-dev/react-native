<?php

require_once "db/DbConnect.php";

session_start();

if (isset($_POST['signedIn'])) {
    if (isset($_SESSION['userId'])) {
        echo $_SESSION['userId'];
    } else {
        echo "guest";
    }
} else {
    $login = filter_var(trim($_POST["login"]), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING);

    $loginType = preg_match("/@/", $login) ? 'email' : 'username';

    $dbConnect = new DbConnect('db_mdd_users');

    $userRow = $dbConnect->load("$loginType='$login'");

    if ($userRow->num_rows > 0) {
        $userData = $userRow->fetch_assoc();
        if (password_verify($password, $userData['password'])) {
            //$_SESSION['signedIn'] = true;
            $_SESSION['userId'] = $userData['id'];
            //setcookie('id', $userData['id'], 0, '/');

            echo "ok";

        } else {
            echo "denied";
        }
    } else {
        echo "denied";
    }
}
