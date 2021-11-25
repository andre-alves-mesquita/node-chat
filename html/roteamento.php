<?php

use WPPConnect\functions;

$author = $_POST['author'];
$message = $_POST['message'];
$session = $_POST['session'];
$receiver = $_POST['receiver'];
$service = $_POST['service'];


$conteudo = $author . $message . $session . $receiver . $service;
$fp = fopen("novo.txt", "wb");
fwrite($fp, $conteudo);
fclose($fp);

die();


switch ($service) {
    case 'sendMessage':

        $sendMessage = new functions();

        $sendMessage->sendMessage($author, $message, $session, $receiver);
        break;

    default:
        # code...
        break;
}
