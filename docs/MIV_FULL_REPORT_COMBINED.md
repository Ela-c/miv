# MIV Market & Competitive Intelligence — Combined Report (2025)

Version: 1.0
Date: 2025-08-08
Owner: Strategy
Audience: Product, Engineering, GTM, Exec

---

## Table of Contents
- Part I: Market Analysis
  - Executive Summary
  - Market Landscape
  - Product Blueprint
  - AI-Accelerated Delivery Plan (4–6 Weeks)
  - Packaging & KPIs
  - Standards & Security
  - References (Selected)
  - Deep Market Analysis (Expanded)
- Part II: Competitive Analysis & Actionable Learnings
  - Executive summary
  - Market overview and job-to-be-done
  - Competitive deep dives and learnings
  - Cross-cutting best practices
  - Architecture recommendations
  - Product roadmap
  - Pricing & packaging signals
  - KPIs, Risks, Checklist, Source links

---

# Part I: Market Analysis 

# MIV Venture Pipeline & Impact Platform — 2025 Market Analysis Report

Version: 1.1 (fast‑track)
Date: 2025‑08‑08

---

## Executive Summary
MIV unifies relationship‑intelligence CRM, accelerator/program operations, and impact/ESG measurement in one platform. Demand is driven by ISSB/IFRS S1 & S2, LP/DFI expectations, and AI applied across sourcing, screening, portfolio, and impact. This report includes a compressed 4–6 week AI‑accelerated delivery plan and export‑ready content.

Highlights
- ESG reporting software: ~US$0.9B (2024) → ~US$2.1B (2029), ~17% CAGR.
- Verdantix leaders include Workiva, Watershed, Wolters Kluwer, Cority, Sphera, IBM/Envizi, Microsoft, Salesforce.
- US VC AUM ~US$1.29–1.41T (2024–2025); accelerators oversubscribed (~1.6M applicants; ~48k accepted/year).
- MIV differentiation: GEDSI‑native analytics; IRIS+/2X/B Lab/ISSB interoperability; evidence automation; inclusive relationship graph; one‑click reporting.

---

## Market Landscape (Concise)
- CRMs (Affinity, DealCloud, 4Degrees): strong on relationship intelligence; limited program ops & standards.
- Accelerator tools (Submittable, Evalato, Babele, Acterio): strong applications/judging/community; limited CRM/standards.
- Impact/ESG (Vera Amp Impact; Verdantix leaders): strong standards/controls; less venture/accelerator workflow.
- MIV wedge: unify CRM + program ops + standards/interoperability in one stack.

---

## Product Blueprint (Concise)
- Ingestion: email/calendar, files, enrichment (PitchBook/Dealroom/Crunchbase/LinkedIn), forms/webhooks, news.
- Graph CRM: People–Org–Deal–Program graph, activity capture, dedupe, enrichment.
- Intake & Judging: configurable forms, multi‑round rubrics, bias‑aware scoring, full audit trails.
- Mentor/Expert: matchmaking and feedback.
- Impact & GEDSI: IRIS+ mapping, disaggregations, 2X checks, B Lab topic evidence, ISSB S2 prompts where relevant.
- Analytics & Reporting: dashboards, report packs (LP/DFI/B Lab/ISSB/board).
- Security & Privacy: SSO, RBAC, tenant isolation, field‑level controls, audit logs, residency options.

---

## AI‑Accelerated Delivery Plan (4–6 Weeks)
Assumptions: Next.js/Node, Postgres, access to LLMs/embeddings (OpenAI/Anthropic), enrichment APIs, Gmail/Exchange scopes, simple UIs; hardening in weeks 5–6.

- Week 0–1 Foundations
  - Identity & multi‑tenancy; RBAC and audit logging.
  - Email/Calendar capture (Gmail/Exchange) and LLM‑assisted entity resolution/dedupe.
  - Basic pipeline and intake portal (forms/webhooks); initial IRIS+/2X libraries.

