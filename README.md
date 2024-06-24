# FarmLord_BACK

### para rodar

```sh
    docker-compose up -d
```

```sh
    npm install 
```

```sh
    npx prisma migrate dev
```

```sh
    npm run dev
```

### [acessar em  http://localhost:3000 ](http://localhost:3000)


## Endpoints

### Registrar

http://localhost:3000/register

```bash
{ 
	"username": "username",
	"email": "mail@mail.com",
	"password": "123456789",
	"fullname": "full name"
}

```
retorno:
```bash
{ 
    "id": "UUID"
	"fullname": "full name"
	"username": "username",
	"email": "mail@mail.com"
}

```


### Login

http://localhost:3000/login

```bash
{
	"email": "mail@mail.com",
	"password": "123456789"
}
```
retorno:
```bash
{
	"id": "UUID",
	"email": "mail@mail.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzY2FhZmU2LTI1NTItNDk0NS04MGFkLWZmYTAyM2QxMjA3OCIsImVtYWlsIjoiZGFubmllbEBtYWlsLmNvbSIsImlhdCI6MTcxOTI1NzQ3MiwiZXhwIjoxNzE5MjY4MjcyfQ.llMIRsUzEjsIiX3Iv_lwtT6fvSb_3ddupdxAEned58Q"
}

```

