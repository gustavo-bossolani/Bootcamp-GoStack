import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, resp) => {
    const user = await User.create(req.body);
    return resp.json(user);
});

export default routes;