- Week 1–2 Graph & GEDSI
  - Relationship graph v1 with warm‑intro paths (embeddings + heuristics).
  - GEDSI disaggregations; inclusive sourcing analytics; LP/impact report templates.

- Week 2–3 Programs & Evidence
  - Cohort ops v1 (application review, rubrics, multi‑round); mentor marketplace MVP.
  - Evidence vault (file store, metadata, provenance); e‑sign integration.

- Week 3–4 Standards & Dashboards
  - Standards composer: B Lab topic checklists with clarifying compliance criteria; ISSB S1/S2 assist prompts.
  - Dashboards: velocity, warm‑intro conversion, inclusion KPIs, cohort outcomes.

- Week 4–6 Copilots & Hardening
  - Copilots: meeting/impact summaries; graph/metrics Q&A; next‑best action.
  - Carbon helper (ISSB S2): guided data capture and assumptions; audit notes.
  - Enterprise add‑ons: SCIM, field‑level RBAC, data residency selectors; performance and reliability hardening.

Risk controls: freeze minimal scope per week; daily demos; feature flags; logs/traces/metrics.

---

## Packaging & KPIs (Concise)
- Packages: Core Platform (dealflow/intake/graph) • Program Ops • Impact & Standards • AI Copilots • Analytics+.
- KPIs: time‑to‑first‑response; warm‑intro conversion; stage velocity; inclusive outreach score; IRIS+ coverage; 2X alignment %; B Lab readiness; report‑in‑one‑click %; mentor match satisfaction.

---

## Standards & Security (Concise)
- ISSB/IFRS S1 & S2: governance/strategy/risk/metrics; Scope 1–3 where relevant; methodology notes.
- B Lab 2025: seven topics; phased Y0/Y3/Y5; interoperability references.
- IRIS+: five dimensions; GIIN core metric sets; thematic taxonomy.
- 2X Criteria & MEDA GEM: checks and action plans embedded.
- Security/Privacy: SOC2/ISO‑aligned practices; data minimization; data residency; audit logs; DSRs. See docs/SECURITY_PRIVACY_CHECKLIST.md.

---

## References (Selected)
Verdantix (ESG 2025; Carbon 2023); MarketsandMarkets (ESG); IFRS/ISSB S1/S2; B Lab (2025 standards); GIIN IRIS+; 2X Criteria; MEDA GEM; Affinity/DealCloud/4Degrees comparisons; Submittable/Evalato/Babele/Acterio.

Prepared for export.

---

## Deep Market Analysis

### 1) Expanded Landscape & Trends
- Segments: VC/CVC funds, accelerators/incubators, DFIs/NGOs, universities/government labs.
- Trends: convergence of CRM + program ops + impact reporting; AI default in workflows; standardization via ISSB S1/S2, B Lab 2025, IRIS+ five dimensions; GEDSI/2X mainstreaming; privacy/regulatory tightening (residency, DSRs).

### 2) Competitive Deep Dives
- Relationship CRMs: Affinity (auto‑capture, relationship scoring; advanced features tiered), DealCloud (enterprise configurable; long, costly rollouts), 4Degrees (private‑market‑focused; fewer native integrations). Gap: program ops and standards.
- Accelerator tools: Submittable (submissions/review/disbursement), Evalato (judging/awards high‑volume), Babele (application funnels, learning, mentor matching), Acterio (community/membership). Gap: graph CRM and standards composer.
- Impact/ESG: Vera Amp Impact (IMP five dimensions; Salesforce native), Verdantix leaders (Workiva/Watershed/Wolters Kluwer/Cority/Sphera/IBM/Envizi/Microsoft/Salesforce). Gap: venture ops.

### 3) Buyer Personas & Procurement
- VC Partner/Platform: velocity, warm‑intro conversion, portfolio support ROI; minimal data entry.
- Accelerator Director: fair/defensible selection, mentor matching, cohort outcomes; reduced admin.
- ESG/Impact Lead: IRIS+ coverage, GEDSI/2X alignment, B Lab readiness, ISSB S1/S2 mapping; audit logs.
- IT/Security: SSO/SCIM, RBAC, residency, auditability, DPIAs.
- Criteria: workflow fit (25%), relationship intelligence (20%), standards & reporting (20%), security/compliance (15%), integrations (10%), TCO/time‑to‑value (10%).

