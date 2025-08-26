# API de Transferências

Esta API permite registro, login, consulta de usuários e transferências de valores entre usuários, com regras básicas de negócio. O banco de dados é em memória.

## Instalação

1. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```
2. Inicie o servidor:
   ```bash
   node server.js
   ```

## Endpoints

- `POST /register` — Registra um novo usuário
- `POST /login` — Realiza login
- `GET /users` — Lista usuários
- `POST /transfer` — Realiza transferência
- `GET /transfers` — Lista transferências
- `GET /api-docs` — Documentação Swagger

## Regras de Negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.

## Testes
Para testar com Supertest, importe o `app.js` em seu teste sem executar o método `listen()`.

## Documentação
Acesse `/api-docs` para visualizar a documentação Swagger.
