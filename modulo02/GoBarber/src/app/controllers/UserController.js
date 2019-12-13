import User from '../models/User';

class UserController {

    async store(req, resp) {
        const userExists = await User.findOne({ where: { email: req.body.email } });
        if (userExists) {
            return resp.status(400).json({ error: "Já existe usuário com este email." });
        }
        const user = await User.create(req.body);
        return resp.json(user);
    }

}
export default new UserController();