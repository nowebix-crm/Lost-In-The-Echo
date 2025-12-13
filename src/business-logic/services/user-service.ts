import UserRepo from '../../data-access/repositories/user-repo';

import UserViewModel from '../../business-logic/view-models/user-view-model';

import type {
  UserType,
  UserCreationType,
} from '../../constants/users-contstants';

import type { ServiceResult } from '../../types';

const findUserById = async (id: string): Promise<ServiceResult<any>> => {
  try {
    const user = await UserRepo.findById(id);

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const viewModel = UserViewModel.toViewModel(user as unknown as UserType);

    return {
      success: true,
      data: viewModel,
    };
  } catch (err) {
    console.log(`Error finding user by id: ${err}`);
    return {
      success: false,
      error: 'Failed to find user by id',
    };
  }
};

const findUserByEmail = async (
  email: string,
  includePassword = false
): Promise<ServiceResult<any>> => {
  try {
    const user = await UserRepo.findByEmail(email);

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const viewModel = UserViewModel.toViewModel(user as unknown as UserType);

    if (includePassword) {
      return {
        success: true,
        data: {
          ...viewModel,
          password: (user as unknown as UserType).password_hash,
        },
      };
    }

    return {
      success: true,
      data: viewModel,
    };
  } catch (error) {
    console.log(`Error finding user by email: ${error}`);
    return {
      success: false,
      error: 'Failed to find user by email',
    };
  }
};

const createUser = async (
  user: UserCreationType
): Promise<ServiceResult<any>> => {
  try {
    const newUser = await UserRepo.create(user);

    const viewModel = UserViewModel.toViewModel(newUser as unknown as UserType);

    return {
      success: true,
      data: viewModel,
    };
  } catch (error) {
    console.log(`Error creating user: ${error}`);
    return {
      success: false,
      error: 'Failed to create user',
    };
  }
};

const getAllUsers = async (): Promise<ServiceResult<any[]>> => {
  try {
    const users = await UserRepo.findAll();

    return {
      success: true,
      data: users.map((user) =>
        UserViewModel.toViewModel(user as unknown as UserType)
      ),
    };
  } catch (error) {
    console.log(`Error getting all users: ${error}`);
    return {
      success: false,
      error: 'Failed to get all users',
    };
  }
};

export { findUserById, findUserByEmail, createUser, getAllUsers };