### 4) Porter’s Five Forces
- New Entrants: Medium – AI lowers prototyping cost; standards/security increase barriers.
- Suppliers: Medium/High – enrichment data providers, model APIs; adopt multi‑provider strategy.
- Buyers: Medium – fragmented mid‑market; enterprise CFO/IT scrutiny.
- Substitutes: Medium – general CRMs + spreadsheets; point tools.
- Rivalry: Medium/High – entrenched CRMs and program tools; ESG leaders adjacent.

### 5) Pricing Benchmarks & Packaging
- Benchmarks: CRMs US$100–250/user/mo + platform; accelerator tools US$10–50k/program/yr; ESG often six‑figure annual + services.
- Packaging: Core Platform • Program Ops • Impact & Standards • AI Copilots • Analytics+ • Implementation/Success.

### 6) GTM Motions
- ICPs: funds (10–60 FTE), national/regional accelerators, universities, DFIs with venture support.
- Land with intake + graph + fast reporting; expand to impact/standards and enterprise security.
- Channels: data providers; accelerator/university networks; GIIN/2X/B Lab ecosystems.

### 7) Architecture & Security (Expanded)
- Data: Postgres (row/column‑level security), Warehouse (dbt marts), Object (KMS, lifecycle), Search (OpenSearch), Vector DB (embeddings).
- Services: Auth (OIDC/SAML/MFA/SCIM), Multi‑tenancy, CRM/Graph, Intake/Judging, Mentor, Impact/GEDSI, Rules/Workflows, Docs, Reporting, Analytics.
- Privacy/Security: audit logs (immutable), retention/DSR automation, DPIAs, tenant residency, encryption, rate‑limiting.

### 8) AI Strategy
- Auto‑capture & dedupe; warm‑intro path scoring; meeting/impact summaries; standards prompts (B Lab/ISSB/IRIS+); next‑best actions; guardrails (PII redaction, policy‑based access, HIL review).

### 9) KPIs
- Sourcing & Inclusion: application volume; inclusive outreach score; demographic conversion; reviewer bias indicators.
- Dealflow: time‑to‑first‑response; warm‑intro conversion; stage velocity; win rates.
- Program Outcomes: mentor hours; milestones; follow‑on capital; jobs (disaggregated); survival rate.
- Impact: IRIS+ coverage; 2X %; B Lab readiness; climate metrics; evidence completeness.
- Ops: capture automation %; duplicate rate; report‑in‑one‑click %; SLA; CSAT/NPS.

### 10) Risks & Mitigations
- Data Quality → entity resolution, reviewer workflows, provenance, model‑assisted QA.
- Privacy/Residency → tenant residency options; redaction; retention; consent UX.
- Standards Drift → versioned mappings; changelogs; expert reviews.
- Vendor Lock‑in → pluggable enrichment/model providers; data export.
- Adoption → in‑app guides, templates, migration tooling.

### 11) References
- Verdantix (ESG/Sustainability Reporting 2025; Carbon 2023), MarketsandMarkets (ESG reporting 2024–2029), IFRS/ISSB S1/S2 (ACCA, IFRS), B Lab (2025 standards & KB), GIIN IRIS+ (five dimensions; taxonomy), 2X Criteria, MEDA GEM, Affinity/DealCloud/4Degrees, Submittable/Evalato/Babele/Acterio.

---

# Part II: Competitive Analysis & Actionable Learnings 

## MIV competitive analysis and actionable learnings (2025)

Version: 1.0
Owner: Strategy
Audience: Product, Engineering, GTM, Exec

### Executive summary

