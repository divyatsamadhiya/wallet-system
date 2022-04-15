# Wallet-system

### This wallet allows the users to perform following operations.

-   User can register themselves by creating their account using emailid. name and passowrd.
-   User can login using their credentials.
-   User can credit amount in the wallet.
-   User can debit amount from the wallet.
-   User can check their wallet balance.
-   User can check the transactions history of their wallet pagewise.

### Tech-stack used in this project

-   Node.js
-   Express.js
-   MySql database
-   Sequelize ORM

### Prerequisites for running this project

-   Nodejs version 16 above
-   MySql database setup in the local machine.
-   Postman for testing the api's

### Steps for running the project

1. Clone the git repo and open in vs code or any other editor.
2. Use "npm start" command in terminal to install all necessary packages.
3. Create a ".env" file in the same parent folder.
4. Add database's HOST, USER, PASSWORD, DATABASE (database name) PORT(on which you want to run the application) and JWT_SECRET (generate some random alphanumeric string) property and set their values.
5. Use "node index.js" in terminal by staying in parent folder to run the application.
6. Open postman and test the apis.

### Steps for testing in postman

1. After starting of server, open postman and import the postman collection file.
2. Run register user api first to create user account.
3. Try running debit or credit or any other api before running login, it will not be accessible.
4. Run login api and copy the token from response and use this token every time for every other call in auth as bearer token.
5. Try credit, debit and balance check api using auth token.
6. Try transaction history api using auth token, if transactions becomes more than 10, use "?page=2" at the end of api endpoint for pagination to check remaining transaction on other pages.
