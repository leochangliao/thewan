<?php
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");//Dont cache
header("Pragma: no-cache");//Dont cache
header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");//Make sure it expired in the past (this can be overkill)

date_default_timezone_set('America/Toronto');

$_REQUEST = json_decode(file_get_contents('php://input'));

if(isset($_REQUEST -> username) && isset($_REQUEST -> email) && isset($_REQUEST -> message)){
    $newMessage = array(
		"username" =>$_REQUEST -> username,
		"email" => $_REQUEST -> email,
		"message" => $_REQUEST -> message,
		"timestamp" => time(),
		"date" => date('l jS \of F Y h:i:s A'),
		"remote_address" => $_SERVER['REMOTE_ADDR']
    );
    // read message data
    $filePath = "../../../data/message.json";
    if(file_exists($filePath)){
        $messageStr = file_get_contents($filePath);
    } else{
        $messageStr = "[]";
    }
    $messageStrJson = json_decode($messageStr, true);
    // insert news
    $messageStrJson[] = $newMessage;
    // write back
    $messageStr = json_encode($messageStrJson, JSON_PRETTY_PRINT);
    $updated = file_put_contents($filePath, $messageStr, LOCK_EX);
    $result = array(
    'status' => 1,
    'message' => 'success',
    'dataStored' => $newMessage
    );
}
if($updated){
	print(json_encode($result));
}
else {
	http_response_code(503);
}
?>