- **Who we benchmarked**: Relationship‑intelligence CRMs (Affinity, DealCloud/Intapp, 4Degrees), Accelerator/Program Ops (Babele, Acterio, Submittable, Evalato), ESG/Impact reporting (Vera Solutions Amp Impact, Workiva, Watershed, Enablon/Wolters Kluwer, Cority, Sphera, IBM Envizi, Microsoft Cloud for Sustainability, Salesforce Net Zero Cloud). Also data sources: PitchBook, Dealroom, Crunchbase.
- **Key insight**: The category leaders win by (1) automated, trustworthy data capture; (2) relationship graph intelligence; (3) workflow depth for their core buyer; (4) audit‑ready reporting with strong controls; (5) opinionated UX that makes the default path fast.
- **MIV differentiation**: Blend relationship intelligence + venture program operations + impact/GEDSI rigor in a modern, AI‑assisted platform. Lead with superior onboarding, entity resolution, IRIS+ native metrics, and “one‑click” investor/impact reports.
- **Action now (0–90 days)**: Nail data ingestion (email/calendar/CSV/CRM), entity dedupe, warm‑intro mapping, configurable pipeline, IRIS+ templates, and reviewer/judging workflows. Ship audit logs and SSO basics. Add a helpful AI copilot that explains and cites.
- **Measure success**: Automation rate, duplicate rate, time‑to‑first‑response, warm‑intro conversion, stage velocity, IRIS+ coverage, reviewer agreement rates, one‑click report rate, permission/audit errors.

---

## Market overview and job‑to‑be‑done

- **Relationship‑intelligence CRMs**: For funds and BD teams to source deals through network heat, automate activity capture, prioritize outreach, and progress pipeline. JTBD: “Never miss a warm path, keep pipeline fresh without manual data entry.”
- **Accelerator/Program software**: For intake, review, cohort ops, mentor matching, events, awards, and disbursements. JTBD: “Run fair, fast, transparent programs and prove outcomes.”
- **ESG/Impact platforms**: For collecting, assuring, and reporting sustainability and impact metrics. JTBD: “Make audit‑ready disclosures and show credible impact.”
- **Where MIV fits**: Unify these three: sourcing + program ops + impact reporting, with GEDSI/IRIS+ at the data model core and AI that accelerates (not replaces) human judgment.

---

## Competitive deep dives and what MIV can learn

### Relationship‑intelligence CRMs

#### Affinity
- **Core**: Automated email/calendar capture (Gmail/Exchange), relationship graph, pipeline views, enrichment connectors, reminders/snoozes, Chrome plugins, mobile app.
- **Strengths**: Best‑in‑class activity capture UX, intuitive relationship heat, simple pipeline; wide adoption in VC/PE; decent ecosystem.
- **Gaps**: Limited program ops; custom data models can get awkward; impact/ESG not first‑class; pricing can scale up quickly with seats.
- **MIV learnings**:
  - Make email/calendar sync turnkey with safe defaults and per‑user controls.
  - Ship a clear relationship score with transparent factors (recency, frequency, mutuality) and allow overrides.
  - Design pipeline board and list views with fast inline edits and bulk ops.
  - Build “nudge” system: stale deals, missing next step, upcoming deadlines.
  - Embrace bi‑directional enrichment (PitchBook/Dealroom/Crunchbase) with idempotent updates.

#### DealCloud (Intapp)
- **Core**: Highly configurable data model, enterprise workflows, Outlook add‑ins, strict permissions, audit trails, compliance and conflicts checks.
- **Strengths**: Enterprise scale, field‑level security, serious governance; deep reporting; strong in PE/IB.
- **Gaps**: Longer implementation, heavier UX, customization needs admins/consultants.
- **MIV learnings**:
  - Prioritize field‑ and record‑level permissions with role templates.
  - Provide robust audit logs (read/write), exportable for compliance.
  - Offer opinionated defaults for SMB/mid‑market to avoid implementation drag.

#### 4Degrees
- **Core**: Relationship intelligence, ML‑based recommendations, activity capture, deal pipelines.
- **Strengths**: Time‑to‑value; relevant suggestions; focused on VC/PE workflows.
- **Gaps**: Smaller ecosystem; fewer enterprise controls than Intapp.
- **MIV learnings**:
  - Build lightweight “next‑best action” surfaced in context (email, record, pipeline card).
  - Keep admin setup minimal; ship “industry packs” (VC, accelerator, corporate venturing).

