import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "configuration-analyst": {
    levelLabel: "Financials Configuration Analyst",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Oracle Fusion Financials Analyst trained in Oracle Fusion Cloud ERP fundamentals and core accounting, with hands-on " +
      "configuration of enterprise structures, chart of accounts, General Ledger, Accounts Payable, Accounts Receivable, " +
      "Cash Management, Fixed Assets, and Expenses inside a live Oracle Fusion Cloud practice environment. Comfortable " +
      "navigating Setup and Maintenance, building and reconciling journals, and running each subledger's core transaction " +
      "cycle. Targeting Oracle Fusion Financials Analyst, Financial Systems Analyst, or Oracle ERP Analyst roles.",
    skills: [
      "Oracle Fusion Cloud ERP Navigation & Setup and Maintenance",
      "Enterprise Structures (Legal Entities, Ledgers, Business Units)",
      "Chart of Accounts Design (Segments, Value Sets, Hierarchies, Cross-Validation Rules)",
      "General Ledger Journals, Period Close & Reconciliation",
      "Accounts Payable (Invoicing, 2-/3-Way Matching, Payments)",
      "Accounts Receivable (Transactions, Receipts, Collections, Aging)",
      "Cash Management & Bank Reconciliation",
      "Fixed Assets & Depreciation",
      "Expense Management",
      "Core Accounting (Debits/Credits, Trial Balance, Financial Statements)",
      "Agile/Scrum Delivery & Version Control (Git/GitHub)",
    ],
    tools: "Oracle Fusion Cloud Applications (Financials), Functional Setup Manager, Microsoft Excel, Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Mar 2026",
            sub: "Oracle Fusion Financials Consultant Track · Atlanta, GA",
            bullets: [
              "Completed foundations covering how IT teams deliver work (Agile vs. Waterfall, Scrum sprints and user stories, Kanban boards, the Dev/QA/UAT/Production software delivery lifecycle, and version control with Git), core ERP concepts, and Oracle Fusion Cloud navigation (Navigator, work areas, scheduled processes, DEV/TEST/PROD environments), before any hands-on configuration began.",
              "Learned core accounting: the accounting equation, debits and credits, T-accounts, journal entries, the trial balance, accrual vs. cash accounting, revenue recognition basics, depreciation concepts, and how transactions roll up into the Income Statement, Balance Sheet, and Cash Flow Statement.",
              "Designed and deployed a multi-segment chart of accounts — balancing, cost center, and natural account segments, value sets, account hierarchies, and cross-validation rules — and configured legal entities, primary ledgers, business units, and accounting calendars through Functional Setup Manager and the Accounting Configuration Manager.",
              "Created and posted manual, recurring, and mass-allocation journals in Oracle Fusion General Ledger; reconciled account balances using Account Monitor and Account Inspector; ran trial balance reports; and completed period-end close and period-open tasks.",
              "Configured Accounts Payable suppliers, invoice types and distributions, 2-way/3-way matching with tolerances, invoice holds and approvals, and Payment Process Requests; reconciled the Payables subledger to the General Ledger.",
              "Configured Accounts Receivable customers under the Trading Community Model, transaction types, AutoInvoice, receipt application (standard, miscellaneous, and lockbox), collections and dunning, and customer aging reports; reconciled Receivables to the General Ledger.",
              "Set up bank accounts and reconciliation/matching rules in Cash Management, loaded and corrected bank statements (BAI2, MT940, CAMT.053 formats), reconciled Payables payments and Receivables receipts, and built cash positioning and forecasting views.",
              "Configured Fixed Assets categories, depreciation methods, and asset books; added assets manually and through mass additions from Payables invoices; ran depreciation, cost adjustments, transfers, and retirements; reconciled Fixed Assets to the General Ledger.",
              "Configured Expenses templates, policies, limits, and audit rules; processed expense reports from submission through approval, corporate-card reconciliation, and Payables reimbursement; reconciled Expenses to Payables and the General Ledger.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "LTV Manufacturing Corporation — Chart of Accounts Design",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Oracle Fusion Financials Consultant Track",
            bullets: [
              "Designed a five-segment chart of accounts for a fictional two-entity manufacturer (LTV Manufacturing Corporation) — Company, Cost Center, Account, Intercompany, and a reserved Future segment — applying a balancing segment per legal entity and an intercompany segment restricted to match it, so transactions between a US parent and Canadian subsidiary eliminate correctly.",
              "Grouped Assembly, Fabrication, and Corporate Overhead cost centers under 'Manufacturing' and 'Corporate' parent values in an account hierarchy so results could be rolled up either way, while leaving a Future segment unlabeled and reserved for a later product-line reporting need instead of redesigning the structure from scratch.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
  consultant: {
    levelLabel: "Financials Consultant",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Oracle Fusion Financials Consultant trained end-to-end across Procure-to-Pay, Order-to-Cash, and Subledger " +
      "Accounting, with SQL, FBDI/ADFdi data loading, REST API integration, Oracle Fusion security, and implementation " +
      "methodology layered on top of core Financials configuration (General Ledger, Payables, Receivables, Cash " +
      "Management, Fixed Assets, Expenses). Comfortable following one transaction from a business event through to the " +
      "General Ledger, writing SQL to investigate and reconcile financial data, and working inside a structured " +
      "fit-gap-to-go-live implementation process. Targeting Oracle Fusion Financials Consultant, Oracle ERP Analyst, or " +
      "Financial Systems Analyst roles.",
    skills: [
      "Oracle Fusion Financials Configuration (Enterprise Structures, GL, AP, AR, Cash Management, Fixed Assets, Expenses)",
      "Procure-to-Pay (Requisition → PO → Receipt → Invoice → Payment)",
      "Order-to-Cash (Sales Order → Fulfillment → Billing → Cash Application)",
      "Subledger Accounting (Accounting Rules, Account Derivation, Create Accounting)",
      "SQL for Financial Data Investigation & Reconciliation",
      "Data Loading (FBDI, ADFdi, Interface Tables)",
      "REST APIs & JSON Integration",
      "Oracle Fusion Security (Roles, Data Access, Segregation of Duties)",
      "Implementation Methodology (Fit-Gap, SIT/UAT, Cutover, Hypercare)",
      "Financial Reporting (OTBI, BI Publisher, Financial Reporting Studio, Smart View)",
      "Agile/Scrum Delivery & Version Control (Git/GitHub)",
    ],
    tools:
      "Oracle Fusion Cloud Applications (Financials, Procurement, Order Management), FBDI/ADFdi, Postman (REST client), " +
      "SQL, OTBI, BI Publisher, Smart View, Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Jun 2026",
            sub: "Oracle Fusion Financials Consultant Track · Atlanta, GA",
            bullets: [
              "Built on a Financials Configuration Analyst foundation — enterprise structures, chart of accounts, General Ledger, Accounts Payable, Accounts Receivable, Cash Management, Fixed Assets, and Expenses — by following complete business transactions end to end and adding the technical and implementation skills a consulting role requires.",
              "Followed one purchasing transaction end to end through Procure-to-Pay — a self-service requisition, purchase order, 3-way-matched receipt, AP invoice, and payment — and practiced exception scenarios including price variances, over-receipts, and invoice holds.",
              "Followed one customer transaction end to end through Order-to-Cash — a sales order with pricing and a credit-check hold, fulfillment and shipping, AutoInvoice billing, and cash receipt application — and practiced return/RMA and billing-exception scenarios.",
              "Configured Subledger Accounting rules — journal line types, account rules and derivation, mapping sets, and application accounting definitions — ran Create Accounting in both draft and final mode, and reconciled subledger journal entries to the General Ledger.",
              "Wrote SQL against Oracle Fusion Financials tables — joining suppliers, invoices, and payments; customers, transactions, and receipts; and journals to ledgers and periods — building aging buckets with CASE, using window functions for running totals, and using subqueries, CTEs, and NOT EXISTS to find missing records and duplicates.",
              "Used SQL to answer real finance questions, including finding unpaid supplier invoices over a dollar/age threshold and reconciling AP and AR balances to the General Ledger by tracing a payment back to its originating invoice.",
              "Studied how Oracle Fusion organizes financial data — business units, ledgers, and data access; supplier and customer tables under the Trading Community Model; invoice, payment, and receipt tables; journal headers, batches, and lines; and Subledger Accounting tables — and built a data map of a practice instance.",
              "Loaded data with File-Based Data Import (FBDI) — downloaded and filled templates, generated CSV/ZIP files, ran import processes into interface tables, and corrected validation errors — for journals, Payables invoices, Receivables AutoInvoice transactions, Fixed Assets additions, and bank statements.",
              "Uploaded journals and Payables invoices through ADFdi spreadsheet integration, and compared FBDI, ADFdi, and manual entry to choose the right method for a given data volume and use case.",
              "Made REST API calls against Oracle Fusion Financials resources using a REST client (Postman) — GET requests with query, filter, and paging parameters, record creation and updates, HTTP methods and status codes, JSON responses, and token-based authentication.",
              "Reviewed the Oracle Fusion security model — job, abstract, and data roles, duty roles and privileges, data access sets, business unit and ledger access, and segregation of duties — and practiced testing access as another user and diagnosing access-issue scenarios.",
              "Practiced the Oracle Fusion implementation lifecycle — stakeholder requirements workshops, fit-gap analysis, solution design documents, configuration and migration across DEV/TEST/PROD, system integration and user acceptance testing, defect management, cutover planning, go-live, and hypercare/production support.",
              "Built financial reports and analyses in OTBI, BI Publisher, Financial Reporting Studio, and Smart View, including seeded financial statements, Payables and Receivables aging reports, and a month-end reporting package.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "LTV Manufacturing Corporation — End-to-End Transaction Cycles",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Oracle Fusion Financials Consultant Track",
            bullets: [
              "Traced a complete Procure-to-Pay cycle for a fictional manufacturer (LTV Manufacturing Corporation) — a maintenance requisition for industrial bearings, approved and converted to a purchase order with a sourced supplier, received and inspected, 3-way matched against the supplier invoice, and paid — reconciling all three resulting journal entries (receipt accrual, invoice accounting, and payment) into the General Ledger.",
              "Traced a complete Order-to-Cash cycle for a 400-unit sales order to a distributor customer — including a volume discount, a credit-check hold, a partial return (RMA), an AutoInvoice rejection and correction, and a lockbox cash receipt — reconciling the invoice, credit memo, and receipt journal entries into the General Ledger.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
  "senior-consultant": {
    levelLabel: "Senior Financials Consultant",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Senior Oracle Fusion Financials Consultant trained to own a full implementation end to end — configuring an " +
      "Oracle Fusion Financials instance for a two-entity manufacturer, running a month of real Payables, Receivables, " +
      "Fixed Assets, Cash Management, and General Ledger transactions, then diagnosing and resolving a six-problem " +
      "month-end close under a CFO deadline. Comfortable working a support ticket from symptom to root cause to " +
      "documented fix, and presenting a finished implementation to a non-technical stakeholder. Targeting Senior Oracle " +
      "Financials Consultant, Oracle Fusion Financials Consultant, or Oracle ERP Analyst roles.",
    skills: [
      "End-to-End Oracle Fusion Implementation (Design → Configuration → Operations → Month-End Close)",
      "Production Support & Root-Cause Troubleshooting (AP, AR, GL, SLA, Assets, Security, Data/Integration)",
      "Month-End Close & Multi-Subledger Reconciliation",
      "Intercompany Accounting & Elimination",
      "Procure-to-Pay & Order-to-Cash",
      "Subledger Accounting & General Ledger Posting",
      "SQL, FBDI/ADFdi & REST API Integration",
      "Oracle Fusion Security & Segregation of Duties",
      "Implementation Methodology (Fit-Gap, SIT/UAT, Cutover, Hypercare)",
      "Issue Logging & Implementation Documentation",
      "Financial Reporting & Executive Presentation",
      "Agile/Scrum Delivery & Version Control (Git/GitHub)",
    ],
    tools:
      "Oracle Fusion Cloud Applications (Financials, Procurement, Order Management), FBDI/ADFdi, Postman (REST client), " +
      "SQL, OTBI, BI Publisher, Smart View, Git",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jan 2026 – Sep 2026",
            sub: "Oracle Fusion Financials Consultant Track (Full Program) · Atlanta, GA",
            bullets: [
              "Completed the full Oracle Fusion Financials Consultant track — ERP and accounting foundations; configuration of enterprise structures, chart of accounts, General Ledger, Accounts Payable, Accounts Receivable, Cash Management, Fixed Assets, and Expenses; end-to-end Procure-to-Pay, Order-to-Cash, and Subledger Accounting; SQL, FBDI/ADFdi, and REST API integration; Oracle Fusion security; and implementation lifecycle methodology — before moving into production support and the capstone.",
              "Worked structured support tickets across Payables, Receivables, Cash Management, General Ledger, Subledger Accounting, Fixed Assets, Expenses, security, and data/integration issues — diagnosing root cause step by step and documenting the resolution for scenarios including an invoice stuck on hold, a matching variance, a journal that would not post, a failed accounting period close, a failed FBDI import, and a REST API error response.",
              "Completed a full Oracle Fusion Financials implementation capstone for a fictional two-legal-entity manufacturer (LTV Manufacturing Corporation): designed the enterprise structure, chart of accounts, and calendar; configured suppliers, customers, bank accounts, and fixed assets; and ran a full operating month of purchasing, AP invoicing, supplier payments, customer invoicing, cash receipts, asset capitalization, depreciation, bank reconciliation, and Subledger Accounting-to-General-Ledger posting across both entities.",
              "Investigated and resolved a six-problem month-end close under a CFO deadline — an unreversed GRNI accrual causing an AP-aging-to-GL mismatch, a misapplied cash receipt causing conflicting AR aging results, a miscategorized fixed asset overstating depreciation, a duplicate bank transmission leaving a reconciling item open, a missing Subledger Accounting account rule leaving Receivables transactions Incomplete, and an unposted intercompany journal — tracing each symptom to its root cause, correcting it, and verifying the fix.",
              "Assembled a full month-end deliverables package — Income Statement, Balance Sheet, AP Aging, AR Aging, Reconciliation Report, Issue Log, and Implementation Documentation — and presented the finished implementation and the resolved month-end crisis to a simulated CFO stakeholder.",
              "Completed career and interview preparation covering Oracle Financials terminology, functional and scenario-based interview questions, troubleshooting and implementation-methodology questions, and how to present this capstone implementation in an interview.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "LTV Manufacturing Corporation — End-to-End Oracle Fusion Financials Implementation (Capstone)",
            right: "2026",
            sub: "Lifting the Veil IT Academy, Oracle Fusion Financials Consultant Track",
            bullets: [
              "Configured a two-legal-entity enterprise structure and chart of accounts (US parent and Canadian subsidiary, balancing and intercompany segments, Assembly/Fabrication/Corporate Overhead cost centers) and built the supplier, customer, bank account, and fixed asset master data needed to transact against it.",
              "Ran a full operating month of purchasing, AP invoicing, supplier payments, customer invoicing, cash receipts, asset capitalization, depreciation, bank reconciliation, and Subledger Accounting-to-General-Ledger posting across both entities.",
              "Investigated a CFO-reported month-end crisis spanning AP aging, AR aging, depreciation, bank reconciliation, Receivables-to-GL posting, and intercompany elimination; traced all six symptoms to their root causes and corrected each one, including reclassifying a miscategorized fixed asset and adding a missing Subledger Accounting account rule that had left 14 Receivables transactions stuck Incomplete.",
              "Delivered a complete month-end package — Income Statement, Balance Sheet, AP Aging, AR Aging, Reconciliation Report, Issue Log, and Implementation Documentation — and presented the resolved implementation in a mock stakeholder review, explaining what was wrong and how each fix was verified.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
