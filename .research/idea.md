# Invoice Processing App — Idea & Decisions

## Problem

Floriculture wholesale company receives supplier invoices as non-standardized PDFs via email (Dutch, English, German, Spanish, Italian). Staff manually reads, maps, and enters data into ERP (AlfaPro NEXT). This is time-consuming, error-prone, and lacks standardization.

## Target Solution

A web app where users upload supplier PDFs, AI extracts the invoice data, a human reviews and corrects it, and a CSV is exported for import into AlfaPro NEXT.

## Decisions

| Concern | Decision |
|---|---|
| Input | Manual PDF upload via web UI |
| Extraction | Microsoft Foundry Content Understanding (mocked until credentials available) |
| Review | Human always reviews + inline edits before CSV export |
| Product mapping | Out of scope — raw supplier text passed through to CSV |
| Output format | CSV with fields: item name, quantity, price |
| Volume / users | Small volume, 2-5 internal users |
| Authentication | None for now |
| Invoice history | Basic — stored, viewable, re-exportable |
| Deployment | Internal hosted web app |
| Frontend/backend | Next.js full-stack |
| Database | PostgreSQL |

## Tech Stack

- **Framework**: Next.js (full-stack, API routes + React UI)
- **Monorepo**: Nx
- **Package manager**: pnpm
- **Database**: PostgreSQL (via Prisma or Drizzle)
- **Document AI**: Microsoft Foundry Content Understanding (stubbed initially)
- **Deployment**: Azure (App Service or similar)

## Key Notes

- Azure Foundry Content Understanding resource will be provisioned later — extraction layer must be mockable
- No per-supplier template rules — rely on AI extraction for layout variance and multi-language support
- Product name mapping stays in AlfaPro NEXT via its own import mapping rules
- AlfaPro NEXT exact import spec unknown — using custom CSV schema for now (item name, quantity, price), to be adapted later
- Auth to be added in a future iteration (Microsoft/Entra SSO is the likely path given Azure stack)
