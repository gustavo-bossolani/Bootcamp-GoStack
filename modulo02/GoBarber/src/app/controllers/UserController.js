import User from '../models/User';

class UserController {
    async store(req, resp) {
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });
        if (userExists) {
            return resp
                .status(400)
                .json({ error: 'Já existe usuário com este email.' });
        }
        const { id, name, email, provider } = await User.create(req.body);
        return resp.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(req, resp) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return resp
                    .status(400)
                    .json({ error: 'Usuário já existe com este email.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return resp
                .status(401)
                .json({ error: 'A senha informada é diferente.' });
        }

        const { id, name, provider } = await user.update(req.body);

        return resp.json({
            id,
            name,
            email,
            provider,
        });
    }
}
export default new UserController();
