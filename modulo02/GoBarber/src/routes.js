import { Router }  from 'express';


const routes = new Router();


routes.get('/', (req, resp) =>{
    return resp.json({ mensagem: "Olá World!" });
});



export default routes;