### Accelerator / Program management

#### Babele
- **Core**: Community learning, mentorship, project workspaces.
- **Strengths**: Knowledge sharing and mentor engagement.
- **Gaps**: Limited enterprise controls; reporting depth.
- **MIV learnings**:
  - Spaces for mentors/startups with tasks, resources, nudges.
  - Lightweight content library with versioning and access rules.

#### Acterio
- **Core**: Program ops, venture onboarding, KPIs, partner management.
- **Strengths**: End‑to‑end accelerator workflows; startup portals.
- **Gaps**: Less focus on relationship graph; limited ESG depth.
- **MIV learnings**:
  - Cohort operations: milestones, mentor matching, events, announcements.
  - Startup‑facing portal for self‑service updates and evidence uploads.

#### Submittable
- **Core**: Application forms, reviewer assignments, multi‑round workflows, communication, grant disbursement.
- **Strengths**: Scalable, accessible application UX; robust reviewer tools; anti‑bias features; audit trails.
- **Gaps**: Not tailored to venture pipelines beyond intake/review.
- **MIV learnings**:
  - Form builder with versioned templates, dependencies, and validation.
  - Reviewer calibration, double‑blind options, rubric scoring, tie‑breakers.
  - Applicant transparency (status, feedback windows) and accessibility (WCAG).

#### Evalato
- **Core**: Awards, judging, submissions, public galleries.
- **Strengths**: Clean judging UX; multi‑criteria scoring; bulk ops.
- **Gaps**: Not venture‑specific; limited impact/ESG.
- **MIV learnings**:
  - Fast, mobile‑friendly reviewing, offline buffers, auto‑save.
  - Judge agreement/variance analytics and reliability metrics.

### ESG / Impact measurement and reporting

#### Vera Solutions – Amp Impact (Salesforce‑native)
- **Core**: Logframes/results frameworks, indicators, targets, evidence, portfolios, Salesforce objects.
- **Strengths**: Mature indicator hierarchy; M&E rigor; leverages Salesforce platform controls.
- **Gaps**: Salesforce dependency; UX complexity for non‑admins.
- **MIV learnings**:
  - Model IRIS+ natively with hierarchies (themes → metrics → indicators → targets). Map to 2X, SDGs.
  - Evidence management (files, links, attestations), variance/assurance flags.
  - Portfolio roll‑ups and multi‑program aggregation with time series.

#### Workiva
- **Core**: Connected reporting, controls, audit‑ready filings.
- **Strengths**: Collaboration with lineage; assurance workflows; regulator‑grade exports.
- **Gaps**: Financial reporting bias; setup heft for small teams.
- **MIV learnings**:
  - Data lineage/traceability: every chart and statement links to source.
  - Roles for preparer/reviewer/approver with e‑sign and trails.

#### Watershed
- **Core**: Carbon accounting, supplier data collection, targets, reports.
- **Strengths**: Data connectors; auditability; scenario tools.
- **Gaps**: Carbon‑centric; broader impact/GEDSI limited.
- **MIV learnings**:
  - Data pipeline design for external supplier/portfolio data with nudges.
  - Emissions factors catalog and unit handling patterns transferable to IRIS+.

#### Enablon (Wolters Kluwer), Cority, Sphera
- **Core**: EHS/ESG at enterprise scale, compliance, incidents, audits.
- **Strengths**: Depth of controls, regulatory mapping, validation.
- **Gaps**: Heavyweight UX; long implementations.
- **MIV learnings**:
  - Compliance register and controls library; checklists; attestations.
  - Field‑level validations and strong reference data governance.

