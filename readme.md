# 🎫 Tickets

> Tickets es una aplicación de gestión de tickets (helpdesk).

## Indice

* [Arquitectura del la aplicación](#archApp)
* [Pasos iniciales](#initApp)
* [Ejecutar la aplicación](#exeApp)

## <a name="archApp"></a> Arquitectura del la aplicación 🚀

La aplicación esta construida en **React** para el front-end, el cuál realiza consumo de microservicios API, desarrollados en **NodeJS** especificamente con **Express**, bajo una base de datos no relacional (noSql) gestionada en **MongoDB**.

### Librerias implementadas para complementar el desarrollo del back-end 📚

* [Express](https://expressjs.com/es/)
* [Joi](https://hapi.dev/)
* [JSON Web Token](https://jwt.io/)
* [Log4js-node](https://log4js-node.github.io/log4js-node/)
* [Mongoose](https://mongoosejs.com/)

## <a name="initApp"></a> Pasos iniciales 💻
Una vez clonado el proyecto, debemos movernos a la carpeta raiz, ejecutando el siguiente comando:

```sh
$ cd tickets-express
```

Luego necesitamos ejecutar el siguiente comando para instalar todas las librerias necesarias:

```sh
$ npm i
```

En el proyecto encontraremos un archivo .env.example, el cual debemos renombrar a .env y establecer los datos de autenticación de nuestra base de datos (en caso de poseerla protegida).

Antes de ejecutar la aplicación por primera vez, necesitamos restaurar la base de datos, para ello descargamos el archivo Dump en el siguiente link:  

[Dump Mongo](https://drive.google.com/file/d/1LnWWBQdqxP4TH67ikRd_0J1o9v1ws8ak/view?usp=sharing)

Descomprimimos el archivo .zip y procedemos a restaurar la base de datos, importandola.

### ¿Cómo importar una base de datos en MongoDB?

Para restaurar la base de datos, debemos ubicarnos en nuestro folder correspondiente mediante la terminal de comandos y ejecutar:

```sh
mongorestore --db=tickets_express dump/tickets_express
```

## <a name="exeApp"></a> Ejecutar la aplicación 🤓
Para arrancar la aplicación ejecutamos el siguiente comando:

```sh
$ npm run start
```