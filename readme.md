----------------Step to Setup-------------------------------

1)npm init -y

2)npm i express

3)npm i nodemon      --> help to se the live output

4) go to package.json add this 

 "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }

* to install mongoose
  
npm i mongoose


*  Note ---> to use the (process.env,DATABASE_URL)
   npm i dotenv

*now to run the server
npm run dev

*----------------------------------------------------------*
npm i cookie-parser
npm jsonwebtoken
npm  i jsonwebtoken
npm i nodemailer
npm i otp-generator 
npm i bcrypt

*----------------------------------------------------------*
# Premiddleware & PostMiddleware
- Pre is used when we want to do the task before entering the data into the DB. and Post is wise versa.

here for OTP we are using premiddleware.

User --> data Enter --> mail Otp --> enter Otp --> Submit --> Entry in db