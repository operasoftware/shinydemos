<?php
$email = strip_tags($_POST['email']);
$data = $_POST['photo'];
$file = md5(uniqid()) . '.png';

// remove "data:image/png;base64," and save to file
file_put_contents($file, base64_decode(substr($data, strpos($data, ",")+1)));

/* compose message */
$message = "
<html>
<head>
  <title>Your Photobooth Snapshots</title>
</head>
<body>
  <p>Here are your Photobooth snapshots!</p>
  <img height=187 width=680 src=http://shinydemos.com/photo-booth/$file><br>
  <a href=http://shinydemos.com/photo-booth/download.php?file=$file>Download</a>
</body>
</html>
";

// To send HTML mail, the Content-type header must be set
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'From: shinydemos.com <noreply@opera.com>' . "\r\n";

// send email
mail($email, 'Your Photobooth Pictures', $message, $headers);
