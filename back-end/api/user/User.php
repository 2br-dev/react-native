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
    private $login = '';

    function __construct(
      string $email = '',
      string $password = '',
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
        $dbConnect = new DbConnect('db_mdd_users');
        $existedCol = $dbConnect->query("DESCRIBE db_mdd_users");
        $columns = [];
        for ($i = 0; $i < $existedCol->num_rows; $i++) {
            $row = $existedCol->fetch_assoc();
            $columns[] = $row['Field'];
        }
        foreach ($this as $key => $value) {
            if (!in_array($key, $columns)) {
                $dbConnect->query("ALTER TABLE db_mdd_users ADD $key VARCHAR(255)");
            }
        }
    }

    // Сеттеры  -----------------------------------------

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    public function setPassword(string $password)
    {
        $this->password = $password;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function setPhone(string $phone)
    {
        $this->phone = $phone;
    }

    public function setAddress(string $address)
    {
        $this->address = $address;
    }

    public function setCity(string $city)
    {
        $this->city = $city;
    }

    public function setUpdated(string $date)
    {
        $this->updated = $date;
    }

    public function setLogin(string $login)
    {
        $this->login = $login;
    }

    //---------------------------------------------------

    // Геттеры  -----------------------------------------

    public function getEmail()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function getCity()
    {
        return $this->city;
    }

    public function getUpdated()
    {
        return $this->updated;
    }

    public function getLogin()
    {
        return $this->login;
    }

    //---------------------------------------------------

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

    public function loadUserData(int $id)
    {
        $dbConnect = new DbConnect('db_mdd_users');

        $column = "id='".$id."'";
        $userData = $dbConnect->load($column)->fetch_assoc();

        foreach ($userData as $key => $value) {
            $this->$key = $value;
        }

        $dbConnect->close();
    }

    public function updateUser(array $updating)
    // updating - ассоциативный массив, где ключ - поле в БД
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

    public function exportXML()
    {
        $xml = new SimpleXMLElement("<?xml version='1.0' standalone='yes' ?><user></user>");
        foreach ($this as $key => $value) {
            $xml->addChild($key, $value);
        }
        $xmlString = $xml->asXML();

        return $xmlString;
    }
}