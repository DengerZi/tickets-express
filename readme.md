# 🎫 Tickets

> Tickets es una aplicación de gestión de tickets (helpdesk).

## Indice

* [Arquitectura del la aplicación](#archApp)
* [Pasos iniciales](#initApp)
* [Ejecutar la aplicación](#exeApp)
* [Datos de accesos para la aplicación](#dataAccess)

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

Debe indicar un mensaje de este estilo:

```sh
2020-06-07T19:17:18.790-0400    restoring tickets_express.roles from dump\tickets_express\roles.bson
2020-06-07T19:17:18.792-0400    no indexes to restore
2020-06-07T19:17:18.792-0400    finished restoring tickets_express.roles (2 documents, 0 failures)
2020-06-07T19:17:19.130-0400    restoring tickets_express.users from dump\tickets_express\users.bson
2020-06-07T19:17:19.135-0400    restoring indexes for collection tickets_express.users from metadata
2020-06-07T19:17:19.143-0400    restoring tickets_express.tickets from dump\tickets_express\tickets.bson
2020-06-07T19:17:19.159-0400    no indexes to restore
2020-06-07T19:17:19.159-0400    finished restoring tickets_express.tickets (3 documents, 0 failures)
2020-06-07T19:17:19.184-0400    finished restoring tickets_express.users (3 documents, 0 failures)
2020-06-07T19:17:19.184-0400    8 document(s) restored successfully. 0 document(s) failed to restore.
```

## <a name="exeApp"></a> Ejecutar la aplicación 🤓
Para arrancar la aplicación ejecutamos el siguiente comando:

```sh
$ npm run start
```

## <a name="dataAccess"></a> Datos de accesos para la aplicación 🔑
Podemos acceder a la aplicación con los siguientes datos:

* **Perfil administrador**
Correo electrónico: admin@mail.com
Contraseña: soyunadmin

* **Perfiles de usuarios**
  - Correo electrónico: user1@mail.com
    Contraseña: soyunuser
  - Correo electrónico: user2@mail.com
    Contraseña: soyunuser