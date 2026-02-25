import { ROLES } from './roles-constants';

enum USER_STATUSES {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

type UserRoles =
  | ROLES.ADMIN
  | ROLES.ORGANIZATION_OWNER
  | ROLES.ORGANIZATION_MANAGER
  | ROLES.ORGANIZATION_CLIENT;

type UserStatuses = USER_STATUSES.ACTIVE | USER_STATUSES.INACTIVE;

type UserType = {
  id: string;
  organization_id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  password_hash: string;
  role_id: number;
  status: UserStatuses;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
};

type UserCreationType = Omit<
  UserType,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;
type UserUpdateType = Partial<
  Omit<UserType, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
>;

type ClientCreationType = {
  organization_id: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  role_id: number;
};

export { USER_STATUSES };

export type {
  UserType,
  UserCreationType,
  UserUpdateType,
  ClientCreationType,
  UserRoles,
  UserStatuses,
};
