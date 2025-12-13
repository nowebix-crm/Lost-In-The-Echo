import { DealModel } from '../models/deal';

export type DealCreationType = {
  organization_id: string;
  client_id?: string | null;
  company_id?: string | null;
  manager_id: string;
  title: string;
  amount?: number;
  currency?: string;
  stage_id: string;
};

export type DealUpdateType = Partial<Omit<DealCreationType, 'organization_id'>>;

class DealRepo {
  static async findAll(organizationId: string) {
    const deals = await DealModel.findAll({
      where: {
        organization_id: organizationId,
        deleted_at: null,
      },
      order: [['created_at', 'DESC']],
    });

    return deals;
  }

  static async findById(id: string, organizationId: string) {
    const deal = await DealModel.findOne({
      where: {
        id,
        organization_id: organizationId,
        deleted_at: null,
      },
    });

    return deal;
  }

  static async create(deal: DealCreationType) {
    const newDeal = await DealModel.create(deal as any);

    return newDeal;
  }

  static async update(id: string, data: DealUpdateType) {
    const [affectedRows] = await DealModel.update(data as any, {
      where: { id },
    });

    return affectedRows;
  }

  static async delete(id: string) {
    await DealModel.destroy({ where: { id } });
  }
}

export default DealRepo;
