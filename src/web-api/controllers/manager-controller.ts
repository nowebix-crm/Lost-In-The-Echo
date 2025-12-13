import { Response } from 'express';

import * as ManagerService from '../../business-logic/services/manager-service';
import { AuthenticatedRequest } from '../middlewares/auth-middleware';

export const getAllManagers = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const organizationId = req.user!.organizationId;

  const { success, data, error } =
    await ManagerService.getAllManagers(organizationId);

  if (!success) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const getManagerById = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { managerId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, data, error } = await ManagerService.getManagerById(
    managerId,
    organizationId
  );

  if (!success) {
    return res.status(404).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const createManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const organizationId = req.user!.organizationId;
  const { firstName, lastName, email, password } = req.body;

  const { success, data, error } = await ManagerService.createManager({
    organizationId,
    firstName,
    lastName,
    email,
    password,
  });

  if (!success) {
    if (error === 'Email already in use') {
      return res.status(409).json({ message: error });
    }
    return res.status(500).json({ message: error });
  }

  return res.status(201).json({ data });
};

export const updateManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { managerId } = req.params;
  const organizationId = req.user!.organizationId;
  const { firstName, lastName, email } = req.body;

  const { success, data, error } = await ManagerService.updateManager(
    managerId,
    organizationId,
    { firstName, lastName, email }
  );

  if (!success) {
    if (error === 'Manager not found') {
      return res.status(404).json({ message: error });
    }

    if (error === 'Email already in use') {
      return res.status(409).json({ message: error });
    }

    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const deleteManager = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { managerId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, error } = await ManagerService.deleteManager(
    managerId,
    organizationId
  );

  if (!success) {
    if (error === 'Manager not found') {
      return res.status(404).json({ message: error });
    }

    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Manager deleted successfully' });
};
