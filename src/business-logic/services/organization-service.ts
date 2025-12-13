import OrganizationRepo from '../../data-access/repositories/organization-repo';

import type { OrganizationCreationType } from '../../data-access/repositories/organization-repo';

const createOrganization = async (organization: OrganizationCreationType) => {
  const newOrganization = await OrganizationRepo.create(organization);

  return newOrganization;
};

export { createOrganization };
