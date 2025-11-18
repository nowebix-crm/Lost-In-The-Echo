enum USER_STATUSES {
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

enum USER_ROLES {
    FREE = 'free_client',
    PREMIUM = 'premium_client',
    ADMIN = 'admin',
}

enum USER_GENDERS {
    MALE = 'male',
    FEMALE = 'female',
}

type UserRoles = USER_ROLES.FREE | USER_ROLES.PREMIUM | USER_ROLES.ADMIN;
type UserStatuses = USER_STATUSES.ACTIVE | USER_STATUSES.DISABLED;
type UserGenders = USER_GENDERS.MALE | USER_GENDERS.FEMALE;
type ClientTypes = Exclude<UserRoles, USER_ROLES.ADMIN>;

type BankInfoType = {
    id?: string | null;
    card_number?: string;
    expiry_date?: string;
    currency?: string;
}

type AddressInfoType = {
    id?: string | null;
    country?: string;
    city?: string;
    zip?: string;
    address?: string;
    state?: string;
}

type CompanyInfoType = {
    id?: string | null;
    company_name?: string;
    department?: string;
    position?: string;
}

type UserType = {
    id: string;
    first_name: string;
    last_name?: string;
    birth_date?: Date;
    email: string;
    password: string;
    status: UserStatuses;
    role: UserRoles;
    phone?: string;
    gender?: UserGenders;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    address_info?: AddressInfoType;
    bank_info?: BankInfoType;
    company_info?: CompanyInfoType;
}

type UserCreationType = Omit<UserType, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
type UserUpdateType = Omit<UserType, 'id' | 'password' | 'created_at' | 'updated_at' | 'deleted_at' | 'role'>;

type ClientCreationType = {
    first_name: string;
    last_name?: string | null;
    birth_date?: Date | null;
    email: string;
    role: ClientTypes;
    phone?: string | null;
    gender?: UserGenders | null;
    // Address info
    country?: string | null;
    city?: string | null;
    zip?: string | null;
    address?: string | null;
    state?: string | null;
    // Bank info
    card_number?: string | null;
    expiry_date?: string | null;
    currency?: string | null;
    // Company info
    company_name?: string | null;
    department?: string | null;
    position?: string | null;
};

export { USER_STATUSES, USER_ROLES, USER_GENDERS }

export type { UserType, UserCreationType, UserUpdateType, BankInfoType, AddressInfoType, CompanyInfoType, ClientCreationType, ClientTypes, UserRoles, UserStatuses, UserGenders }