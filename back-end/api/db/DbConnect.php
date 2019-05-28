<?php

require_once "./../../protected\config\config.db.php";

class DbConnect
{
    private $mysql;
    private $table;

    function __construct($table)
    {
        $this->table = $table;
        $this->mysql = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_BASE);
        $this->mysql->set_charset('utf8');

        if ($this->mysql->connect_errno) {
            printf("При подключении к БД возникла ошибка: %s", $this->mysql->connect_error);
            exit();
        }
    }

    public function save(string $fields, string $values)
    {
        $stmt = "INSERT INTO {$this->table} ($fields) VALUES ($values)";
        
        if (!$this->mysql->query($stmt)) {
            printf("Ошибка сохранения данных: %s", $this->mysql->error);
            exit();
        }
    }

    public function load(string $conditions)
    {
        if (!$result = $this->mysql->query("SELECT * FROM {$this->table} WHERE $conditions")) {
            printf("Ошибка загрузки данных: %s", $this->mysql->error);
            exit();
        }
        return $result;
    }

    public function update(string $values, string $conditions)
    {
        if (!$this->mysql->query("UPDATE {$this->table} SET $values WHERE $conditions")) {
            printf("Ошибка обновления данных: %s", $this->mysql->error);
            exit();
        }
    }

    public function delete(string $conditions)
    {
        if (!$this->mysql->query("DELETE FROM {$this->table} WHERE $conditions")) {
            printf("Ошибка удаления данных: %s", $this->mysql->error);
            exit();
        }
    }

    public function query(string $query)
    {
        $this->mysql->query($query);
    }

    public function close()
    {
        $this->mysql->close();
    }
}