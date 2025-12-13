import { OrganizationModel } from '../models/organization';

export type OrganizationCreationType = {
  owner_id: string;
  title: string;
};

class OrganizationRepo {
  static async create(organization: OrganizationCreationType) {
    const newOrganization = await OrganizationModel.create(organization);

    return newOrganization;
  }
}

export default OrganizationRepo;
