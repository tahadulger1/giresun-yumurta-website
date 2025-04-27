<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP ayarları
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tahadulger10@gmail.com';
        $mail->Password = 'nwhb lnlw mipz hgcq';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Türkçe karakter ve encoding desteği
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // Alıcı ve gönderici
        $mail->setFrom('tahadulger10@gmail.com', 'Giresun Yumurta');
        $mail->addAddress('tahadulger10@gmail.com');

        // Şık HTML e-posta içeriği
        $mail->isHTML(true);
        $mail->Subject = 'Yeni İletişim Formu Mesajı';
        $mail->Body = '
            <div style="font-family: Arial, sans-serif; background: #f8f9fa; padding: 30px;">
                <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 30px;">
                    <h2 style="color: #7BAE4F; border-bottom: 1px solid #eee; padding-bottom: 10px;">Yeni İletişim Formu Mesajı</h2>
                    <p><strong>İsim:</strong> '.htmlspecialchars($name).'</p>
                    <p><strong>Telefon:</strong> '.htmlspecialchars($phone).'</p>
                    <p><strong>Mesaj:</strong><br>'.nl2br(htmlspecialchars($message)).'</p>
                    <hr>
                    <p style="font-size:12px; color:#888;">Bu mesaj Giresun Yumurta web sitesi iletişim formundan gönderilmiştir.</p>
                </div>
            </div>
        ';

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Mesajınız başarıyla gönderildi!']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Geçersiz istek.']);
}
?> 