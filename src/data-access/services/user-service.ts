import { Transaction } from '@sequelize/core';

import UserRepo from '../repositories/user-repo';
import AddressInfoRepo from '../repositories/address-info-repo';
import BankInfoRepo from '../repositories/bank-info-repo';
import CompanyInfoRepo from '../repositories/company-info-repo';

import { UserType, UserCreationType, ClientCreationType, USER_ROLES, USER_STATUSES } from '../../constants/users-contstants';

import UserViewModel from '../../view-models/user-view-model';

import { sequelize } from '../../db/db-connection';

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

const getAllClients = async (): Promise<ServiceResult<any[]>> => {
    try {
        const users = await UserRepo.findAllClients({
            role: USER_ROLES.CLIENT,
            deleted_at: null
        });

        return {
            success: true,
            data: users.map((user: any) => UserViewModel.toViewModel(user))
        };
    } catch (error) {
        console.log(`Error getting all clients: ${error}`);
        return {
            success: false,
            error: 'Failed to get all clients'
        };
    }
}

const createClient = async (client: ClientCreationType): Promise<ServiceResult<any>> => {
    const transaction: Transaction = await sequelize.startUnmanagedTransaction();
    
    try {
        console.log('Creating client with data:', client);

        const user = await UserRepo.findByEmail(client.email);

        if (user) {
            return {
                success: false,
                error: 'Can not create client with this email'
            };
        }

        const userData: UserCreationType = {
            first_name: client.first_name,
            last_name: client.last_name || undefined,
            birth_date: client.birth_date || undefined,
            email: client.email,
            password: 'temp_password_123', // Заглушка для пароля
            status: USER_STATUSES.ACTIVE,
            role: client.role,
            phone: client.phone || undefined,
            gender: client.gender || undefined
        };

        const newUser = await UserRepo.create(userData);
        
        const addressData = {
            user_id: newUser.id,
            country: client.country,
            city: client.city,
            zip: client.zip,
            address: client.address,
            state: client.state
        };

        const bankData = {
            user_id: newUser.id,
            card_number: client.card_number,
            expiry_date: client.expiry_date,
            currency: client.currency,
            iban: client.iban
        };

        const companyData = {
            user_id: newUser.id,
            company_name: client.company_name,
            department: client.department,
            position: client.position
        };

        await AddressInfoRepo.create(addressData);
        await BankInfoRepo.create(bankData);
        await CompanyInfoRepo.create(companyData);

        await transaction.commit();

        const viewModel = UserViewModel.toViewModel(newUser);

        return {
            success: true,
            data: viewModel
        };
        
    } catch (error) {
        await transaction.rollback();
        
        console.log(`Error creating client: ${error}`);
        return {
            success: false,
            error: 'Failed to create client'
        };
    }
}

export { findUserById, findUserByEmail, createUser, getAllUsers, getAllClients, createClient };
