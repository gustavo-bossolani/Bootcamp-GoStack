import { Router }  from 'express';


const routes = new Router();


routes.get('/', (req, resp) =>{
    return resp.json({ mensagem: "Olá Mundo!" });
});



export default routes;