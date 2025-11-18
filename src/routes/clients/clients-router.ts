import { Router, Request, Response } from 'express';

import * as ClientsService from '../../data-access/services/clients-service';

const clientsRouter = Router();

clientsRouter
.get('/get/all', async (req: Request, res: Response) => {
    const { data, error } = await ClientsService.getAllClients();

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})
.get('/get/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await ClientsService.findClientById(id);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})
.post('/create', async (req: Request, res: Response) => {
    const { data, error } = await ClientsService.createClient(req.body);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})
.put('/update/:clientId', async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const { data, error } = await ClientsService.updateClient(clientId, req.body);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json({ data });
})

export { clientsRouter };