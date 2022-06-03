import { ProfileUserController } from './controllers/ProfileUserController';
import { GetLast3MessagesController } from './controllers/GetLast3MessagesController';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';
import { CreateMessageController } from './controllers/CreateMessageController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { Router } from 'express';

export const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

router.get("/messages/last3", new GetLast3MessagesController().handle);

router.get("/profile",ensureAuthenticated, new ProfileUserController().handle);