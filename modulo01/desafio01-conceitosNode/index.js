const express = require('express');

const server = express();
server.use(express.json());

// Variavel simulando BD
const projects = [];



// ---------------------- MIDDLEWARES ---------------------- 

function verificaID(req, resp, next) {
    const { id } = req.params;

    const project = projects.find(project => project.id == id);

    if (!project)
        return resp.status(400).json({ erro: 'Identificador não existe.' });
    return next();
}

// Middleware Global
server.use((req, resp, next) => {
    console.time('Tempo de Requisicao');
    console.count("\nRequisições...");
    console.log("Método..." + req.method);
    console.log("Url..." + req.url);
    next();
    console.log("Status..." + resp.statusCode);
    console.timeEnd('Tempo de Requisicao');
});

function incrementaID(req, resp, next) {
    req.body.id = projects.length;
    next();
}


// ---------------------- ROTAS ---------------------- 

// Retornando todos Projetos
server.get('/projects', (req, resp) => {
    return resp.json(projects);
});

/**
 * Request body: id, title
 * Cadastro de um novo Projeto.
 */
server.post('/projects', incrementaID, (req, resp) => {

    const { id } = req.body;
    const { title } = req.body;

    project = {
        id,
        title,
        tasks: []
    }
    projects.push(project)
    return resp.json(project);
});

/**
 * Route params: id
 * Request body: title
 * Alterando o título do projeto.
 */
server.put('/projects/:id', verificaID, (req, resp) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title = title;
    return resp.send(projects[id]);
});

/**
 * Route params: id
 * Deleta um projeto de acordo com o ID.
 */
server.delete('/projects/:id', verificaID, (req, resp) => {
    const { id } = req.params;
    projects.splice(id, 1);
    return resp.send("Deletado.");
});

/**
 * Route params: id
 * Request body: task
 * Adiciona uma nova tarefa em um Projeto
 */
server.post('/projects/:id/tasks', verificaID, (req, resp) => {

    const { id } = req.params;
    const { task } = req.body;

    projects[id].tasks.push(task);
    resp.send(projects[id]);
});

server.listen(3000);