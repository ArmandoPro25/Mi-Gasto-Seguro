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
    Description_Expense VARCHAR(30) NOT NULL,
    Amount_Expense DECIMAL(2) NOT NULL,
    Time_Expense DATETIME NOT NULL,
    Place_Expense VARCHARi(100) NOT NULL
};

CREATE TABLE PersonalIncome {
    Id_User INT NOT NULL,
    Id_PersonalIncome INT PRIMARY KEY AUTO_INCREMENT,
    Description_Income VARCHAR(30) NOT NULL,
    Amount_Income DECIMAL(2) NOT NULL,
    Time_Income DATETIME NOT NULL,
    Place_Income VARCHARi(100) NOT NULL
};

CREATE TABLE BusinessExpenses {
    Id_User INT NOT NULL,
    Id_BusinessExpenses INT PRIMARY KEY AUTO_INCREMENT,
    Description_Expense VARCHAR(30) NOT NULL,
    Amount_Expense DECIMAL(2) NOT NULL,
    Time_Expense DATETIME NOT NULL,
    Place_Expense VARCHARi(100) NOT NULL
};

CREATE TABLE BusinessIncome {
    Id_User INT NOT NULL,
    Id_BusinessIncome INT PRIMARY KEY AUTO_INCREMENT,
    Description_Income VARCHAR(30) NOT NULL,
    Amount_Income DECIMAL(2) NOT NULL,
    Time_Income DATETIME NOT NULL,
    Place_Income VARCHARi(100) NOT NULL
};