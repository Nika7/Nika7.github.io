<?php
//открывает сессию
session_start();
//получить имя, которое ввёл пользователь
$name = $_POST["name"];
//получить email, которое ввёл пользователь
$email = $_POST["email"];
//получить сообщение, которое ввёл пользователь
$message = $_POST["message"];
//если пользователь правильно ввёл капчу
if ($_SESSION["code"] == $_POST["captcha"]) {
  //свой email (email, куда будут приходить сообщения)
  $emailTo = "dogdj@rambler.ru";
  //тема письма
  $subject = "Сообщение с формы обратной связи";
  //формируем тело письма
  //1. Полоска
  $body = "--------------------------------------\n";
  //2. Дата, когда сообщение пришло на сервер
  $body .= date("Y.m.d H:i")."\n";
  //3. Текст (заголовок)
  $body .= "Содержимое заполненных пользователем полей:\n";
  //4. Имя пользователя
  $body .= "Имя: ".$name."\n";
  //5. Email пользователя
  $body .= "Email: ".$email."\n";
  //6. Сообщение пользователя
  $body .= "Сообщение: \n".$message."\n";
  //7. Отправляем на почту
  $success = mail($emailTo, $subject, $body, "From: dogdj@rambler.ru \r\n");
  //7. Добавляем в конец файла message.txt 
  //$file = 'message.txt';
  //$success = file_put_contents($file, $body, FILE_APPEND | LOCK_EX);
  //8. Если действия были успешны, то отправляем "success"
  if ($success) {
    echo "success";
  }
  //иначе отправляем "invalid"
  else {
    echo "invalid";
  }
}
else {
  //если пользователь ввёл неправильную капчу, то отправляем "invalidcaptcha"
  echo 'invalidcaptcha';
}