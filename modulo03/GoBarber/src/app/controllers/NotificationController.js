import Notification from '../schemas/Notification';

import User from '../models/User';

class NotificationController {
    async index(req, resp) {
        const checkIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkIsProvider) {
            return resp
                .status(400)
                .json({ error: 'Apenas para prestadores de Serviço.' });
        }

        const notifications = await Notification.find({
            user: req.userId,
        })
            .sort({ createdAt: 'desc' })
            .limit(20);

        return resp.json(notifications);
    }
}

export default new NotificationController();
