import DealRepo from '../../data-access/repositories/deal-repo';

import type { ServiceResult } from '../../types';
import type { DealModel } from '../../data-access/models/deal';

type DealType = DealModel;

export type CreateDealInput = {
  organizationId: string;
  clientId?: string | null;
  companyId?: string | null;
  managerId: string;
  title: string;
  amount?: number;
  currency?: string;
  stageId: string;
};

export type UpdateDealInput = Partial<Omit<CreateDealInput, 'organizationId'>>;

const toViewModel = (deal: DealType) => ({
  id: deal.id,
  organizationId: deal.organization_id,
  clientId: deal.client_id,
  companyId: deal.company_id,
  managerId: deal.manager_id,
  title: deal.title,
  amount: deal.amount,
  currency: deal.currency,
  stageId: deal.stage_id,
  createdAt: deal.created_at,
  updatedAt: deal.updated_at,
});

export const getAllDeals = async (
  organizationId: string
): Promise<ServiceResult<any[]>> => {
  try {
    const deals = await DealRepo.findAll(organizationId);

    return {
      success: true,
      data: deals.map((d) => toViewModel(d as DealType)),
    };
  } catch (error) {
    console.log(`Error getting deals: ${error}`);
    return {
      success: false,
      error: 'Failed to get deals',
    };
  }
};

export const getDealById = async (
  id: string,
  organizationId: string
): Promise<ServiceResult<any>> => {
  try {
    const deal = await DealRepo.findById(id, organizationId);

    if (!deal) {
      return {
        success: false,
        error: 'Deal not found',
      };
    }

    return {
      success: true,
      data: toViewModel(deal as DealType),
    };
  } catch (error) {
    console.log(`Error getting deal: ${error}`);
    return {
      success: false,
      error: 'Failed to get deal',
    };
  }
};

export const createDeal = async (
  input: CreateDealInput
): Promise<ServiceResult<any>> => {
  try {
    const newDeal = await DealRepo.create({
      organization_id: input.organizationId,
      client_id: input.clientId || null,
      company_id: input.companyId || null,
      manager_id: input.managerId,
      title: input.title,
      amount: input.amount || 0,
      currency: input.currency || 'USD',
      stage_id: input.stageId,
    });

    return {
      success: true,
      data: toViewModel(newDeal as DealType),
    };
  } catch (error) {
    console.log(`Error creating deal: ${error}`);
    return {
      success: false,
      error: 'Failed to create deal',
    };
  }
};

export const updateDeal = async (
  id: string,
  organizationId: string,
  input: UpdateDealInput
): Promise<ServiceResult<any>> => {
  try {
    const deal = await DealRepo.findById(id, organizationId);

    if (!deal) {
      return {
        success: false,
        error: 'Deal not found',
      };
    }

    await DealRepo.update(id, {
      client_id: input.clientId,
      company_id: input.companyId,
      manager_id: input.managerId,
      title: input.title,
      amount: input.amount,
      currency: input.currency,
      stage_id: input.stageId,
    });

    const updatedDeal = await DealRepo.findById(id, organizationId);

    return {
      success: true,
      data: toViewModel(updatedDeal as DealType),
    };
  } catch (error) {
    console.log(`Error updating deal: ${error}`);
    return {
      success: false,
      error: 'Failed to update deal',
    };
  }
};

export const deleteDeal = async (
  id: string,
  organizationId: string
): Promise<ServiceResult<void>> => {
  try {
    const deal = await DealRepo.findById(id, organizationId);

    if (!deal) {
      return {
        success: false,
        error: 'Deal not found',
      };
    }

    await DealRepo.delete(id);

    return {
      success: true,
    };
  } catch (error) {
    console.log(`Error deleting deal: ${error}`);
    return {
      success: false,
      error: 'Failed to delete deal',
    };
  }
};
