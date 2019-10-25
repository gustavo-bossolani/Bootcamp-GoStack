const express = require('express');

// inicializando servidor
const server = express();

// Middleware global que intercepta todas as requisições
server.use((req, res, next) => {
    console.time('Requisição')
    console.log("Requisição chamda");
    console.log(`Método: ${req.method} : URL: ${req.url}`);

    next();

    console.timeEnd('Requisição')
});

// Middleware necessário para verificar,
// se o campo obrigatório de nome está preenchido.
function checarBodyParams(req, resp, next) {
    if (!req.body.name)
        return resp.status(400).json({ erro: 'O Atributo nome é obrigatório.' });
    return next();
}

// Middleware necessário para verificar se o usuario,
// na posição informada existe. 
function checarUsuario(req, resp, next){
    const user = users[req.params.index];
    if(!user)
        return resp.status(400).json({ erro: 'O Atributo não existe neste index.' });
    req.user = user;
    return next();
}

// Especificando para o express que ele deverá ler arquivos do tipo JSON
server.use(express.json());

// Query params = ?teste=1 req.query.{nome-variavel}
// Route params = /users/1 req.params.{nome-variavel}
// Request body = { "name": "Gustavo" } req.body

const users = ['Mano', 'Mana', 'Jão', 'Maurício'];

// Listagem de Usuários
server.get('/users', (req, resp) => {
    return resp.json(users);
});

// Listagem de Usuários por ID
server.get('/users/:index', checarUsuario, (req, resp) => {
    return resp.json(req.user);
});

// Criação de Usuário
server.post('/users', checarBodyParams, (req, resp) => {
    const { name } = req.body;
    users.push(name);
    return resp.json(users);
});

// Edição de Usuário
server.put('/users/:index', checarBodyParams, checarUsuario, (req, resp) => {
    const { index } = req.params;
    const { name } = req.body;
    users[index] = name;
    return resp.json(users);
});

// Deletando Usuário por ID
server.delete('/users/:index', checarUsuario, (req, resp) => {
    const { index } = req.params;
    users.splice(index, 1);
    return resp.send();
});

// Indicando para o servido para escutar a porta 3000
server.listen(3000);