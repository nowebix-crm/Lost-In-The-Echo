import type { UserType, UserStatuses } from '../../constants/users-contstants';

class UserViewModel {
  declare id: string;
  declare organizationId: string;
  declare firstName: string;
  declare lastName: string | null;
  declare email: string;
  declare roleId: number;
  declare status: UserStatuses;
  declare createdAt: Date;
  declare updatedAt: Date;

  constructor(private user: UserType) {
    this.id = user.id;
    this.organizationId = user.organization_id;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.roleId = user.role_id;
    this.status = user.status;
    this.createdAt = user.created_at;
    this.updatedAt = user.updated_at;
  }

  static toViewModel(user: UserType) {
    return {
      id: user.id,
      organizationId: user.organization_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      roleId: user.role_id,
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}

export default UserViewModel;
