<?php

require_once "user/User.php";

if (isset($_POST['id'])) {
    $user = new User();
    $user->loadUserData($_POST['id']);

    $xml = new SimpleXMLElement("<?xml version='1.0' standalone='yes' ?><user></user>");
    
    $xml->addChild('name', $user->getName());
    $xml->addChild('login', $user->getLogin());
    $xml->addChild('email', $user->getEmail());
    $xml->addChild('phone', $user->getPhone());
    $xml->addChild('address', $user->getAddress());
    $xml->addChild('city', $user->getCity());

    $xmlString = $xml->asXML();

    echo $xmlString;
} else {
    echo "Неизвестный запрос";
}