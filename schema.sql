-- ─────────────────────────────────────────────────────────────────────────────
-- Canada Life AI & ML Governance Command Centre
-- Supabase Database Schema
-- Run this in your Supabase SQL Editor before launching the app
-- ─────────────────────────────────────────────────────────────────────────────

-- ── PRODUCTS TABLE ────────────────────────────────────────────────────────────
-- Stores all registered AI/ML products (the "registry")

create table if not exists products (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  type                text,             -- GenAI (LLM) | ML Classification | etc.
  business_line       text,             -- Group Benefits | Individual Insurance | etc.
  deployment_stage    text,             -- Ideation | POC | Pilot | Production | etc.
  affected_customers  boolean default false,   -- Direct customer impact flag
  automated_decisions boolean default false,   -- Automated decision flag (key risk signal)
  third_party         boolean default false,   -- Third-party vendor tool
  data_types          text[],                  -- Array of data types used
  owner               text,
  owner_email         text,
  review_date         date,                    -- Next scheduled governance review
  description         text,
  risk_tier           text,                    -- Auto-computed: Low | Medium | High | Critical
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Auto-update updated_at on row change
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at_column();


-- ── ASSESSMENTS TABLE ─────────────────────────────────────────────────────────
-- Stores all assessment runs for a product (one product can have many assessments)

create table if not exists assessments (
  id               uuid primary key default gen_random_uuid(),
  product_id       uuid references products(id) on delete cascade,
  status           text default 'draft',   -- draft | complete | submitted

  -- All assessment answers stored as JSONB
  -- Structure: { aia: {q1: "answer", ...}, model_risk: {...}, privacy: {...}, ... }
  answers          jsonb default '{}',

  -- All agent results stored as JSONB
  -- Structure: { aia: {score, riskRating, questionRationales, ...}, model_risk: {...}, ... }
  results          jsonb default '{}',

  -- Top-level derived fields (also in results, but indexed here for querying)
  composite_score  integer,             -- 0–100
  overall_rating   text,                -- green | amber | red
  overall_tier     text,                -- Low | Medium | High | Critical
  governance_gate  text,                -- approved_to_proceed | proceed_with_conditions |
                                        -- hold_pending_remediation | escalate_to_risk_council

  completed_at     timestamptz,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create trigger assessments_updated_at
  before update on assessments
  for each row execute function update_updated_at_column();


-- ── DOCUMENTS TABLE ───────────────────────────────────────────────────────────
-- Stores user-uploaded policy documents for RAG context extension

create table if not exists documents (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  file_url       text,                  -- Supabase Storage URL
  extracted_text text,                  -- Full extracted text for RAG retrieval
  domain         text,                  -- Optional domain tag: model_risk | privacy | etc.
  file_size_kb   integer,
  uploaded_at    timestamptz default now()
);


-- ── INDEXES ───────────────────────────────────────────────────────────────────

-- Portfolio dashboard queries by risk tier and overall rating
create index if not exists idx_products_risk_tier
  on products(risk_tier);

create index if not exists idx_assessments_product_id
  on assessments(product_id);

create index if not exists idx_assessments_overall_rating
  on assessments(overall_rating);

create index if not exists idx_assessments_status
  on assessments(status);

-- Knowledge base document search
create index if not exists idx_documents_domain
  on documents(domain);


-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
-- Enable for production deployment. Disable for single-user prototype.
-- Uncomment below to enable RLS:

-- alter table products enable row level security;
-- alter table assessments enable row level security;
-- alter table documents enable row level security;

-- Example policy (all authenticated users can read/write their own records):
-- create policy "Users can manage their own products"
--   on products for all
--   using (auth.uid() = owner_id)   -- add owner_id uuid column when enabling auth
--   with check (auth.uid() = owner_id);


-- ── SAMPLE DATA (optional) ────────────────────────────────────────────────────
-- Uncomment to pre-populate the dashboard with demo products

/*
insert into products (name, type, business_line, deployment_stage, affected_customers,
                       automated_decisions, third_party, data_types, owner, owner_email,
                       description, risk_tier)
values
  (
    'Claims Triage AI',
    'ML Classification Model',
    'Group Benefits',
    'Production',
    true, true, false,
    ARRAY['Personal Health Information', 'Financial Data'],
    'Mahesh Kumar', 'mahesh.kumar@example.com',
    'ML model that classifies incoming disability claims by complexity and routes them to the appropriate adjuster tier. Processes approximately 2,000 claims per month.',
    'High'
  ),
  (
    'Disability Benefits Eligibility Model',
    'ML Regression Model',
    'Individual Insurance',
    'Pilot',
    true, true, false,
    ARRAY['Personal Health Information', 'Demographic Data', 'Financial Data'],
    'Mahesh Kumar', 'mahesh.kumar@example.com',
    'Regression model estimating disability benefit eligibility score based on medical and financial factors. Currently in pilot with 200 advisors.',
    'Critical'
  ),
  (
    'Policy Q&A Assistant',
    'Generative AI (LLM)',
    'Customer Experience',
    'Proof of Concept (POC)',
    true, false, false,
    ARRAY['Internal Operational Data'],
    'Mahesh Kumar', 'mahesh.kumar@example.com',
    'RAG-powered LLM chatbot allowing policyholders to ask plain-language questions about their group benefits coverage. POC with 50 internal testers.',
    'Medium'
  );
*/


-- ─────────────────────────────────────────────────────────────────────────────
-- Schema version: 1.0.0
-- Author: Mahesh Kumar
-- Last updated: May 2026
-- ─────────────────────────────────────────────────────────────────────────────
