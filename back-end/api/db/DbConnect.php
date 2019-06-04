<?php
// require_once "./../../protected/config/config.db.php";
require_once '../../define.php';

class DbConnect
{
    private $mysql;

    function __construct()
    {
        $this->mysql = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_BASE);
        $this->mysql->set_charset('utf8');

        if ($this->mysql->connect_errno) {
            printf("При подключении к БД возникла ошибка: %s", $this->mysql->connect_error);
            exit();
        }
    }

    public function query(string $query)
    {
        return $this->mysql->query($query);
    }

    public function close()
    {
        $this->mysql->close();
    }
}