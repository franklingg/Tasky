
# Tasky

Tasky é uma ferramenta para gerenciamento de tarefas desenvolvida como desafio Trainee da Codex Jr.
Inicialmente, será desenvolvido o Backend da aplicação em **Node.js**.

## Utilização
Com o [Node.js](https://nodejs.org/en/) instalado na sua máquina, faça:
> `git clone https://github.com/franklingg/Tasky.git`  
>   
> `npm install`  
>   
> `npm start`  

## Estruturação
  Por se tratar de uma API simples e com poucos relacionamentos, utilizamos o **MongoDB** e sua conexão através do *Mongoose*.

  A API seguirá o padrão REST, com a uniformidade de URIs e seguindo o protocolo HTTP.
## Rotas

| Requisição | URI                   | Header    | Body                                   | Retorno                                           | HTTP Status (Success, Error) |
| ---------- | --------------------- | --------- |--------------------------------------- | ------------------------------------------------- | :--------------------------: |
| GET        | users/                | userToken |                                        | Retorna os dados do usuário                       | 200, 401                     |
| POST       | users/register        |           | name, email, password                  | Retorna o usuário criado                          | 201, 400                     |
| PUT        | users/logout          | userToken |                                        | Retira o acesso. Sem retorno.                     | 204, 401                     |
| GET        | tasks/                | userToken |                                        | Retorna a lista de tarefas                        | 200, 403                     |
| GET        | tasks/sort            | userToken |                                        | Retorna a lista de tarefas em ordem de prioridade | 200, 403                     |
| POST       | tasks/add             | userToken | name                                   | Retorna a tarefa criada                           | 201, 400                     |
| PUT        | tasks/update/:id      | userToken | name, highPriority                     | Retorna a tarefa atualizada                       | 200, 400                     |
| DELETE     | tasks/remove/:id      | userToken |                                        | Deleta a tarefa. Sem retorno                      | 204, 400                     |

### Módulos usados
  * [Bcrypt](https://www.npmjs.com/package/bcrypt): Para criptografia de senhas
  * [JWT](https://www.npmjs.com/package/jsonwebtoken): Para tokenização e cache.
