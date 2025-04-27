<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini al
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    
    // E-posta ayarları
    $to = "tahadulger10@gmail.com";
    $subject = "Yeni İletişim Formu Mesajı";
    
    // E-posta içeriği
    $email_content = "Yeni bir iletişim formu mesajı aldınız:\n\n";
    $email_content .= "İsim: " . $name . "\n";
    $email_content .= "Telefon: " . $phone . "\n";
    $email_content .= "Mesaj: " . $message . "\n";
    
    // E-posta başlıkları
    $headers = "From: " . $to . "\r\n";
    $headers .= "Reply-To: " . $to . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // E-postayı gönder
    if (mail($to, $subject, $email_content, $headers)) {
        echo "Mesajınız başarıyla gönderildi!";
    } else {
        echo "Mesaj gönderilirken bir hata oluştu.";
    }
}
?> 