## APP Login Roles Angular

Sistema sencillo de autenticación con roles de usuario, desarrollado en Angular 11. El rol administrador tiene acceso a un menú desplegable para gestionar un CRUD de usuarios(suscriptores) y utilizar un filtro para buscarlos. Solo un administrador podrá autenticar nuevos usuarios ya sean otros administradores o suscriptores. El rol de suscriptores tendrá acceso a las secciones destinadas para ese rol, por supuesto limitadas a las del administrador.
Para el desarrollo de la api se utilizó node.js y typescript
Los campos del formulario para autenticarse y del CRUD cuentan con todas las validaciones y manejo de errores.

## Herramientas utilizadas para realización
-BOOTSTRAP-ANGULAR 11-ANGULAR MATERIAL-TYPE-ORM-MYSQL

## Ejecución del proyecto

Front-End: Dentro de la carpeta del proyecto ejecutar el comando "ng serve", luego en el navegador http://localhost:4200
Back-End: dentro de la carpeta de la api ejecutar el comando "npm run dev".

## Apariencia - Funcionamiento
![1one](https://github.com/Estiiven/login-angular-roles/assets/48731786/474e0a96-39c0-4002-ba23-f2f3408aa4d5)

![2 two](https://github.com/Estiiven/login-angular-roles/assets/48731786/2098fb70-391c-43b8-8d2a-11d0b5b3845f)

![3 three](https://github.com/Estiiven/login-angular-roles/assets/48731786/9851ad5c-280a-482f-88d3-5f770e840788)

![4 four](https://github.com/Estiiven/login-angular-roles/assets/48731786/00f71eec-ca56-4de7-a879-e375b91dd7b7)

![5 five](https://github.com/Estiiven/login-angular-roles/assets/48731786/173abe3d-179a-41d3-a114-f75f1c91c534)

![6 six](https://github.com/Estiiven/login-angular-roles/assets/48731786/c6b69ed8-28a6-43ea-adfd-cf5f47c0153b)

![7 seven](https://github.com/Estiiven/login-angular-roles/assets/48731786/cc684eed-d03a-4910-a6e1-4b61754abadd)

![8 eigth](https://github.com/Estiiven/login-angular-roles/assets/48731786/9fb54937-118a-46da-a322-8c913a8d9e84)

![9 nine](https://github.com/Estiiven/login-angular-roles/assets/48731786/2edb7a63-8f86-4203-9bfb-3d53c9669673)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

