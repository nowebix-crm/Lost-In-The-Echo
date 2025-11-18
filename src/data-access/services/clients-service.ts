import { Op, Transaction } from "@sequelize/core";

import UserViewModel from "../../view-models/user-view-model";
import UserRepo from "../repositories/user-repo";

import { AddressInfoType, BankInfoType, CompanyInfoType, USER_ROLES, USER_STATUSES, UserCreationType, UserUpdateType } from "../../constants/users-contstants";

import AddressInfoRepo from "../repositories/address-info-repo";
import BankInfoRepo from "../repositories/bank-info-repo";
import CompanyInfoRepo from "../repositories/company-info-repo";

import { sequelize } from "../../db/db-connection";

import AddressInfoModel from "../models/address-info";
import BankInfoModel from "../models/bank-info";
import CompanyInfoModel from "../models/company-info";

import type { ClientCreationType } from "../../constants/users-contstants";
import type { ServiceResult } from "../../types";

const clientIncludes = [
    {
        model: AddressInfoModel,
        as: 'address_info'
    },
    {
        model: BankInfoModel,
        as: 'bank_info'
    },
    {
        model: CompanyInfoModel,
        as: 'company_info'
    }
]

const getAllClients = async (): Promise<ServiceResult<any[]>> => {
    const whereClause = {
        role: {
            [Op.in]: [USER_ROLES.FREE, USER_ROLES.PREMIUM]
        },
        deleted_at: null
    };

    try {
        const users = await UserRepo.getUsers(whereClause);

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

const findClientById = async (id: string): Promise<ServiceResult<any>> => {
    try {
        const client = await UserRepo.findById(id, clientIncludes);

        if (!client) {
            return {
                success: false,
                error: 'Client not found'
            };
        }

        const viewModel = UserViewModel.toViewModel(client);

        return {
            success: true,
            data: viewModel
        };
    } catch (error) {
        console.log(`Error finding client by id: ${error}`);
        return {
            success: false,
            error: 'Failed to find client by id'
        };
    }
}

const createClient = async (client: ClientCreationType): Promise<ServiceResult<any>> => {
    const transaction: Transaction = await sequelize.startUnmanagedTransaction();
    
    try {
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

const updateClient = async (clientId: string, clientUpdateData: ClientCreationType): Promise<ServiceResult<any>> => {
    const transaction: Transaction = await sequelize.startUnmanagedTransaction();
    
    try {
        const existingClient = await UserRepo.findById(clientId, clientIncludes);

        if (!existingClient) {
            return {
                success: false,
                error: 'Client not found'
            };
        }
        
        const userUpdateData: UserUpdateType = {
            first_name: clientUpdateData.first_name,
            last_name: clientUpdateData.last_name || undefined,
            birth_date: clientUpdateData.birth_date || undefined,
            email: clientUpdateData.email,
            status: USER_STATUSES.ACTIVE, // always active
            phone: clientUpdateData.phone || undefined,
            gender: clientUpdateData.gender || undefined
        };
        
        const addressInfoUpdateData: AddressInfoType = {
            country: clientUpdateData?.country || undefined,
            city: clientUpdateData?.city || undefined,
            zip: clientUpdateData?.zip || undefined,
            address: clientUpdateData?.address || undefined,
            state: clientUpdateData?.state || undefined
        };

        const bankInfoUpdateData: BankInfoType = {
            card_number: clientUpdateData?.card_number || undefined,
            expiry_date: clientUpdateData?.expiry_date || undefined,
            currency: clientUpdateData?.currency || undefined
        };
    
        const companyInfoUpdateData: CompanyInfoType = {
            company_name: clientUpdateData?.company_name || undefined,
            department: clientUpdateData?.department || undefined,
            position: clientUpdateData?.position || undefined
        };
    
        await UserRepo.update(clientId, userUpdateData);
        await AddressInfoRepo.updateByUserId(clientId, addressInfoUpdateData);
        await BankInfoRepo.updateByUserId(clientId, bankInfoUpdateData);
        await CompanyInfoRepo.updateByUserId(clientId, companyInfoUpdateData);
    
        await transaction.commit();

        const updatedClient = await UserRepo.findById(clientId, clientIncludes);

        if (!updatedClient) {
            return {
                success: false,
                error: 'Client not found'
            };
        }

        const viewModel = UserViewModel.toViewModel(updatedClient);
    
        return {
            success: true,
            data: viewModel
        };
    } catch (error) {
        await transaction.rollback();
        
        console.log(`Error updating client: ${error}`);
        return {
            success: false,
            error: 'Failed to update client'
        };
    }
}

export { getAllClients, findClientById, createClient, updateClient };