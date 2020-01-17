import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        console.log(data);

        // Enviando Email para o provider indicando cancelamento
        // Adicionando template de email
        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento Cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    appointment.date,
                    "'dia' dd 'de' MMMM', ás' H:mm'h.'",
                    { locale: pt }
                ),
            },
        });
    }
}

export default new CancellationMail();
