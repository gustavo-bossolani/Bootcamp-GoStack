import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';

class AppointmentsController {
    async store(req, resp) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return resp.status(400).json({ error: 'Erro de validação.' });
        }

        const { provider_id, date } = req.body;

        // Checando se o provider_id é um provider
        const checkIsProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!checkIsProvider) {
            return resp.status(401).json({
                error: 'Agendamentos só podem ser criados com colaboradores.',
            });
        }

        // Checando se a data já passou
        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return resp
                .status(400)
                .json({ error: 'Datas passadas não são permitidas.' });
        }

        // Checando disponibilidade da data
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return resp
                .status(400)
                .json({ error: 'Essa data não está disponivel.' });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });

        return resp.json(appointment);
    }

    async index(req, resp) {
        // Recuperando a numeracao da pagina pelos query params
        const { page = 1 } = req.query;

        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: {
                model: User,
                as: 'provider',
                attributes: ['name', 'email'],
                include: {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'path', 'url'],
                },
            },
        });

        return resp.json(appointments);
    }
}

export default new AppointmentsController();