#### IBM Envizi, Microsoft Cloud for Sustainability, Salesforce Net Zero Cloud
- **Core**: Enterprise integrations, sustainability data models, dashboards.
- **Strengths**: Connectors, scale, ecosystems.
- **Gaps**: Generic; venture/impact specifics require customization.
- **MIV learnings**:
  - Integration‑first strategy: ETL adapters, APIs, event webhooks.
  - App templates/accelerators for common use‑cases.

### Data enrichment providers

- **PitchBook, Dealroom, Crunchbase**
  - **Learnings**: Clear entity matching/override workflow; capture provenance for every enrichment; rate‑limit aware, idempotent updates; configurable field mapping and sync cadence; pricing can add up—design selective, on‑demand calls.

---

## Cross‑cutting best practices to adopt

- **Automated capture with consent**: Per‑user control, granular scopes, “trust but verify” review queue. Clear privacy copy.
- **Entity resolution**: Deterministic + probabilistic matching with explainability; merge/unmerge with audit history.
- **Relationship graph**: Pathfinding, second‑degree warm intro suggestions, relationship health trend.
- **Opinionated workflows**: Intake → triage → review → diligence → decision → onboarding; ship defaults with escape hatches.
- **Assurance‑grade reporting**: Source traceability, calculation audit, reviewer sign‑off, export packs.
- **Accessibility**: WCAG 2.1 AA; keyboard, contrast, captions; accessible reviewer and applicant portals.
- **Performance and resilience**: Async jobs, idempotency keys, backpressure, circuit breakers.
- **Security and privacy**: SSO (OIDC/SAML), RBAC/ABAC, field‑level controls, tenant isolation, audit logs, data residency, DSR automation.

---

## Architecture recommendations (informed by market leaders)

- **Core systems**
  - OLTP: PostgreSQL/Cloud SQL with strict schemas for ventures, organizations, contacts, programs, submissions, reviews, metrics, evidence, users, roles.
  - OLAP: Warehouse (BigQuery/Snowflake/Redshift) for analytics and reporting; daily/near‑real‑time sync.
  - Object storage: S3/GCS for evidence, exports, audit bundles.
  - Search index: OpenSearch/Elasticsearch for fast entity and full‑text search.
  - Vector DB: Embeddings for semantic search, dedupe hints, recommendation memory.

- **Data pipelines**
  - Connectors: Email/calendar, enrichment (PitchBook/Dealroom/Crunchbase), uploads/CSV, legacy CRMs, ESG data feeds.
  - Ingestion bus: Durable queue, schema validation, PII tagging, dead‑letter handling.
  - Entity resolution: Rule engine + ML model, human‑in‑the‑loop review, full lineage.
  - Metrics engine: IRIS+/2X catalog, unit handling, disaggregation by demographic, time series, roll‑ups.

- **AI copilot**
  - Guardrails: Cite sources, show confidence, avoid hallucination by constraining to tenant data + curated docs.
  - Use cases: Meeting summaries, Q&A, duplicate detection, next‑best action, rubric suggestions, narrative generation for reports.
  - Safety: Prompt filters, PII redaction in prompts, per‑tenant vector stores.

- **Security**
  - SSO: OIDC/SAML providers, JIT provisioning, SCIM for lifecycle.
  - RBAC/ABAC: Roles (Admin/Reviewer/Mentor/Founder/LP) + attributes (program, cohort, deal team, geography).
  - Field‑level controls: Masking, purpose limitation, consent flags.
  - Auditability: Tamper‑evident logs, evidence checksums, retention policies.

---

## Product roadmap from learnings

- **Now–30 days (foundation)**
  - Email/calendar sync (read‑only first) with user controls and review queue.
  - Pipeline boards/lists, bulk edits, reminders, SLA timers.
  - Intake builder (v1), reviewer assignments, rubric scoring, calibration.
  - IRIS+ metric templates and basic roll‑ups; evidence uploads.
  - SSO (OIDC), roles, audit logs (write events), basic exports.

- **30–90 days (intelligence)**
  - Relationship score + warm‑intro pathfinding.
  - Entity resolution with merge/unmerge history.
  - Reviewer reliability analytics; bias checks; accessibility polish.
  - Portfolio impact dashboards; variance flags; traceability to sources.
  - Data connectors (one enrichment provider to start); webhook framework.

