<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
    header("Pragma: no-cache");
    header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");

    define("ROOT_PATH","../../../");

    require_once(ROOT_PATH.'php/helper.php');

    $_REQUEST = json_decode(file_get_contents('php://input'));
    $result = updateMessageData($_REQUEST, ROOT_PATH);

    if($result){
        print(json_encode($result));
    }
    else {
        http_response_code(503);
    }
?>