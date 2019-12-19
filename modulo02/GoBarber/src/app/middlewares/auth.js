import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { decode } from 'punycode';
import authConfig from '../../config/auth';

export default async (req, resp, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return resp
            .status(401)
            .json({ erroo: 'Token não autorizado ou enviado.' });
    }

    // Usando desestruturação para ignorar o primeiro parâmetro
    // Padrão da lista: [Bearer, Token]
    const [, token] = authHeader.split(' ');

    try {
        // Chamando uma função simplificada retornada pelo primisify
        // decoded possui todos os Payloads do jwt
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;

        return next();
    } catch (error) {
        return resp.status(401).json({ error: 'Token Invalido.' });
    }
};
