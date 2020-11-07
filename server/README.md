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

# Signup
Signup method using Authorization base URL
```bash
POST /sign-up
```
```bash
Body
```
```bash 
{ 
"email": "jorge_28cs@hotmail.com", 
"firstName": "user1", 
"password": "password", 
"country": "Mexico" 
}
```

If the request are success you get the next JSON:
```json
{
"data":  "5f6d0d4c88305b0017a18992",
"message":  "User created"
}
```

# Login
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
```json
{
"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEMEZXIiwiZW1haWwiOiJsdWlzc29sQGhvdG1haWwuY29tIiwicm9sZSI6IlN1cGVyQWRtaW5pc3RyYWRvciIsImlhdCI6MTYwNDc3ODI0NCwiZXhwIjoxNjA0ODY0NjQ0fQ.lkgBtnO_cG7mxYg9jcxdthIkzyrF7nzxuyyQmxN0V0I",
	"user":  {
	"userId":  "D0FW",
	"email":  "luissol@hotmail.com",
	"country":  "DOM",
	"city":  "Santo Domingoo",
	"state":  "Rep. Dom.",
	"dateOfBirth":  "1990-10-28",
	"fiscalAct":  "PM",
	"firstName":  "Jorge Manuel",
	"lastName":  "Carrión Soto",
	"phoneNumber":  "809222222232222964",
	"twoFactorActive":  false,
	"role":  "SuperAdministrador",
	"profile_picture_url":  "https://sifap-profile-pictures.s3.us-east-2.amazonaws.com/1603335901083.jpeg",
	"hasConfigured":  false,
	"permissions":  [
		{
		"idPermission":  1,
		"name":  "C. Países",
		"urlIcon":  "https://i.imgur.com/scXlLPP.png"
		},
		{
		"idPermission":  2,
		"name":  "Emitir Facturas",
		"urlIcon":  "https://i.imgur.com/8vHGhJC.png"
		},
		{
		"idPermission":  3,
		"name":  "Historial",
		"urlIcon":  "https://i.imgur.com/1Q7pyNx.png"
		},
		{
		"idPermission":  4,
		"name":  "Estadísticas",
		"urlIcon":  "https://i.imgur.com/gR5N7zW.png"
		},
		{
		"idPermission":  5,
		"name":  "Roles",
		"urlIcon":  "https://i.imgur.com/hGyPKaE.png"
		}
		]
	}
}
```
