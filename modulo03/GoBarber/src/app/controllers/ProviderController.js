import User from '../models/User';
import File from '../models/File';

class ProviderController {
    async index(req, resp) {
        const providers = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'name', 'path', 'url', 'url_teste'],
                },
            ],
        });

        return resp.json(providers);
    }
}

export default new ProviderController();
