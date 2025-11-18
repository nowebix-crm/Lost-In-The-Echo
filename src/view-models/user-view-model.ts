import { UserType } from "../constants/users-contstants";

import type { AddressInfoType, BankInfoType, CompanyInfoType, UserStatuses, UserGenders, UserRoles } from "../constants/users-contstants";

import AddressInfoViewModel from "./address-info-view-model";
import BankInfoViewModel from "./bank-info-view-model";
import CompanyInfoViewModel from "./company-info-view-model";

class UserViewModel {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare birthDate: Date | null;
    declare email: string;
    declare password: string;
    declare status: UserStatuses;
    declare role: UserRoles;
    declare phone: string | null;
    declare gender: UserGenders | null;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare addressInfo: AddressInfoType | null;
    declare bankInfo: BankInfoType | null;
    declare companyInfo: CompanyInfoType | null;

    constructor(private user: UserType) {
        this.id = user.id;
        this.firstName = user.first_name;
        this.lastName = user.last_name || '';
        this.birthDate = user.birth_date || null;
        this.email = user.email;
        this.password = user.password;
        this.status = user.status;
        this.role = user.role;
        this.phone = user.phone || null;
        this.gender = user.gender || null;
        this.createdAt = user.created_at;
        this.updatedAt = user.updated_at;
    }

    static toViewModel(user: UserType) {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name || '',
            birthDate: user.birth_date || null,
            email: user.email,
            password: user.password,
            status: user.status,
            role: user.role,
            phone: user.phone || null,
            gender: user.gender || null,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            addressInfo: user.address_info ? AddressInfoViewModel.toViewModel(user.address_info) : null,
            bankInfo: user.bank_info ? BankInfoViewModel.toViewModel(user.bank_info) : null,
            companyInfo: user.company_info ? CompanyInfoViewModel.toViewModel(user.company_info) : null
        };
    }
}

export default UserViewModel;
