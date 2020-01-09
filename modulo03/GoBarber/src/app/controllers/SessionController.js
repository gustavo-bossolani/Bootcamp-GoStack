import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, resp) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ error: 'Erro de validação.' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return resp
                .status(401)
                .json({ error: 'Usuário não foi encontrado.' });
        }

        if (!(await user.checkPassword(password))) {
            return resp.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, name } = user;

        return resp.json({
            user: {
                id,
                name,
                email,
            },
            // estudogobarberrocketseat
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}
export default new SessionController();
