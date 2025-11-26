-- ===========================================
-- EXTENSIONS
-- ===========================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ===========================================
-- ENUMS
-- ===========================================

CREATE TYPE gender_enum AS ENUM ('male', 'female');
CREATE TYPE status_enum AS ENUM ('active', 'inactive');
CREATE TYPE source_enum AS ENUM ('site', 'ad', 'referral', 'cold_call');
CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high', 'highest');
CREATE TYPE contact_type_enum AS ENUM (
  'phone', 'email', 'telegram', 'whatsapp', 'viber', 'gmail', 'instagram'
);
CREATE TYPE activity_entity_enum AS ENUM ('client', 'company', 'deal');
CREATE TYPE activity_type_enum AS ENUM ('note', 'call', 'meeting', 'task', 'email');
CREATE TYPE custom_field_entity_enum AS ENUM ('client', 'company', 'deal');

-- ===========================================
-- TABLE: organizations
-- ===========================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: roles
-- ===========================================

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- ===========================================
-- TABLE: users
-- ===========================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50),
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role_id INT NOT NULL REFERENCES roles(id),
  status status_enum DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

ALTER TABLE organizations
  ADD CONSTRAINT fk_organizations_owner
  FOREIGN KEY (owner_id) REFERENCES users(id);

-- ===========================================
-- TABLE: clients
-- ===========================================

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  manager_id UUID REFERENCES users(id),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(30),
  email VARCHAR(120),
  birthday DATE,
  address VARCHAR(250),
  status status_enum DEFAULT 'active',
  gender gender_enum,
  source source_enum,
  priority priority_enum DEFAULT 'medium',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: companies
-- ===========================================

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  manager_id UUID REFERENCES users(id),
  name VARCHAR(120) NOT NULL,
  source source_enum,
  status status_enum DEFAULT 'active',
  priority priority_enum DEFAULT 'medium',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: contacts (polymorphic)
-- ===========================================

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type contact_type_enum NOT NULL,
  entity_id UUID NOT NULL,
  type contact_type_enum NOT NULL,
  value VARCHAR(120) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: tags
-- ===========================================

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  value VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: client_tags
-- ===========================================

CREATE TABLE client_tags (
  client_id UUID NOT NULL REFERENCES clients(id),
  tag_id UUID NOT NULL REFERENCES tags(id),
  PRIMARY KEY (client_id, tag_id)
);

-- ===========================================
-- TABLE: pipelines
-- ===========================================

CREATE TABLE pipelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name VARCHAR(80) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- ===========================================
-- TABLE: pipeline_stages
-- ===========================================

CREATE TABLE pipeline_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_id UUID NOT NULL REFERENCES pipelines(id),
  name VARCHAR(80) NOT NULL,
  position INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
);

-- ===========================================
-- TABLE: deals
-- ===========================================

CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  client_id UUID REFERENCES clients(id),
  company_id UUID REFERENCES companies(id),
  manager_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(150) NOT NULL,
  amount NUMERIC(12,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  stage_id UUID NOT NULL REFERENCES pipeline_stages(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: activities
-- ===========================================

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  author_id UUID NOT NULL REFERENCES users(id),
  entity_type activity_entity_enum NOT NULL,
  entity_id UUID NOT NULL,
  type activity_type_enum NOT NULL,
  content TEXT,
  due_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- TABLE: custom_fields (polymorphic)
-- ===========================================

CREATE TABLE custom_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  entity_type custom_field_entity_enum NOT NULL,
  entity_id UUID NOT NULL,
  name VARCHAR(80) NOT NULL,
  value VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- ===========================================
-- INDEXES
-- ===========================================

-- organizations
CREATE INDEX idx_organizations_owner_id ON organizations(owner_id);

-- users
CREATE INDEX idx_users_org_id ON users(organization_id);
CREATE INDEX idx_users_role_id ON users(role_id);

-- roles
CREATE INDEX idx_roles_org_id ON roles(organization_id);

-- clients
CREATE INDEX idx_clients_org_id ON clients(organization_id);
CREATE INDEX idx_clients_manager_id ON clients(manager_id);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_priority ON clients(priority);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_fullname ON clients(last_name, first_name);

-- companies
CREATE INDEX idx_companies_org_id ON companies(organization_id);
CREATE INDEX idx_companies_manager_id ON companies(manager_id);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_priority ON companies(priority);
CREATE INDEX idx_companies_name ON companies(name);

-- contacts
CREATE INDEX idx_contacts_entity ON contacts(entity_type, entity_id);
CREATE INDEX idx_contacts_value ON contacts(value);

-- tags
CREATE INDEX idx_tags_org_id ON tags(organization_id);
CREATE INDEX idx_tags_value ON tags(value);

-- client_tags
CREATE INDEX idx_client_tags_client ON client_tags(client_id);
CREATE INDEX idx_client_tags_tag ON client_tags(tag_id);

-- pipelines
CREATE INDEX idx_pipelines_org_id ON pipelines(organization_id);

-- pipeline_stages
CREATE INDEX idx_stages_pipeline ON pipeline_stages(pipeline_id);
CREATE INDEX idx_stages_position ON pipeline_stages(position);

-- deals
CREATE INDEX idx_deals_org_id ON deals(organization_id);
CREATE INDEX idx_deals_manager_id ON deals(manager_id);
CREATE INDEX idx_deals_client_id ON deals(client_id);
CREATE INDEX idx_deals_company_id ON deals(company_id);
CREATE INDEX idx_deals_stage_id ON deals(stage_id);
CREATE INDEX idx_deals_amount ON deals(amount);
CREATE INDEX idx_deals_title_trgm ON deals USING gin (title gin_trgm_ops);

-- activities
CREATE INDEX idx_activities_org_id ON activities(organization_id);
CREATE INDEX idx_activities_author_id ON activities(author_id);
CREATE INDEX idx_activities_entity ON activities(entity_type, entity_id);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_due ON activities(due_at);

-- custom_fields
CREATE INDEX idx_custom_fields_org_id ON custom_fields(organization_id);
CREATE INDEX idx_custom_fields_entity ON custom_fields(entity_type, entity_id);
CREATE INDEX idx_custom_fields_name ON custom_fields(name);
