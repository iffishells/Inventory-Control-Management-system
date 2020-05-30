DROP DATABASE IF EXISTS SHOP;

CREATE DATABASE IF NOT EXISTS SHOP;

USE SHOP;


CREATE TABLE `CUSTOMER` (
  `CUS_ID` INT NOT NULL AUTO_INCREMENT,
  `CUS_NAME` VARCHAR(40) ,
  `CUS_ADDRESS` VARCHAR(40) ,
  `CUS_GENDER`  ENUM ('M','F')  NOT NULL,
  CONSTRAINT `PK_Customer` PRIMARY KEY (`CUS_ID`)
);

CREATE TABLE `ROLES` (
  `ROLES_ID` INT NOT NULL AUTO_INCREMENT,
  `ROLES_NAME` VARCHAR(40) NOT NULL,
  `ROLL_DESCRIPTION` VARCHAR(40) NOT  NULL,
  CONSTRAINT `PK_Roles` PRIMARY KEY (`ROLES_ID`)
);

CREATE TABLE `PRODUCTS` (
  `PRODUCT_ID` INT NOT NULL AUTO_INCREMENT,
  `PRODUCT_NAME` INT NOT NULL,
  `STANDERD_PRICE` INT NOT NULL,
  `DESCRIPTION` VARCHAR(20) NOT NULL,
  `RETAIL_PRICE` INT NOT NULL,
  `CATEGORY_ID` INT ,
  `BRAND` VARCHAR(20) NOT NULL,
  CONSTRAINT `PK_Products` PRIMARY KEY (`PRODUCT_ID`),
  CONSTRAINT `fk_products_categories` 
      FOREIGN KEY(category_id )
      REFERENCES `PRODUCT_CATEGORIES`(`CATEGORY_ID`) 
      ON DELETE CASCADE
);
/*
CREATE TABLE `USER` (
  `USER_ID` INT  NOT NULL AUTO_INCREMENT,
  `USER_FNAME` VARCHAR(40)  NOT NULL,
  `USER_MOBILE_NO` VARCHAR(40) NOT NULL,
  `USER_EMAIL` VARCHAR(40) ,
  `USER_ADDRESS` VARCHAR(40) NOT NULL,
  `USER_LNAME` VARCHAR(40)  NOT NULL,
  `USER_GENDER` ENUM ('M','F')  NOT NULL,
  CONSTRAINT `PK_USER` PRIMARY KEY  (`USER_ID`)
);
CREATE TABLE `LOGIN` (
  `LOGIN_ID` INT NOT NULL  AUTO_INCREMENT,
  `ROLE_ID` INT NOT NULL,
  `LOGIN_USR_PS_ID` INT  NOT NULL,
  `PERMISSION_ID` INTEGER,
  CONSTRAINT `PK_LOGIN`  PRIMARY KEY (`LOGIN_ID`),
   CONSTRAINT `FK_ROLE_ID'S` 
      FOREIGN KEY(`ROLE_ID`)
      REFERENCES `ROLES` (`ROLE_ID`) 
      ON DELETE CASCADE,
CONSTRAINT `FK_LOGIN_USER_PSS_ID` foreign key (`LOGIN_USR_PS_ID`) references `LOGIN_USER_PSS` (`LOGIN_USR_PS_ID`) ON delete cascade ,
  CONSTRAINT `FK_PERMISSIONS_ID'S` 
      FOREIGN KEY(`PERMISSION_ID`)
      REFERENCES `PERMISSIONS` (`PERMISSION_ID`) 
      ON DELETE CASCADE

);
CREATE TABLE `LOGIN_USR_PSS`(
  `LOGIN_USR_PS_ID` INT AUTO_INCREMENT NOT NULL,
  `LOGIN_USERNAME` VARCHAR(40) NOT NULL,
  `USER_PASSWORD` VARCHAR(40) NOT NULL,
  CONSTRAINT `PK_LOGIN_USR_PSS` PRIMARY KEY (`LOGIN_USR_PS_ID`)
  );
*/

/*
CREATE TABLE `PURCHASE` (
  `CUS_ID` INT NOT NULL,
  `PAYMENT_ID` INT NOT NULL,
  `ORDER_ID` INT,
  `PRODUCT_ID` INT NOT NULL,

CONSTRAINT `fk_Customer` 
      FOREIGN KEY(CUS_ID)
      REFERENCES `CUSTOMER`(`CUS_ID`) 
      ON UPDATE CASCADE,
CONSTRAINT `fk_Payment` 
      FOREIGN KEY(PAYMENT_ID)
      REFERENCES `PAYMENT`(`PAYMENT_ID`) 
      ON DELETE CASCADE,

CONSTRAINT `fk_ORDER` 
      FOREIGN KEY(ORDER_ID)
      REFERENCES `ORDER`(`ORDER_ID`) 
      ON DELETE CASCADE,

CONSTRAINT `fk_PRODUCTS` 
      FOREIGN KEY(PRODUCT_ID)
      REFERENCES `PRODUCTS`(`PRODUCT_ID`) 
      ON DELETE CASCADE
);
*/

CREATE TABLE `USERS`(
`ID` INT NOT NULL AUTO_INCREMENT,
`USER_NAME` VARCHAR (40) NOT NULL,
`EMAIL` VARCHAR (40) NOT NULL,
`PASSWORD`VARCHAR (40) NOT NULL,
`TRN_DATE` DATETIME NOT NULL
);
CREATE TABLE `PAYMENT` (
  `PAYMENT_ID` INT  NOT NULL AUTO_INCREMENT,
  `PAYMENT_DATE` DATE NOT NULL,
  `PAYMENT_AMOUNT` INT NOT NULL,
  `PAYMENT_DESCRIPTION` VARCHAR(40) NOT NULL,
  CONSTRAINT `pk_payment` PRIMARY KEY  (`PAYMENT_ID`)
);

