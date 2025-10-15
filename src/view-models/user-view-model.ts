import { UserType, USER_ROLES, USER_STATUSES, USER_GENDERS } from "../constants/users-contstants";

class UserViewModel {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare birthDate: Date | null;
    declare email: string;
    declare password: string;
    declare status: USER_STATUSES;
    declare role: USER_ROLES;
    declare phone: string | null;
    declare gender: USER_GENDERS | null;
    declare createdAt: Date;
    declare updatedAt: Date;

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
            updatedAt: user.updated_at
        };
    }
}

export default UserViewModel;
