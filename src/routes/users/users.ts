import { Router, Request, Response } from 'express';

import * as UserService from '../../data-access/services/user-service';

const usersRouter = Router();

usersRouter
.get('/get-all-clients', async (req: Request, res: Response) => {
    const { data, error } = await UserService.getAllClients();

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})
.get('/get-client/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await UserService.findUserById(id);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})
.post('/create-client', async (req: Request, res: Response) => {
    const { data, error } = await UserService.createClient(req.body);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})

export { usersRouter};