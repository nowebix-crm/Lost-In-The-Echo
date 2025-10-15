enum USER_STATUSES {
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

enum USER_ROLES {
    CLIENT = 'client',
    ADMIN = 'admin',
}

enum USER_GENDERS {
    MALE = 'male',
    FEMALE = 'female',
}

type UserType = {
    id: string;
    first_name: string;
    last_name?: string;
    birth_date?: Date;
    email: string;
    password: string;
    status: USER_STATUSES;
    role: USER_ROLES;
    phone?: string;
    gender?: USER_GENDERS;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

type UserCreationType = Omit<UserType, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

type ClientCreationType = {
    first_name: string;
    last_name?: string | null;
    birth_date?: Date | null;
    email: string;
    role: USER_ROLES;
    phone?: string | null;
    gender?: USER_GENDERS | null;
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
    iban?: string | null;
    // Company info
    company_name?: string | null;
    department?: string | null;
    position?: string | null;
};

export { USER_STATUSES, USER_ROLES, USER_GENDERS, UserType, UserCreationType, ClientCreationType }