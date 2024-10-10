DROP DATABASE IF EXISTS MiGastoSeguro;
CREATE DATABASE MiGastoSeguro;
USE MiGastoSeguro;

CREATE TABLE User (
    Id_User INT PRIMARY KEY AUTO_INCREMENT,                 -- ID del Usuario
    Name_User VARCHAR(20) NOT NULL UNIQUE,                  -- Nombre del Usuario
    Email_User VARCHAR(50) NOT NULL UNIQUE,                 -- Correo Electronico del Usuario
    Password_User VARCHAR(20) NOT NULL,                     -- Contraseña del Usuario
    Type_User INT,                                          -- Tipo de Usuario (Personal '1', Empresarial '2'
    VerificationCode VARCHAR(6),                            -- Código de Verificación
    Verified BOOLEAN DEFAULT FALSE                          -- Estado de Verificación
);

CREATE TABLE CategoryPersonal (
    Id_Category_Personal INT PRIMARY KEY AUTO_INCREMENT,    -- ID de la Categoría Personal
    CategoryPersonal VARCHAR(15) NOT NULL                   -- Nombre de la Categoría
);

CREATE TABLE CategoryBusiness (
    Id_Category_Business INT PRIMARY KEY AUTO_INCREMENT,    -- ID de la Categoría Empresarial
    CategoryBusiness VARCHAR(15) NOT NULL                   -- Nombre de la Categoría
);

CREATE TABLE PersonalExpenses (
    Id_User INT NOT NULL,                                   -- ID del Usuario
    Id_PersonalExpenses INT PRIMARY KEY AUTO_INCREMENT,     -- ID del Gasto
    Description_Expense VARCHAR(30) NOT NULL,               -- Descripción del Gasto
    Amount_Expense DECIMAL(10, 2) NOT NULL,                 -- Monto del Gasto
    Date_Expense DATETIME NOT NULL,                         -- Fecha del Gasto                      
    Place_Expense VARCHAR(100) NULL,                        -- Lugar del Gasto
    Payment_Method VARCHAR(30) NOT NULL,                    -- Metodo de Pago
    Frequency_Expenses VARCHAR(30) NULL,                    -- Frecuencía del Gasto
    Id_Category_Personal INT NOT NULL,                          -- ID de la Categoría               
    Notes VARCHAR(100) NULL,                                -- Notas Adicionales
    Ticket VARCHAR(100) NULL,                               -- Recibo del Gasto
    FOREIGN KEY (Id_User) REFERENCES User(Id_User),
    FOREIGN KEY (Id_Category_Personal) REFERENCES CategoryPersonal(Id_Category_Personal)
);

CREATE TABLE PersonalIncome (
    Id_User INT NOT NULL,                                   -- ID del Usuario
    Id_PersonalIncome INT PRIMARY KEY AUTO_INCREMENT,       -- ID del Ingreso
    Description_Income VARCHAR(30) NOT NULL,                -- Descripción del Ingreso
    Amount_Income DECIMAL(10, 2) NOT NULL,                  -- Monto del Ingreso
    Date_Income DATETIME NOT NULL,                          -- Fecha del Ingreso                         
    Place_Income VARCHAR(100) NOT NULL,                     -- Lugar del Ingreso
    Type_Income VARCHAR(30) NOT NULL,                       -- Tipo de Ingreso
    Source_Income VARCHAR(15) NULL,                         -- Fuente del Ingreso       
    FOREIGN KEY (Id_User) REFERENCES User(Id_User)
);

CREATE TABLE BusinessExpenses (
    Id_User INT NOT NULL,                                   -- ID del Usuario
    Id_BusinessExpenses INT PRIMARY KEY AUTO_INCREMENT,     -- ID del Gasto
    Description_Expense VARCHAR(30) NOT NULL,               -- Descripción del Gasto
    Amount_Expense DECIMAL(10, 2) NOT NULL,                 -- Monto del Gasto
    Date_Expense DATETIME NOT NULL,                         -- Fecha del Gasto
    Place_Expense VARCHAR(100) NOT NULL,                    -- Lugar del Gasto
    Id_Category_Business INT NOT NULL,                      -- ID de la Categoría
    Project VARCHAR(30) NULL,                               -- Proyecto del Gasto
    Frequency_Expenses VARCHAR(30) NULL,                    -- Frecuencia del Gasto
    Taxes DECIMAL(10, 2) NULL,                              -- Impuestos
    Ticket VARCHAR(100) NULL,                               -- Recicbo del Gasto
    FOREIGN KEY (Id_User) REFERENCES User(Id_User),
    FOREIGN KEY (Id_Category_Business) REFERENCES CategoryBusiness(Id_Category_Business)
);

CREATE TABLE BusinessIncome (
    Id_User INT NOT NULL,                                   -- ID del Usuario
    Id_BusinessIncome INT PRIMARY KEY AUTO_INCREMENT,       -- ID del Ingreso
    Description_Income VARCHAR(30) NOT NULL,                -- Descripción del Ingreso
    Amount_Income DECIMAL(10, 2) NOT NULL,                  -- Monto del Ingreso
    Date_Income DATETIME NOT NULL,                          -- Fecha del Ingreso
    Place_Income VARCHAR(100) NOT NULL,                     -- Lugar del Ingreso
    Source_Income VARCHAR(15) NULL,                         -- Fuente del Ingreso
    FOREIGN KEY (Id_User) REFERENCES User(Id_User)
);

CREATE TABLE Budget (
    Id_User INT PRIMARY KEY,                                -- ID del Usuario
    Total_Budget DECIMAL(10, 2),                            -- Presupuesto Total
    Actual_Budget DECIMAL(10, 2),                           -- Presupuesto Actual
    FOREIGN KEY (Id_User) REFERENCES User(Id_User)
);
