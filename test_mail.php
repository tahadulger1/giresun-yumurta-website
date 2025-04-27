<?php
// Test e-postası gönder
$to = "tahadulger10@gmail.com";
$subject = "PHP Mail Test";
$message = "Bu bir test e-postasıdır. Eğer bu mesajı alıyorsanız, PHP mail fonksiyonu çalışıyor demektir.";
$headers = "From: tahadulger10@gmail.com\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Test e-postası başarıyla gönderildi!";
} else {
    echo "E-posta gönderilemedi. Hata: " . error_get_last()['message'];
}
?> 