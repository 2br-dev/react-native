<?php

require_once "./db/DbConnect.php";

class User
{
    private $email;
    private $password;
    private $name;
    private $phone;
    private $address;
    private $city;
    private $created;
    private $updated;

    function __construct(
      string $email,
      string $password,
      string $name = '',
      string $phone = '',
      string $address = '',
      string $city = ''
      )
    {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->phone = $phone;
        $this->address = $address;
        $this->city = $city;
        $this->created = date('Y-m-d H:i:s');
        $this->updated = $this->created;
    }

    public function createUser()
    {
        $dbConnect = new DbConnect('db_mdd_users');

        if (!$storedEmail = $dbConnect->query("SELECT * FROM db_mdd_users WHERE email='{$this->email}'")) {
            echo "Ошибка запроса createUser к БД. Пожалуйста, сообщите об этой ошибке администрации сайта.";
            exit();
        }

        if ($storedEmail->num_rows > 0) {
            return "Дубликат";
        }

        $fieldNames = '';
        $values = '';
        foreach ($this as $key => $value) {
          $fieldNames .= $key.",";
          $values .= "'$value',";
        }
        $fieldNames = trim($fieldNames, ',');
        $values = trim($values, ',');
        
        $dbConnect->save($fieldNames, $values);

        $dbConnect->close();

        return "Успешная регистрация";
    }

    public function loadUserData(string $email)
    {
        $dbConnect = new DbConnect('db_mdd_users');

        $column = "email='".$email."'";
        $userData = $dbConnect->load($column);

        foreach ($userData as $key => $value) {
            $this->$key = $value;
        }

        $dbConnect->close();
    }

    public function updateUser(array $updating)
    {
        $dbConnect = new DbConnect('db_mdd_users');

        $values = '';
        foreach ($updating as $key => $value) {
            $values .= "$key='$value',";
        }
        $values = trim($values, ',');

        $dbConnect->update($values, "email='".$this->email."'");

        $dbConnect->close();
    }

    public function deleteUser()
    {
        $dbConnect = new DbConnect('db_mdd_users');

        $condition = "email='".$this->email."'";
        $dbConnect->delete($condition);
        
        $this->clear();

        $dbConnect->close();
    }

    public function clear()
    {
        foreach ($this as $key => $value) {
          if ($key != 'table') {
            $this->$key = '';
          }
        }
    }
}