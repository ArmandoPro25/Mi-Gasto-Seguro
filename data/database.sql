DROP DATABASE IF EXISTS MiGastoSeguro;
CREATE DATABASE MiGastoSeguro;
USE MiGastoSeguro;

CREATE TABLE User (
    Id_User INT PRIMARY KEY AUTO_INCREMENT,
    Name_User VARCHAR(20) NOT NULL,
    Email_User VARCHAR(50) NOT NULL UNIQUE,
    Password_User VARCHAR(20) NOT NULL,
    Type_User INT,
    VerificationCode VARCHAR(6),
    Verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE PersonalExpenses {
    Id_User INT NOT NULL,
    Id_PersonalExpenses INT PRIMARY KEY AUTO_INCREMENT,
    DescriptionExpense VARCHAR(30) NOT NULL,
    AmountExpense DECIMAL(2) NOT NULL,
    TimeExpense DATETIME NOT NULL,
    PlaceExpense VARCHARi(100) NOT NULL
}