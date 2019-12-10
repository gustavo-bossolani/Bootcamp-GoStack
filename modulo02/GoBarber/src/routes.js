import { Router } from 'express';
import User from "./app/models/User";

const routes = new Router();

let teste = 0;
routes.get('/', async (req, resp) => {

    const user = await User.create({
        name: 'teste',
        email: 'teste@email.com',
        password_hash: '1312',
    });
    return resp.json(user);
});

export default routes;
