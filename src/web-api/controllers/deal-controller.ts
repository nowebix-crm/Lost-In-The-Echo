import { Response } from 'express';

import * as DealService from '../../business-logic/services/deal-service';
import { AuthenticatedRequest } from '../middlewares/auth-middleware';

export const getAllDeals = async (req: AuthenticatedRequest, res: Response) => {
  const organizationId = req.user!.organizationId;

  const { success, data, error } =
    await DealService.getAllDeals(organizationId);

  if (!success) {
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const getDealById = async (req: AuthenticatedRequest, res: Response) => {
  const { dealId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, data, error } = await DealService.getDealById(
    dealId,
    organizationId
  );

  if (!success) {
    return res.status(404).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const createDeal = async (req: AuthenticatedRequest, res: Response) => {
  const organizationId = req.user!.organizationId;
  const { title, clientId, companyId, managerId, amount, currency, stageId } =
    req.body;

  const { success, data, error } = await DealService.createDeal({
    organizationId,
    title,
    clientId,
    companyId,
    managerId,
    amount,
    currency,
    stageId,
  });

  if (!success) {
    return res.status(500).json({ message: error });
  }

  return res.status(201).json({ data });
};

export const updateDeal = async (req: AuthenticatedRequest, res: Response) => {
  const { dealId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, data, error } = await DealService.updateDeal(
    dealId,
    organizationId,
    req.body
  );

  if (!success) {
    if (error === 'Deal not found') {
      return res.status(404).json({ message: error });
    }
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ data });
};

export const deleteDeal = async (req: AuthenticatedRequest, res: Response) => {
  const { dealId } = req.params;
  const organizationId = req.user!.organizationId;

  const { success, error } = await DealService.deleteDeal(
    dealId,
    organizationId
  );

  if (!success) {
    if (error === 'Deal not found') {
      return res.status(404).json({ message: error });
    }
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: 'Deal deleted successfully' });
};
