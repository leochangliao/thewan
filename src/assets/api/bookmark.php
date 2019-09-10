<?php
  header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");//Dont cache
  header("Pragma: no-cache");//Dont cache
  header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");//Make sure it expired in the past (this can be overkill)

  define("ROOT_PATH","../../../");
  require_once(ROOT_PATH.'php/helper.php');

  $_REQUEST = json_decode(file_get_contents('php://input'));
  $result = getBookmarks($_REQUEST, ROOT_PATH);
  if($result){
    echo json_encode($result, JSON_PRETTY_PRINT);
  }
  else {
    $error = array('error'=>true);
    http_response_code(401);
    echo json_encode($error, JSON_PRETTY_PRINT);
  }
?>
