import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
    async store(req, resp) {
        // Adicionando um esquema de requisição
        // Configurando o tipo dos campos e suas validações
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ error: 'Erro de validação.' });
        }

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
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
            avatar_id: Yup.number()
                .integer()
                .moreThan(0, 'Identificador de avatar inválido.'),
        });

        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ error: 'Erro de validação.' });
        }

        // Verificando id do avatar
        const { avatar_id: avatar } = req.body;
        if (avatar) {
            const file = await File.findByPk(avatar);
            if (!file)
                return resp
                    .status(400)
                    .json({ error: 'Identificador de avatar inválido.' });
        }

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
