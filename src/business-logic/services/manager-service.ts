import bcrypt from 'bcrypt';

import ManagerRepo from '../../data-access/repositories/manager-repo';
import { ROLES_IDS } from '../../constants/roles-constants';
import { USER_STATUSES } from '../../constants/users-contstants';

import type { ServiceResult } from '../../types';
import type { UserType } from '../../constants/users-contstants';

export type CreateManagerInput = {
  organizationId: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  password: string;
};

export type UpdateManagerInput = {
  firstName?: string;
  lastName?: string | null;
  email?: string;
};

const toViewModel = (manager: UserType) => ({
  id: manager.id,
  organizationId: manager.organization_id,
  firstName: manager.first_name,
  lastName: manager.last_name,
  email: manager.email,
  roleId: manager.role_id,
  status: manager.status,
  createdAt: manager.created_at,
  updatedAt: manager.updated_at,
});

export const getAllManagers = async (
  organizationId: string
): Promise<ServiceResult<any[]>> => {
  try {
    const managers = await ManagerRepo.findAll(organizationId);

    return {
      success: true,
      data: managers.map((m) => toViewModel(m as unknown as UserType)),
    };
  } catch (error) {
    console.log(`Error getting managers: ${error}`);
    return {
      success: false,
      error: 'Failed to get managers',
    };
  }
};

export const getManagerById = async (
  id: string,
  organizationId: string
): Promise<ServiceResult<any>> => {
  try {
    const manager = await ManagerRepo.findById(id, organizationId);

    if (!manager) {
      return {
        success: false,
        error: 'Manager not found',
      };
    }

    return {
      success: true,
      data: toViewModel(manager as unknown as UserType),
    };
  } catch (error) {
    console.log(`Error getting manager: ${error}`);
    return {
      success: false,
      error: 'Failed to get manager',
    };
  }
};

export const createManager = async (
  input: CreateManagerInput
): Promise<ServiceResult<any>> => {
  try {
    const existingUser = await ManagerRepo.findByEmail(input.email);

    if (existingUser) {
      return {
        success: false,
        error: 'Email already in use',
      };
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newManager = await ManagerRepo.create({
      organization_id: input.organizationId,
      first_name: input.firstName,
      last_name: input.lastName || null,
      email: input.email,
      password_hash: hashedPassword,
      role_id: ROLES_IDS.ORGANIZATION_MANAGER,
      status: USER_STATUSES.ACTIVE,
    });

    return {
      success: true,
      data: toViewModel(newManager as unknown as UserType),
    };
  } catch (error) {
    console.log(`Error creating manager: ${error}`);
    return {
      success: false,
      error: 'Failed to create manager',
    };
  }
};

export const updateManager = async (
  id: string,
  organizationId: string,
  input: UpdateManagerInput
): Promise<ServiceResult<any>> => {
  try {
    const manager = await ManagerRepo.findById(id, organizationId);

    if (!manager) {
      return {
        success: false,
        error: 'Manager not found',
      };
    }

    if (input.email) {
      const existingUser = await ManagerRepo.findByEmail(input.email);
      if (existingUser && existingUser.id !== id) {
        return {
          success: false,
          error: 'Email already in use',
        };
      }
    }

    await ManagerRepo.update(id, {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
    });

    const updatedManager = await ManagerRepo.findById(id, organizationId);

    return {
      success: true,
      data: toViewModel(updatedManager as unknown as UserType),
    };
  } catch (error) {
    console.log(`Error updating manager: ${error}`);
    return {
      success: false,
      error: 'Failed to update manager',
    };
  }
};

export const deleteManager = async (
  id: string,
  organizationId: string
): Promise<ServiceResult<void>> => {
  try {
    const manager = await ManagerRepo.findById(id, organizationId);

    if (!manager) {
      return {
        success: false,
        error: 'Manager not found',
      };
    }

    await ManagerRepo.delete(id);

    return {
      success: true,
    };
  } catch (error) {
    console.log(`Error deleting manager: ${error}`);
    return {
      success: false,
      error: 'Failed to delete manager',
    };
  }
};
