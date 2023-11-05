<?php
require 'env.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // server settings
        $mail->isSMTP();
        $mail->Host       = $mailServer;
        $mail->Port       = $mailPort;
        $mail->SMTPAuth   = true;
        $mail->Username   = $mailUsername;
        $mail->Password   = $mailPassword;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // addresses
        $mail->setFrom($mailSender, $mailSenderName);
        $mail->addAddress($mailReceiver, $mailReceiverName);
        $mail->addReplyTo($email, $name);

        // content
        $mail->isHTML(true);
        $mail->Subject    = "New message";
        $mail->Body       = <<<EOD
            <h1>New message from the contact form</h1>
            <p>
                <b>Name</b>: <em>$name</em><br />
                <b>Subject</b>: <em>$subject</em><br />
                <b>Message</b>: <em>$message</em>
            </p>
            <hr />
            <p>Reply to this E-Mail to send a message to <em>$name</em>.</p>
        EOD;
        $mail->AltBody    = <<<EOD
            New message from the contact form:
            
            Name: $name
            Subject: $subject
            Message: $message
            
            Reply to this E-Mail to send a message to $name.
        EOD;

        $mail->send();

        header("location: /?message_sent");
    } catch (Exception $ex) {
        header("location: /?send_error=" . urlencode($mail->ErrorInfo));
    }
}