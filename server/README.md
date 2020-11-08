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
```bash
Body
```
```bash 
{ 
"email": String, // eg "mail@user.com"
"firstName": String, // eg "user1"
"password": String, eg "password"
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
```bash
{
	"token": "String", // JSON Web Token
	"user":  {
	"userId":  "String",
	"email":  "String",
	"country":  "String",
	"city":  "String",
	"state":  "String",
	"dateOfBirth": "String", // format "YYYY-MM-DD"
	"fiscalAct":  "String",
	"firstName":  "String",
	"lastName":  "String",
	"phoneNumber":  "String",
	"twoFactorActive":  false, // Boolean
	"role":  "String",
	"profile_picture_url":  "String", // url
	"hasConfigured":  false, // Boolean
	"permissions":  [
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
Body
	token: String // Your verification code
```
```bash 
Authorization:
	Type: Bearer Token // Your temporary basic login token
```

## Login with Two Factor Authentication (Mail Code)

```bash
POST /two-factor-mail
```
```bash
Body
	token: String // Your verification code
```
```bash 
Authorization:
	Type: Bearer Token // Your temporary basic login token
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


