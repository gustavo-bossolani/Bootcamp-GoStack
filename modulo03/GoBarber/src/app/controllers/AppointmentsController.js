import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';
import File from '../models/File';

import Notification from '../schemas/Notification';

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

        if (req.userId === checkIsProvider.id) {
            return resp.status(401).json({
                error:
                    'Agendamentos só são possíveis com outros colaboradores.',
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

        // Notificando prestador de servico
        const user = await User.findByPk(req.userId);
        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', ás' H:mm'h'",
            { locale: pt }
        );

        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formattedDate}`,
            user: provider_id,
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

    async delete(req, resp) {
        const appointment = await Appointment.findByPk(req.params.id);

        if (appointment.user_id !== req.userId) {
            return resp.jsonstatus(401).json({
                error: 'Agendamento pode ser cancelado apenas pelo dono.',
            });
        }

        const dateWithSub = subHours(appointment.date, 2);

        if (isBefore(dateWithSub, new Date())) {
            return resp.jsonstatus(401).json({
                error:
                    'Agendamentos só podem ser cancelado com 2 horas de antecedência.',
            });
        }

        appointment.canceled_at = new Date();

        await appointment.save();

        return resp.json(appointment);
    }
}

export default new AppointmentsController();
