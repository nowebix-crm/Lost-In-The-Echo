import { Response } from 'express';

import * as ClientService from '../../business-logic/services/client-service';
import { AuthenticatedRequest } from '../middlewares/auth-middleware';

export const getAllClients = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const organizationId = req.user!.organizationId;

  const { success, data, error } =
    await ClientService.getAllClients(organizationId);

  if (!success) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const getClientById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { clientId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, data, error } = await ClientService.getClientById(
    clientId,
    organizationId
  );

  if (!success) {
    return res.status(404).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const createClient = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const organizationId = req.user!.organizationId;
  const {
    firstName,
    lastName,
    email,
    phone,
    birthday,
    address,
    gender,
    source,
    priority,
    notes,
    managerId,
  } = req.body;

  const { success, data, error } = await ClientService.createClient({
    organizationId,
    managerId,
    firstName,
    lastName,
    email,
    phone,
    birthday,
    address,
    gender,
    source,
    priority,
    notes,
  });

  if (!success) {
    return res.status(500).json({ message: error });
  }

  return res.status(201).json({ data });
};

export const updateClient = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { clientId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, data, error } = await ClientService.updateClient(
    clientId,
    organizationId,
    req.body
  );

  if (!success) {
    if (error === 'Client not found') {
      return res.status(404).json({ message: error });
    }
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const deleteClient = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { clientId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, error } = await ClientService.deleteClient(
    clientId,
    organizationId
  );

  if (!success) {
    if (error === 'Client not found') {
      return res.status(404).json({ message: error });
    }

    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Client deleted successfully' });
};

export const attachClientToManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const organizationId = req.user!.organizationId;
  const { clientId, managerId } = req.body;

  const { success, data, error } = await ClientService.attachClientToManager(
    clientId,
    managerId,
    organizationId
  );

  if (!success) {
    if (error === 'Client not found' || error === 'Manager not found') {
      return res.status(404).json({ message: error });
    }

    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};
