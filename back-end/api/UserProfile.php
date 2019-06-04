<?php

require_once "user/User.php";
require_once "./../vendor/autoload.php";

use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;

$signer = new Sha256();
$accessKey = new Key("MIICWwIBAAKBgQCKpSNanCbpYCPXQ4ZQcLZqKU0BPPtoaC9IBlu6H8QmUE/O2vPN
eRPvOHQTj+v9Th3fSPSyUOf+5vyBmriYeMPx/b3dYSL193LjXXaDNL8LrQ+/TEvS
kai5AwlDUKayNk7mJPRI7XKX3WJPM/MGr+bLzeApr4KduJcL8yYzjCO32wIDAQAB
AoGAf0wiitZmz85K+iHwl7j1c8HaBzIDr5hBGUNlQx5ZjcgdjtLwGQ97YyCVS0TQ
q7HmsZWdvn+UkzFoVGNH7A6t8Q8/C+0DvDYK1GkTln2K2eely/zAovJjzJ84Brwu
gDJFcgpRZn92WKwKQdmbxtHrndqL/7FhsBRHdPf9Qnbxh9ECQQDAM5iOcQ4gxsY0
suS/9TPuVNdPv7yQtCBYQw2roUviyGs/uPeEzhCQX56j6nEXmYYqyxIcMcOni4UL
fXnXdsxDAkEAuKqPGsZA4lRGkD5w6qNcHCzNYrsh4/IeyF+lCWPPznu1+i/f3AKJ
lFyBOo9aeQr8NJVfvcB4+QoXmXMRJlt4iQJAPpfPA/x/jF8Pp5Pm+TjCm8hXgmo/
36Q5sGTN6+oQi5+Xhd4YBdESBeKOCHXONNBTqFYP5My0GjlOr8pCRtAyfwJAQ5EM
WUSOuwEQ7HgcQo3RBvIRl/1WUhvlzXTJYt0lTKyREeBwbQR0qFcMZYvME5vEWc0J
wdjpql1Z8yhZ7wnq2QJAMXhuamoygS9jPUzdpKZ51LgEYTHv2UVd++qaY6vR57I7
jZops0FqV5d3o26at6IXmZb3Wqsi6x8phEx2nwwelw==");

$refreshKey = new Key("MIICXQIBAAKBgQDDzTThWa3poZ2EuVb/aFIf0ps5tbBzo+XgWyBxpCCzMJe992k7
48Mnxbwy5DP7hbhKpLFVTAfqG7o27Np3sL9vsA+363oLE8l20qANcw5OZz0tz26z
n/wbuDVk61UHVqvP4eJfWSB4iVWAZLdTygg0aNFrYrXjNI0j6qah6qCenQIDAQAB
AoGBAJXOhWz9TkB4dKo9m8BiMqNCYZ0v08dGWPTlA9euuY4f2ZlwmEVIJ+JgOXO+
gb8pOi1yAHPAbjXB7SFk6mm1A2G7+BUxm3rM/r27ZEZrTkFsCFDX/Yi1lbnyGy7A
KnwvRSA3/3W/bwUt9zN5crBb7BtBrZEqviOF7K7a+dOVbAFBAkEA4jsz+oVCkOjN
G37bAsNSCNTJx3rRiiZVydp40DeagrpYz3bmj3WGM1roNUnh3S00q8rMbVoUO7GM
YouQVsFemQJBAN2Q9BcZ3hWsW8YrojXctAr0YQxCgRhyZFMxeLG9xuFFqE28tjum
NKF/XFsO7Dq+GyVTuEpT8dUGvVhA5ca5lqUCQGFIgCOcpnFWCs1mEZvwjhhKGLL1
N6ImtgFlN0qifoj0xTgBs0fBjAINd4liygOoatvtC1eCwuygfvPpfBoycRECQBFC
RlE6WZtUlr2EDpmlfHzR9nFPCOFPn9L/Koil4MUReP+9MHDLDJR76ETLj8kvn8uz
jspzaYYPhVZHj95//GUCQQCutoG3DgGPTsvnEIe6dxNoJ7ipDp1zHoRMQXVZfmbT
Pmk+hqh64FR+k+azmI612UWh/kQDMI4NBcJZPnqxe2na");

function returnXmlData($userId)
{
    $user = new User();
    $user->setId($userId);
    $user->loadUserData();

    $xml = new SimpleXMLElement("<?xml version='1.0' standalone='yes' ?><user></user>");

    $xml->addChild('name', $user->getName());
    $xml->addChild('login', $user->getLogin());
    $xml->addChild('email', $user->getEmail());
    $xml->addChild('phone', $user->getPhone());
    $xml->addChild('address', $user->getAddress());
    $xml->addChild('city', $user->getCity());

    $xmlString = $xml->asXML();

    echo $xmlString;
}

if (isset($_POST['accessToken'])) {
    $accessToken = (new Parser())->parse((string) $_POST['accessToken']);
    if ($accessToken->verify($signer, $accessKey)) {
        $data = new ValidationData(); // It will use the current time to validate (iat, nbf and exp)

        if ($accessToken->validate($data)) {
            // время жизни не истекло
            returnXmlData($accessToken->getClaim('uid'));

        } else {
            echo "token expired";
        } 
    } else {
        echo "guest";
    }
} else if (isset($_POST['refreshToken'])) {
    $refreshToken = (new Parser())->parse((string) $_POST['refreshToken']);
    
    if ($refreshToken->verify($signer, $refreshKey)) {
        if ($refreshToken->validate($data)) {
            // если refreshToken подписан и не истекло время жизни, создать новую пару токенов
            echo createTokens($signer, $accessKey, $refreshKey, $accessToken->getClaim('uid'));
        } else {
            echo "guest";
        }
    } else {
        echo "guest";
    }
} else {
    echo "guest";
}
