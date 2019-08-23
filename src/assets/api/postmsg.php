<?php
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");//Dont cache
header("Pragma: no-cache");//Dont cache
header("Expires: Thu, 19 Nov 1981 08:52:00 GMT");//Make sure it expired in the past (this can be overkill)

$res['status'] = 0;
date_default_timezone_set('America/Toronto');

$message ="An inquiry was submitted from ".$_SERVER['REMOTE_ADDR']." on ".date('l jS \of F Y h:i:s A')."\r\n\r\n";
$_REQUEST = json_decode(file_get_contents('php://input'));
foreach ($_REQUEST as $key => $value) {
	$message .= ucfirst($key). " : ".$value."\r\n";
}

$headers = 'From: do_not_reply@thewan.ca' . "\r\n" .
		'Reply-To: leo@thewan.ca' . "\r\n" .
		'X-Mailer: PHP/' . phpversion();
if(isset($_REQUEST -> username) && isset($_REQUEST -> email) && isset($_REQUEST -> message)){
	$m = mail('leo.changliao@gmail.com', 'LCL Website Inquiry', $message, $headers);
}
if($m){
	$res['status'] =1;
}
else {
	http_response_code(503);
}
print(json_encode($res));
?>
