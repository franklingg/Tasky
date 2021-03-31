
# Tasky

Tasky é uma ferramenta para gerenciamento de tarefas desenvolvida como desafio Trainee da Codex Jr.
Inicialmente, será desenvolvido o Backend da aplicação em **Node.js**.

## Utilização
Com o [Node.js](https://nodejs.org/en/) instalado na sua máquina, faça:
> `git clone https://github.com/franklingg/Tasky.git`  
> `npm install`  
> `npm start`  

## Estruturação
  Por se tratar de uma API simples e com poucos relacionamentos, utilizamos o **MongoDB** e sua conexão através do *Mongoose*.

  A API seguirá o padrão REST, com a uniformidade de URIs e seguindo o protocolo HTTP.
## Rotas

|     Requisição     | URI                                | Body                         | Retorno                                     | HTTP Status (Success, Error) |
| ------------------ | ---------------------------------- | ---------------------------- | ------------------------------------------- | ---------------------------- |
| GET                | produtos/                          |                              | Retorna todos os produtos existentes        | 200, 400                     |
| POST               | categorias/*:categoryId*/produtos/ | name, quantity, value, image | Retorna o produto criado                    | 201, 400                     |
| GET                | produtos/*:id*                     |                              | Retorna o produto com o id passado na URI   | 200, 404                     |
| PUT                | produtos/:id                       | name, quantity, value, image | Retorna o produto atualizado                | 200, 400                     |
| DELETE             | produtos/*:id*                     |                              | Deleta o produto. Sem retorno.              | 204, 400                     |
| GET                | categorias/                        |                              | Retorna todas as categorias existentes      | 200, 400                     |
| POST               | categorias/                        | name                         | Retorna a categoria criada                  | 201, 400                     |
| GET                | categorias/*:id*                   |                              | Retorna a categoria com o ID passado na URI | 200, 404                     |
| PUT                | categorias/*:id*                   | name                         | Retorna o produto atualizado                | 200, 400                     |
| DELETE             | categorias/*:id*                   |                              | Deleta a categoria. Sem retorno.            | 204, 400                     |

### Módulos usados
  * [Bcrypt](https://www.npmjs.com/package/bcrypt): Para criptografia de senhas
  * [JWT](https://www.npmjs.com/package/jsonwebtoken): Para tokenização e cache.
