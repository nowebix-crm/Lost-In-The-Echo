import ClientRepo from '../../data-access/repositories/client-repo';
import ManagerRepo from '../../data-access/repositories/manager-repo';

import type { ServiceResult } from '../../types';
import type { ClientModel } from '../../data-access/models/client';

type ClientType = ClientModel;

export type CreateClientInput = {
  organizationId: string;
  managerId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  email?: string | null;
  birthday?: Date | null;
  address?: string | null;
  gender?: 'male' | 'female' | null;
  source?: 'site' | 'ad' | 'referral' | 'cold_call' | null;
  priority?: 'low' | 'medium' | 'high' | 'highest';
  notes?: string | null;
};

export type UpdateClientInput = Partial<CreateClientInput> & {
  status?: 'active' | 'inactive';
};

const toViewModel = (client: ClientType) => ({
  id: client.id,
  organizationId: client.organization_id,
  managerId: client.manager_id,
  firstName: client.first_name,
  lastName: client.last_name,
  phone: client.phone,
  email: client.email,
  birthday: client.birthday,
  address: client.address,
  status: client.status,
  gender: client.gender,
  source: client.source,
  priority: client.priority,
  notes: client.notes,
  createdAt: client.created_at,
  updatedAt: client.updated_at,
});

export const getAllClients = async (
  organizationId: string
): Promise<ServiceResult<any[]>> => {
  try {
    const clients = await ClientRepo.findAll(organizationId);

    return {
      success: true,
      data: clients.map((c) => toViewModel(c as ClientType)),
    };
  } catch (error) {
    console.log(`Error getting clients: ${error}`);
    return {
      success: false,
      error: 'Failed to get clients',
    };
  }
};

export const getClientById = async (
  id: string,
  organizationId: string
): Promise<ServiceResult<any>> => {
  try {
    const client = await ClientRepo.findById(id, organizationId);

    if (!client) {
      return {
        success: false,
        error: 'Client not found',
      };
    }

    return {
      success: true,
      data: toViewModel(client as ClientType),
    };
  } catch (error) {
    console.log(`Error getting client: ${error}`);
    return {
      success: false,
      error: 'Failed to get client',
    };
  }
};

export const createClient = async (
  input: CreateClientInput
): Promise<ServiceResult<any>> => {
  try {
    const newClient = await ClientRepo.create({
      organization_id: input.organizationId,
      manager_id: input.managerId || null,
      first_name: input.firstName || null,
      last_name: input.lastName || null,
      phone: input.phone || null,
      email: input.email || null,
      birthday: input.birthday || null,
      address: input.address || null,
      gender: input.gender || null,
      source: input.source || null,
      priority: input.priority || 'medium',
      notes: input.notes || null,
    });

    return {
      success: true,
      data: toViewModel(newClient as ClientType),
    };
  } catch (error) {
    console.log(`Error creating client: ${error}`);
    return {
      success: false,
      error: 'Failed to create client',
    };
  }
};

export const updateClient = async (
  id: string,
  organizationId: string,
  input: UpdateClientInput
): Promise<ServiceResult<any>> => {
  try {
    const client = await ClientRepo.findById(id, organizationId);

    if (!client) {
      return {
        success: false,
        error: 'Client not found',
      };
    }

    await ClientRepo.update(id, {
      manager_id: input.managerId,
      first_name: input.firstName,
      last_name: input.lastName,
      phone: input.phone,
      email: input.email,
      birthday: input.birthday,
      address: input.address,
      status: input.status,
      gender: input.gender,
      source: input.source,
      priority: input.priority,
      notes: input.notes,
    });

    const updatedClient = await ClientRepo.findById(id, organizationId);

    return {
      success: true,
      data: toViewModel(updatedClient as ClientType),
    };
  } catch (error) {
    console.log(`Error updating client: ${error}`);
    return {
      success: false,
      error: 'Failed to update client',
    };
  }
};

export const deleteClient = async (
  id: string,
  organizationId: string
): Promise<ServiceResult<void>> => {
  try {
    const client = await ClientRepo.findById(id, organizationId);

    if (!client) {
      return {
        success: false,
        error: 'Client not found',
      };
    }

    await ClientRepo.delete(id);

    return {
      success: true,
    };
  } catch (error) {
    console.log(`Error deleting client: ${error}`);
    return {
      success: false,
      error: 'Failed to delete client',
    };
  }
};

export const attachClientToManager = async (
  clientId: string,
  managerId: string,
  organizationId: string
): Promise<ServiceResult<any>> => {
  try {
    const client = await ClientRepo.findById(clientId, organizationId);

    if (!client) {
      return {
        success: false,
        error: 'Client not found',
      };
    }

    const manager = await ManagerRepo.findById(managerId, organizationId);

    if (!manager) {
      return {
        success: false,
        error: 'Manager not found',
      };
    }

    await ClientRepo.attachManager(clientId, managerId);

    const updatedClient = await ClientRepo.findById(clientId, organizationId);

    return {
      success: true,
      data: toViewModel(updatedClient as ClientType),
    };
  } catch (error) {
    console.log(`Error attaching client to manager: ${error}`);
    return {
      success: false,
      error: 'Failed to attach client to manager',
    };
  }
};