- **90–180 days (scale & assurance)**
  - Field‑level permissions; read‑audit logs; data residency controls.
  - Automated report packs (investor, board, impact) with narratives.
  - Supplier/partner data collection flows; attestations; e‑sign.
  - Advanced search (semantic + filters); duplicate workspace views.
  - App marketplace for integrations.

---

## Pricing and packaging signals

- **Observed**: Per‑seat (Affinity, 4Degrees), platform + implementation (DealCloud), per‑program/per‑application (Submittable/Evalato), module add‑ons (ESG suites), consumption for enrichment/API calls.
- **MIV guidance**:
  - Core platform tiers by team size and programs; add‑ons for AI copilot, enrichment, advanced security, extra storage/compute.
  - Fair usage: metering enrichment/exports; volume discounts.
  - Enterprise: SSO, RBAC/ABAC, audit, residency, premium support.

---

## KPIs to mirror from leaders

- **Sourcing & inclusion**: Application volume, inclusive outreach, conversion by demographic, time‑to‑first‑response.
- **Pipeline**: Warm‑intro conversion, stage velocity, win rates, stale item reduction.
- **Program**: Reviewer throughput, agreement/variance, cycle time, mentor satisfaction.
- **Impact**: IRIS+ coverage, 2X alignment, evidence completeness, assurance sign‑offs.
- **Operational**: Automation rate, duplicate rate, one‑click report rate, API error rate, PII incidents.

---

## Risks and mitigations

- **Data privacy concerns with email/calendar sync**: Implement per‑user scopes, redaction, exclude lists, and transparent logs. Default to minimal capture.
- **Entity merge errors**: Human‑in‑the‑loop review queue; reversible merges; comprehensive lineage.
- **AI hallucination**: Constrain context to tenant data; require citations; allow users to disable.
- **Implementation drag**: Opinionated defaults, templates, industry packs; in‑product setup assistant; partner network.
- **Compliance complexity**: Controls library, mapping to standards, attestations and evidence; exportable audit bundles.

---

## Concrete feature checklist (shortlist)

- Intake builder with versioned templates and rubric scoring.
- Reviewer assignment, calibration, and agreement analytics.
- Email/calendar capture with consent + review queue.
- Relationship graph with warm‑intro pathfinding and relationship score.
- Pipeline boards/lists with bulk operations and SLA timers.
- IRIS+ native model, disaggregations, evidence, portfolio roll‑ups.
- One‑click report packs with narratives and citations.
- SSO, RBAC/ABAC, field‑level controls, audit logs, data residency.
- Entity resolution (merge/unmerge) with lineage.
- Integration framework (webhooks, connectors) and enrichment provider.

---

## Source links

- Relationship‑intelligence CRMs: [Affinity](https://www.affinity.co/), [DealCloud (Intapp)](https://www.intapp.com/products/dealcloud/), [4Degrees](https://www.4degrees.ai/)
- Accelerator/Incubator: [Babele](https://www.babele.co/), [Acterio](https://acterio.com/), [Submittable](https://www.submittable.com/), [Evalato](https://evalato.com/)
- ESG/Impact: [Vera Solutions – Amp Impact](https://www.verasolutions.org/amp-impact/), [Workiva](https://www.workiva.com/), [Watershed](https://watershed.com/), [Enablon (Wolters Kluwer)](https://www.wolterskluwer.com/en/solutions/enablon), [Cority](https://www.cority.com/), [Sphera](https://sphera.com/), [IBM Envizi](https://www.ibm.com/products/envizi), [Microsoft Cloud for Sustainability](https://www.microsoft.com/en-us/sustainability/cloud), [Salesforce Net Zero Cloud](https://www.salesforce.com/products/net-zero-cloud/overview/)
- Data enrichment: [PitchBook](https://pitchbook.com/), [Dealroom](https://dealroom.co/), [Crunchbase](https://www.crunchbase.com/)

---

End of combined report.