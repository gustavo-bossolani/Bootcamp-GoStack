import * as Yup from 'yup';
import User from '../models/User';
import Appointment from '../models/Appointment';

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
        const checkisProvider = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!checkisProvider) {
            return resp.status(401).json({
                error: 'Agendamentos só podem ser criados com colaboradores.',
            });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        return resp.json(appointment);
    }
}

export default new AppointmentsController();