CREATE TABLE `ORDER` (
  `ORDER_ID` INT NOT NULL AUTO_INCREMENT,
  `CUS_ID` INT,
  `STATUS` VARCHAR(40) NOT NULL,
  `USER_ID` INT,
  `ORDER_DATE` DATE  NOT NULL,
  CONSTRAINT `pk_order` PRIMARY KEY (`ORDER_ID`),
  CONSTRAINT `fk_ORDER_customer` FOREIGN KEY (`CUS_ID`) REFERENCES `CUSTOMER`(`CUS_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_ORDER_user` FOREIGN KEY (`USER_ID`) REFERENCES `USER`(`USER_ID`) ON DELETE CASCADE
);

CREATE TABLE `PERMISSION` (
  `PERMISSION_ID` INT NOT NULL AUTO_INCREMENT,
  `ROLE_ID` INT NOT NULL,
  `PERMISSION_MODULE` VARCHAR(40) NOT NULL,
  `PERMISSION_NAME` VARCHAR(40) NOT NULL,
  CONSTRAINT `PK_PERMISSION` PRIMARY KEY  (`PERMISSION_ID`),
  CONSTRAINT `Fk_ROLES` FOREIGN KEY (`ROLE_ID`) REFERENCES ROLES (`ROLE_ID`) ON UPDATE CASCADE
);    

CREATE TABLE `CONTACTS` (
  `CONTACT_ID` INT NOT  NULL,
  `F_NAME` VARCHAR(20) NOT NULL,
  `L_NAME` VARCHAR(20) NOT NULL,
  `EMAIL` VARCHAR(40) ,
  `PHONE_NO` INTEGER(12),
  `CUS_ID` INTEGER,
 CONSTRAINT `PK_CONTACTS` PRIMARY KEY  (`CONTACT_ID`),
 CONSTRAINT `FK_CUSTOMERS` FOREIGN KEY (`CUS_ID`) REFERENCES CUSTOMER(`CUS_ID`) ON UPDATE CASCADE
);

CREATE TABLE `PRODUCT_CATEGORIES` (
  `CATEGORY_ID` INT AUTO_INCREMENT NOT NULL,
  `CATEGORY_NAME` VARCHAR(20) NOT NULL,
CONSTRAINT `PK_Product_categories` PRIMARY KEY (`CATEGORY_ID`)
);

CREATE TABLE `INVENTORIES` (
  `PRODUCT_ID` INT,
  `WAREHOUSE_ID` int,
  `QUANTITY` INTEGER,
  CONSTRAINT `FK_PRODUCT_ID` FOREIGN KEY  (`PRODUCT_ID`) REFERENCES PRODUCTS (PRODUCT_ID) ON UPDATE CASCADE,
   CONSTRAINT `FK_WAREHOUSE_invt_id` FOREIGN KEY  (`WAREHOUSE_ID`) REFERENCES WAREHOUSE (WAREHOUSE_ID) ON UPDATE CASCADE
 );

CREATE TABLE `WAREHOUSE` (
  `WAREHOUSE_ID` INT AUTO_INCREMENT NOT NULL,
  `WAREHOUSE_NAME` VARCHAR(40) NOT NULL,
  `LOCATION_ID` INT,
  CONSTRAINT `PK_WAREHOUSE_ID` PRIMARY KEY (`WAREHOUSE_ID`),
  CONSTRAINT `FK_LOCATION_ID` FOREIGN KEY (`LOCATION_ID`) REFERENCES LOCATIONS (`LOCATION_ID`) ON UPDATE CASCADE
);

CREATE TABLE `LOCATIONS` (
  `LOCATION_ID` INT AUTO_INCREMENT NOT NULL,
  `ADDRESS` VARCHAR(40) NOT NULL,
  CONSTRAINT   `PK_LOCAIONS` PRIMARY KEY  (`LOCATION_ID`),
 CONSTRAINT`FK_POSTAL_CODE` FOREIGN KEY (`POSTAL_CODE`) REFERENCES `POSTAL_CODES`(`POSTAL_CODE`) ON UPDATE CASCADE
);

CREATE TABLE `POSTAL_CODES` (
  `POSTAL_CODE` INT  NOT NULL,
  `CITY` VARCHAR(40) NOT NULL,
  CONSTRAINT `PK_POSTAL_CODES` PRIMARY KEY  (`POSTAL_CODE`)
);

CREATE TABLE `ORDER_ITEMS` (
  `ORDER_ID` INT ,
  `ORDER_ITEMS_ID` INT AUTO_INCREMENT NOT NULL,
  `PRODUCT_ID` INT,
  `QUANTITY` INT ,
  `UNIT_PRICE` INT ,
  CONSTRAINT `pk_order_ITM_ID`PRIMARY KEY (`ORDER_ITEMS_ID`),
  CONSTRAINT `fk_PRODUCTS_ID` FOREIGN KEY  (`PRODUCT_ID`) REFERENCES PRODUCTS(PRODUCT_ID)ON UPDATE CASCADE,
  CONSTRAINT `FK_ORDERS_ID`  FOREIGN KEY (`ORDER_ID`) REFERENCES ORDERS (ORDER_ID) ON  UPDATE CASCADE
);