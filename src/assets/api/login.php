<?php
    header('Content-Type: application/json');

    define("ROOT_PATH","../../../");
    require_once(ROOT_PATH.'php/helper.php');

    $_REQUEST = json_decode(file_get_contents('php://input'));
    $result = login($_REQUEST, ROOT_PATH);
    
    if($result){
        $key = array('key'=>$result);
        echo json_encode($key, JSON_PRETTY_PRINT);
    }
    else {
        $error = array('error'=>true);
        http_response_code(401);
        echo json_encode($error, JSON_PRETTY_PRINT);
    }
?>
