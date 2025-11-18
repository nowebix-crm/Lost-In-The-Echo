import UserRepo from '../repositories/user-repo';

import UserViewModel from '../../view-models/user-view-model';

import type { UserType, UserCreationType } from '../../constants/users-contstants';

type ServiceResult<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

const findUserById = async (id: string): Promise<ServiceResult<any>> => {
    try {
        const user = await UserRepo.findById(id);

        if (!user) {
            return {
                success: false,
                error: 'User not found'
            };
        }

        const viewModel = UserViewModel.toViewModel(user);

        return {
            success: true,
            data: viewModel
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to find user by id'
        };
    }
}

const findUserByEmail = async (email: string): Promise<ServiceResult<any>> => {
    try {
        const user = await UserRepo.findByEmail(email);

        if (!user) {
            return {
                success: false,
                error: 'User not found'
            };
        }

        const viewModel = UserViewModel.toViewModel(user);

        return {
            success: true,
            data: viewModel
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to find user by email'
        };
    }
}

const createUser = async (user: UserCreationType): Promise<ServiceResult<any>> => {
    try {
        const newUser = await UserRepo.create(user);

        const viewModel = UserViewModel.toViewModel(newUser);

        return {
            success: true,
            data: viewModel
        };
    } catch (error) {
        console.log(`Error creating user: ${error}`);
        return {
            success: false,
            error: 'Failed to create user'
        };
    }
}

const getAllUsers = async (): Promise<ServiceResult<any[]>> => {
    try {
        const users = await UserRepo.findAll();
        
        return {
            success: true,
            data: users.map((user: UserType) => UserViewModel.toViewModel(user))
        };
    } catch (error) {
        return {
            success: false,
            error: 'Failed to get all users'
        };
    }
}

export { findUserById, findUserByEmail, createUser, getAllUsers };
