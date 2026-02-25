import { ClientModel } from '../models/client';

import type {
  GenderEnum,
  StatusEnum,
  SourceEnum,
  PriorityEnum,
} from '../models/client';

export type ClientCreationType = {
  organization_id: string;
  manager_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  email?: string | null;
  birthday?: Date | null;
  address?: string | null;
  status?: StatusEnum;
  gender?: GenderEnum | null;
  source?: SourceEnum | null;
  priority?: PriorityEnum;
  notes?: string | null;
};

export type ClientUpdateType = Partial<
  Omit<ClientCreationType, 'organization_id'>
>;

class ClientRepo {
  static async findAll(organizationId: string) {
    const clients = await ClientModel.findAll({
      where: {
        organization_id: organizationId,
        deleted_at: null,
      },
      order: [['created_at', 'DESC']],
    });

    return clients;
  }

  static async findById(id: string, organizationId: string) {
    const client = await ClientModel.findOne({
      where: {
        id,
        organization_id: organizationId,
        deleted_at: null,
      },
    });

    return client;
  }

  static async create(client: ClientCreationType) {
    const newClient = await ClientModel.create(client as any);

    return newClient;
  }

  static async update(id: string, data: ClientUpdateType) {
    const [affectedRows] = await ClientModel.update(data as any, {
      where: { id },
    });

    return affectedRows;
  }

  static async delete(id: string) {
    await ClientModel.destroy({ where: { id } });
  }

  static async attachManager(clientId: string, managerId: string | null) {
    const [affectedRows] = await ClientModel.update(
      { manager_id: managerId } as any,
      { where: { id: clientId } }
    );

    return affectedRows;
  }
}

export default ClientRepo;
