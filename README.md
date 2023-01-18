<h1 align=center> PayLoad System</h1>

<h2> O que é o projeto? </h2>

<p> O projeto é uma API para pagamentos desenvolvida para aprender novas tecnologias, sistemas de cadastro/login de usuários e de transferências entre os mesmos, obedecendo regras de negócio. Algumas partes foram feitas pensando em facilitar o estudo, não no uso final, como, por exemplo, a declaração do saldo de um usuário juntamente com o cadastro.</p>

<h2> Funcionalidades </h2>

<h3> Usuários </h3>

<h4> Cadastro </h4>

<p> Rota: user/create </p>

<p> Corpo da requisição (.json): </p>

```json
{
  "name": "Luis Cláudio",
  "email": "test@test.com",
  "password": "testPassword",
  "birth": "MM/DD/YYYY",
  "shopkeeper": true or false,
  "balance": 5000,
  "cpfOrCnpj": "3777311677"
}
```

<p>
  Regras:
  <ul>
    <li> E-Mail válido e único no sistema. </li>
    <li> CPF ou CNPJ válido e único no sistema. </li>
    <li> Usuário maior de 18 anos. </li>
  </ul>
</p>

<h4> Login </h4>

<p> Rota: session/ </p>

<p> Input: </p>

```json
{
  "email": "test@test.com",
  "password": "testPassword"
}
```

<p> Retorna o Bearer Token usado para todas as próximas requisições. </p>

<h4> Listagem dos usuários </h4>

<p> Rota: user/list </p>

<p> Retorna todos os usuários registrados no banco de dados </p>

<h4> Removendo um usuário </h4>

<p> Rota: user/remove </p>

<p> Input: </p>

```json
{
  "id": "id padrão uuidv4"
}
```

<h3> Transações </h3>

<h4> Fazendo uma transação </h4>

<p> Rota: transaction/create </p>

<p> Input: </p>

```json
{
  "value": 100,
  "payerEmail": "test@test.com",
  "receiverEmail": "test2@test.com"
}
```

<p> 
  Regras:
  <ul>
    <li> Lojistas apenas recebem transações. </li>
    <li> O pagador deve ter saldo suficiente. </li>
    <li> A transação deve ser autorizada por um serviço externo. </li>
  </ul>
</p>

<p> Retorna os dados da transação e dos usuários envolvidos, envia um E-Mail aos dois notificando que foi feita.</p>

<h4> Revertendo a transação </h4>

<p> Rota: transaction/revert </p>

<p> Input: Id da transação em JSON</p>

<p> Retorna o valor de quem recebeu para quem pagou, só pode ser feita uma vez </p>

<h4> Listagem </h4>

<p> Rota: transaction/list </p>

<p> Retorna todas as transações já feitas, mesmo as revertidas. </p>

<h4> Removendo uma transação </h4>

<p> Rota: transaction/remove </p>

<p> Input: Id da transação </p>

<h2> Stack do projeto </h2>

<ul>
  <li> Linguagem: TypeScript </li>
  <li> FrameWork: Express </li>
  <li> Testes: Jest </li>
  <li> Banco de dados: PostgreSQL </li>
  <li> Cache: Redis </li>
  <li> ORM: TypeORM </li>
  <li> Encriptação: BCrypt </li>
  <li> Auth: JsonWebToken </li>
  <li> Envio de E-Mail: NodeMailer </li>
  <li> Injeção de dependências: TSyringe </li>
  <li> Git/Github </li>
  <li> Docker/Docker-compose </li>
</ul>

<h2> Status do projeto </h2>

<p> Ainda é necessário: </p>

<ul>
  <li> Criação do restante dos testes. </li>
  <li> Refatoração: Injeção de dependências e Single Responsibility Principle </li>
</ul>

<h2> Como executar? </h2>

<p> Atráves do docker-compose, para executar é necessário apenas os comandos: </p>

```
  docker-compose build
  docker-compose up
```

<p> Caso o docker-compose inicie os containeres em IP's diferentes, basta trocar nos arquivos de configuração do TypeORM, para ver os IP's: </p>

```
  docker network inspect payloadsys_default
```
