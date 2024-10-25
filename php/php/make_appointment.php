<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

$name = $_POST['name'];
$phone = $_POST['phone'];
$date = $_POST['appointment_date'];
$service = $_POST['service'];
$textarea = $_POST['comments'];

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();
$mail->Host = 'smtp.yandex.ru';
$mail->SMTPAuth = true;
$mail->Username = 'mustafacoder@yandex.ru';
$mail->Password = 'saxoufnxjgizamfe';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
 
$mail->setFrom('mustafacoder@yandex.ru', "Mustafa");
$mail->addAddress('diertojiev@yandex.ru', 'User');
$mail->isHTML(true);

$mail->Subject ='Сайт';

$html_content = file_get_contents('../html/make_appointment.php.html');
if ($html_content === false) {
    die('Не удалось прочитать файл HTML');
}

$html_content = str_replace('{NAME}', $name, $html_content);
$html_content = str_replace('{PHONE}', $phone, $html_content);
$html_content = str_replace('{DATE}', $date, $html_content);
$html_content = str_replace('{SERVICE}', $service, $html_content);
$html_content = str_replace('{TEXTAREA}', $textarea, $html_content);

$mail->Body = $html_content;

header('Content-Type: application/json');
echo json_encode(['message' => 'Данные успешно отправлены']);

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>