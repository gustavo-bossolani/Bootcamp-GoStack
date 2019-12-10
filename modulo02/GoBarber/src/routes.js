import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, resp) => resp.json({ mensagem: 'Olá World!' }));

export default routes;
