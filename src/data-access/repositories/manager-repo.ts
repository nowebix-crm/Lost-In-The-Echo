import { UserModel } from '../models/user';
import { ROLES_IDS } from '../../constants/roles-constants';

import type {
  UserCreationType,
  UserUpdateType,
} from '../../constants/users-contstants';

class ManagerRepo {
  static async findAll(organizationId: string) {
    const managers = await UserModel.findAll({
      where: {
        organization_id: organizationId,
        role_id: ROLES_IDS.ORGANIZATION_MANAGER,
        deleted_at: null,
      },
      attributes: [
        'id',
        'organization_id',
        'first_name',
        'last_name',
        'email',
        'role_id',
        'status',
        'created_at',
        'updated_at',
      ],
      order: [['created_at', 'DESC']],
    });

    return managers;
  }

  static async findById(id: string, organizationId: string) {
    const manager = await UserModel.findOne({
      where: {
        id,
        organization_id: organizationId,
        role_id: ROLES_IDS.ORGANIZATION_MANAGER,
        deleted_at: null,
      },
    });

    return manager;
  }

  static async findByEmail(email: string) {
    const user = await UserModel.findOne({
      where: { email },
    });

    return user;
  }

  static async create(manager: UserCreationType) {
    const newManager = await UserModel.create(manager as any);

    return newManager;
  }

  static async update(id: string, data: UserUpdateType) {
    const [affectedRows] = await UserModel.update(data as any, {
      where: { id },
    });

    return affectedRows;
  }

  static async delete(id: string) {
    await UserModel.destroy({ where: { id } });
  }
}

export default ManagerRepo;
