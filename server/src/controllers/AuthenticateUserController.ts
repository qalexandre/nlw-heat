import { AuthenticateUserService } from './../services/AuthenticateUserService';
import { Request, response, Response } from 'express'

export class AuthenticateUserController {
    async handle(req: Request, res: Response) {

        const { code } = req.body;

        const service = new AuthenticateUserService();

        try {
            const result = await service.execute(code);
            return res.json(result);
        } catch (error) {
            return res.json({ error: error.message })
        }

    }
}