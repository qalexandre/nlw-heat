import { CreateMessageService } from './../services/CreateMessageService';
import { Request, Response } from "express";

export class CreateMessageController {
    async handle(req: Request, res: Response) {
        const { message } = req.body;
        const { user_id} = req;

        const service = new CreateMessageService();

        const result = await service.execute(message,user_id);
        
        return res.json(result);
    }
}