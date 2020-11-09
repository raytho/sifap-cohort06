# Welcome to SIFAP API!

Hi! This is the public API to get and set information

# Introduction

All the responses and the request are in JSON format to keep it simple.
Versión 1.0

## API Hosts

1. To Authenticate and roles management
**[https://ancient-fortress-28096.herokuapp.com/api/auth](https://ancient-fortress-28096.herokuapp.com/api/auth)**
2. To Users management
**[https://ancient-fortress-28096.herokuapp.com/api/user](https://ancient-fortress-28096.herokuapp.com/api/user)**
3. To SuperAdmin functions
**[https://ancient-fortress-28096.herokuapp.com/api/superAdmin](https://ancient-fortress-28096.herokuapp.com/api/superAdmin)**

## Interact with the API 

Our recommendation to easy use of the API is with  **[Postman](https://www.postman.com/downloads/)** software.

## Status Codes
Our responses codes are based in HTTP Responses Codes
1. 200 OK.
2. 201 Created.
3. 400 Bad Request.
4. 401 Unauthorized.
5. 404 Not Found.
6. 500 Internal Server Error.

## Responses format
Always that you send a request you get a response in JSON format with the attribute **data** and code response 200.
If you have error in your request you get a JSON format with the attribute **error**.

# Authentication

## Signup
Signup method using Authorization base URL
```bash
POST /sign-up
```
```javascript
Body:
{ 
 "email": String, // eg "mail@user.com"
 "firstName": String, // eg "user1"
 "password": String, // eg "password"
 "country": String // eg "Mexico" 
}
```

If the request are success you get the next JSON:
```json
{
 "message":  "User created"
}
```

## Login
Signup method using Authorization base URL
```bash
POST /sign-in
```
```bash
Body
```
```bash 
Authorization:
 username: example@domain.com
 password: userpassword
```

If the request are success you get the next JSON:
```javascript
{
 "token": String, // JSON Web Token
 "user":  
  {
    "userId":  String,
    "email":  String,
    "country":  String,
    "city":  String,
    "state":  String,
    "dateOfBirth": String, // format "YYYY-MM-DD"
    "fiscalAct":  String,
    "firstName":  String,
    "lastName":  String,
    "phoneNumber":  String,
    "twoFactorActive":  Boolean, 
    "role":  "String",
    "profile_picture_url":  "String", // url
    "hasConfigured":  Boolean, 
    "permissions": Array 
     [
      {
       "idPermission":  "Number",
       "name":  "String",
       "urlIcon":  "String" // url
      },
      {
       "idPermission":  "Number",
       "name":  "String",
       "urlIcon":  "String" // url
      },
      {
       "idPermission":  "Number",
       "name":  "String",
       "urlIcon":  "String" // url
      },
      {
       "idPermission":  "Number",
       "name":  "String",
       "urlIcon":  "String" // url
      },
      {
       "idPermission":  "Number",
       "name":  "String",
       "urlIcon":  "String" // url
      }
     ]
 }
}
```

## Login with Two Factor Authentication (Google Authenticator)

When you enable two-factor authentication, (after authenticating with username and password) you need to send the verification code. You can get the verification code by email or by using Google Authenticator. If you choose Google Authenticator, you must use this endpoint.

```bash
POST /two-factor
```
```bash
Authorization:
 Type: Bearer Token // Your temporary basic login token
Body
 token: String // Your verification code
```

## Login with Two Factor Authentication (Mail Code)

```bash
POST /two-factor-mail
```
```bash
Authorization:
 Type: Bearer Token // Your temporary basic login token
Body
 token: String // Your verification code
```

## LogOut

```bash
POST /logout
```

```bash 
Authorization:
 Type: Bearer Token
```
# User Management

## Get QR Code 

Gets the QR code to be used with Google Authenticator when two-factor authentication is enabled

```bash
GET /settings/send-qr
```

```bash 
Authorization:
 Type: Bearer Token
```
Response:
```json
{
 "message": "data:image/png;base64"
}
```
## Tax Receipt Number Configuration 

Sets the configuration of the tax receipt number for sifap users according to the country of the SuperAdmin user.
You can set the value of cf (cfName, cf and increment) up to 10 places (starting at cf0).

```bash
POST /tax-receipt
```

```javascript 
Authorization:
 Type: Bearer Token

Body: 

{
 "country": String, // MEX || COL || DOM
"fiscalIdentifierName": String, // eg "RFC"
"separator": String (Simblol), // eg "-"
"cfName":
 {
  "nameCf0": String,
  "nameCf1": String
 },
"cf":
 {
  "cf0":String,
  "cf1":String,
 },
"increment":
 {
  "increment0":false, // Boolean
  "increment1":true // Boolean
 }
}
```
## Set user profile 

In this endpoint you can set or update the user's profile data.

```javascript
POST /data/profile
```

```javascript 
Authorization:
 Type: Bearer Token

Body: 

{
 "fiscalId": String,
 "companyName": String,
 "phoneNumber": String,
 "firstName": String,
 "lastName": String,
 "dateOfBirth": String, // "YYYY-MM-DD"
 "city": String,
 "state": String,
 "country": String,
 "twoFactorActive": Boolean
}
```
## Set user profile image

In this endpoint you can set or update the user's profile image.

```bash
POST /data/profile-image
```

```bash 
Authorization:
 Type: Bearer Token

Body: 
 form-data
  key: image,
  value: jpg/png image
```
## Get user clients list

```bash
GET /clients
```
```bash 
Authorization:
	Type: Bearer Token
```
Response:
```javascript
{
 "clients": Array 
  [{
    "clientId": String,
    "userId": String,
    "fiscalId": String,
    "fiscalAddress": String,
    "email": String,
    "phoneNumber": String,
    "fullName": String
  }],
}
```

## Get user client detail

```bash
GET /clients/:id
```
```bash 
Authorization:
 Type: Bearer Token
```
Response:
```javascript
{
 "client": 
  {
   "clientId": String,
   "userId": String,
   "fiscalId": String,
   "fiscalAddress": String,
   "email": String,
   "phoneNumber": String,
   "fullName": String
  },
}
```

## Create client

```bash
POST /clients
```
```javascript 
Authorization:
 Type: Bearer Token
Body:
{
 "fiscalId": String,
 "fiscalAddress": String,
 "email": String,
 "phoneNumber": String,
 "fullName": String
}
```


## Update client

```bash
PUT /clients/:id
```
```javascript 
Authorization:
 Type: Bearer Token
Body: 
{
 "fiscalId": String, // Optional
 "fiscalAddress": String, // Optional
 "email": String, // Optional
 "phoneNumber": String, // Optional
 "fullName": String // Optional
}
```


## Delete client

```bash
DELETE /clients/:id
```
```bash 
Authorization:
 Type: Bearer Token
```

## Create Invoice

```bash
POST /invoices
```
```javascript 
Authorization:
 Type: Bearer Token
Body:
{
 "client": {
   "fullName": String,
   "fiscalId": String,
   "phoneNumber": String,
   "email": String,
   "fiscalAddress": String
 }, 
 "currency": String,
 "cfdiUse": String,
 "ivaPorcent": String,
 "products": Array 
  [
   {
    "description": String,
    "id": String,
    "price": String,
    "product": String,
    "quantity": String,
    "total": String,
    "unit": String
   },
  ]
}
```

Response:
```javascript
{
 "message": "Factura generada correctamente",
 "invoiceUrl": String // url
}
```
## Get invoice history

```bash
GET /invoice-history
```
```bash 
Authorization:
 Type: Bearer Token
```
Response:
```javascript
{
 "invoices": Array
  [
   {
    "createdAt": Date,
    "fullName": String,
    "fiscalId": String,
    "url": String
   }
  ]
}
```

## Built With

* [NodeJS](https://nodejs.org/en/) - The Engine
* [javascript - ES2017](https://maven.apache.org/) - The Language

## Contributers

* **Raymundo Solis** - *Collaborator* - [GitHub Profile](https://github.com/raytho)
* **Jorge Carrión** - *Collaborator* - [GitHub Profile](https://github.com/george28cs)

## License

This project is licensed under the MIT License
