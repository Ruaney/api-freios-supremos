<h3 align="center">
  Backend <b>Freios Supremos<b>
</h3>

<p align="center">
  <a href="#pushpin-test-drive">Test Drive</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-ferramentas-utilizadas">Ferramentas Utilizadas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pushpin-testes">Testes</a>
</p>

## :pushpin: Test Drive
Voce pode testar a api clicando [aqui](https://evening-reaches-79490.herokuapp.com/).

## :pushpin: Ferramentas Utilizadas
* [Nodejs](https://nodejs.org/en/) -> Runtime JavaScript
* [Typescript](https://www.typescriptlang.org/) -> Superset JavaScript
* [Express](https://expressjs.com/pt-br/) -> Web Framework
* [Mongoose](https://mongoosejs.com/) -> Mongo Driver
* [Jest](https://jestjs.io/) -> Test runner
* [Ajv](https://ajv.js.org/) -> Validador de JSON

## :pushpin: Endpoints

### :small_blue_diamond: **Company**
* Content-Type: application/json

Method   | URI    | Body | Query      | Descrição
--------- | ------| ------- | ---------- | --------
POST | /company    | name |            | Cria uma nova empresa
GET | /company     ||            | Busca todas empresas
GET | /company/:id ||            | Busca empresa por id
PUT | /company/:id |name|            | Atualiza dados de uma empresa
DELETE | /company/:id ||         | Deleta uma empresa
_____

### :small_blue_diamond: **Company Unity**
* Content-Type: application/json

Method   | URI   | Body | Query | Descrição
--------- | ------ | ----- | ------ | -----
POST | /companyunity| name, address, company |      | Cria uma nova unidade
GET | /companyunity | | company     | Busca todas unidades (use a query company com o id para filtrar unidades de uma empresa)
GET | /companyunity/:id ||   | Busca unidade por id
PUT | /companyunity/:id| name, address, company |   | Atualiza dados de uma unidade
DELETE | /companyunity/:id| || Deleta uma unidade
POST   | /companyunity/:id/machines| | | Adiciona uma máquina (ativo) a uma unidade
DELETE | /companyunity/:id/machines/:machineId || | Remove uma máquina (ativo) de uma unidade
_____
### :small_blue_diamond: **Machine Model**
* Content-Type: application/json

Method   | URI   | Body | Query | Descricao
--------- | ------| ----- | ----- | ------
POST | /machinemodel | name, description |     | Cria uma novo modelo
GET | /machinemodel | |     | Busca todos os modelos
GET | /machinemodel/:id | |  | Busca modelo por id
PUT | /machinemodel/:id | name, description |   | Atualiza dados de um modelo
DELETE | /machinemodel/:id | || Delete um modelo 
_______
### :small_blue_diamond: **User**
* Content-Type: application/json

Method   | URI   | Body | Query   | Descrição
--------- | ------ | ----- | ----- | ------
POST | /user | name |           | Cria um novo usuario
GET | /user  |   |          | Busca todos os usuarios
GET | /user/:id | |         | Busca usuario por id
PUT | /user/:id | name |        | Atualiza dados de um usuario
DELETE | /user/:id | |      | Deleta um usuario
______
### :small_blue_diamond: **Machine**
* Content-Type: multipart/form-data

Method    | URI    | Body | Query      | Descrição
--------- | ------ | ------ | ------ | ------
POST | /machine | name, description, model, responsable, image (binario)  |        | Cria uma nova máquina (ativo)
GET | /machine  |   |        | Busca todas máquinas 
GET | /machine/:id | |       | Busca uma máquina por id
PUT | /machine/:id | name, description, model, responsable, image (binario) |      | Atualiza dados de uma máquina
DELETE | /machine/:id ||     | Deleta uma máquina
GET | /machine/:id/image ||  | Retorna imagem da máquina (ativo)

## :pushpin: Testes
Os testes podem ser executados executando o comando `npm test`
### Printscreen da execução dos testes
![tests image](testsExecution.png)

---
<h4 align="center">
  <p>Feito por <b>Carlos Eduardo<b></p>
  <a href="https://www.linkedin.com/in/caeduob/"> Linkedin </a> | <a href="https://www.instagram.com/car_losed/">Instagram</a> <br><br>
  💜 
</h3>
