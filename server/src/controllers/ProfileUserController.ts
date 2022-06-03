import { ProfileUserService } from './../services/ProfileUserService';
import { Request, Response } from "express";

export class ProfileUserController {
    async handle(req: Request, res: Response) {
        const {user_id} = req;

        const service = new ProfileUserService();

        const result = await service.execute(user_id);
        
        return res.json(result);
    }
}