# Estructura y métodos del proyecto (BackEnd)!

En ésta sección se proponen las rutas y métodos a utilizar en el proyecto.
Siéntanse libres de proponer una mejor estructura y/o nomenclatura.
# rutas
##	/login

		Métodos:
		- validateFields
		- validateUser
		- validatePassword
		- validateSecondAuthFactor
		- manageSession
##	/register
		Métodos:
		- validateFields
		- passwordStrengthCheck
		- validateSecondAuthFactor
		- saveUserData
		- sendActivationMail
##	/reset-password
		Métodos:
		- mailValidation
		- sendResetMail
		- passwordStrengthCheck
		- validateSecondAuthFactor
		- updatePassword
##	/user/<user_name>/
		Métodos:
		- sendCountryTemplateID
		- generateTaxIdentNumber
		- validateClientsData	
		- getTaxId  // Acá se conectará a la API de simulación
		- sendInvoiceData
		- saveInvoiceData
	
##	/user/<user_name>/profile
		- validateUserData
		- saveUserData
##	/user/<user_name>/history
		- getInvoiceHistory
## /user/<user_name>/stats
		-getStats 
## 	/super-admin/
		- manageAdministrators
		- getRole
		- SetRole
		- UpdateRole
		- createAdmin
		- removeAdmin
		- updateAdmin
		- getAdmins
		- sendSuperAdminInvitation
		- checkDomain 
## /super-admin/stats
		-getStats 
##	/administrator/<user_name>/manage-users
		- getUserRole
		- SetUserRole
		- UpdateUserRole
		- createUser
		- removeUser
		- updateUser
		- getUsers
		- sendAdminInvitation  
		- checkDomain 
> La ruta administrador será para el super Administrador.  
> Además tendrá todos los métodos de usuario

## /administrator/<user_name>/regular-clients
		- addClient
		- removeClient
		- updateClient
		- getClient
## /administrator/<user_name>/stats
		-getStats 
## /help
		- searchTopic
		- getTopic
##	/API 
		- generateTaxID
> Para simulación de la generación # de comprobante fiscal.

# Pendiente
> Definir métodos de ChatBot
