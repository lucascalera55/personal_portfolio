<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST["nome"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $messaggio = htmlspecialchars($_POST["messaggio"]);

    $destinatario = "lucascalera1vr@gmail.com";
    $oggetto = "Nuovo Messaggio dal Portfolio di Luca Scalera";
    
    $corpo_email = "Hai ricevuto un nuovo messaggio dal modulo contatti.\n\n";
    $corpo_email .= "Nome: $nome\n";
    $corpo_email .= "Email: $email\n";
    $corpo_email .= "Messaggio:\n$messaggio\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($destinatario, $oggetto, $corpo_email, $headers)) {
        echo "<script>alert('Messaggio inviato con successo!'); window.location.href='index.html';</script>";
    } else {
        echo "<script>alert('Errore nell'invio del messaggio.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('Accesso non autorizzato.'); window.location.href='index.html';</script>";
}
?>
