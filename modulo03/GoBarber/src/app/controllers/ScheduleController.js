import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
    async index(req, resp) {
        const provider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!provider) {
            return resp
                .status(401)
                .json({ error: 'Usuário não é um prestador de serviços.' });
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        startOfDay(parsedDate),
                        endOfDay(parsedDate),
                    ],
                },
            },
            order: ['date'],
        });

        return resp.json(appointments);
    }
}

export default new ScheduleController();
