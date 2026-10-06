# The Company, Its Processes and Its Requirements

**Chapter 1 · Design and Configuration · Lesson 2 of 25**

This lesson is the one canonical reference for this entire capstone. Every name, number, and account you'll see in lessons 3 through 25 comes from this page. Bookmark it.

**A note before we start, repeated throughout this capstone:** everything below about "LTV Manufacturing Corporation" is a fictional, illustrative company invented for this path — the same one used in worked examples in Enterprise Structures and Chart of Accounts, Procure-to-Pay, Order-to-Cash, and Troubleshooting Oracle Financials. It is not a real business, it is not based on any real company, and no dollar figure below is a real industry statistic.

## What you'll learn

- The company's industry, structure, locations, and scale
- Its two legal entities and why intercompany activity matters to this project
- The departments, named people, and roles you'll work with for the rest of this capstone
- Its core suppliers, customers, and bank relationships
- The requirements this implementation has to satisfy — your checklist for Chapter 4

## The company

**LTV Manufacturing Corporation** designs and builds industrial control equipment — motor control panels, control cabinets, and related automation components — sold to industrial and utility customers across North America. It is **not** a consumer products company; every sale is B2B, built mostly to order or to stocked specification, and every purchase of raw materials and MRO parts (bearings, electrical components, steel) keeps its two plants running.

- **US parent — LTV Manufacturing Corporation:** headquartered in **Savannah, Georgia**, with its primary plant and distribution center on the same campus. Departments on-site: **Assembly**, **Fabrication**, and **Corporate Overhead** (finance, IT, HR, executive).
- **Canadian subsidiary — LTV Manufacturing Canada ULC:** a smaller plant in **Windsor, Ontario**, serving Canadian and cross-border customers, with its own Assembly, Fabrication, and Corporate Overhead cost centers mirroring the US structure.
- **Scale:** roughly 450 employees combined, illustrative consolidated annual revenue near $180 million.

The two-legal-entity structure is deliberate: it's why this capstone needs a real chart of accounts balancing segment, a real intercompany segment, and real intercompany journal activity — not just a single-entity toy example.

## Departments and teams

| Department | What it does |
|---|---|
| **Finance & Accounting** | Owns the books: GL, AP, AR, Fixed Assets, Cash Management, period close |
| **Procurement** | Buys raw materials and MRO parts (bearings, electrical components, steel) |
| **Plant Operations (Assembly & Fabrication)** | Builds and ships product; requests MRO replacement parts |
| **Sales & Customer Accounts** | Sells and invoices control panels and automation components |
| **Treasury** | Manages bank accounts, disbursements, and reconciliation |
| **IT / Oracle Fusion Team** | Owns the Oracle Fusion configuration — this is the team you're consulting for |

## The people you'll see again

| Name | Role |
|---|---|
| **Elena Marsh** | Chief Financial Officer (CFO) — your executive sponsor, and the one who calls in Chapter 3 |
| **Victor Okafor** | Corporate Controller — owns the period close and GL |
| **Sarah Lindqvist** | Senior Accountant — Subledger Accounting and GL posting |
| **Chen Liu** | Accounts Payable Manager |
| **Mateo Rios** | Accounts Receivable Manager |
| **Grace Olsen** | Treasury / Cash Management Analyst |
| **Derek Shaw** | Fixed Assets Accountant |
| **Marcus Ibarra** | Senior Buyer, Procurement |
| **Dana Whitfield** | Maintenance Supervisor, Savannah plant |
| **Priya Nandan** | Receiving Clerk, Savannah plant |

You are the **Oracle Fusion Financials Consultant**, engaged by Elena Marsh to configure LTV's Financials instance and, later, to get the company through its first month-end close.

## Core suppliers, customers, and banks

- **Suppliers:** Meridian Bearing Supply Co. (preferred supplier for bearings and mechanical MRO parts), Palmetto Steel & Alloy Supply (raw steel), Vantage Electrical Components Inc. (electrical components for control panels), Crescent Freight Logistics (inbound/outbound freight).
- **Customers:** Harborview Industrial Supply (Charlotte, NC — LTV's largest distributor customer), Tidewater Energy Systems (Norfolk, VA), Great Lakes Automation Group (Ontario, Canada — served by the Canadian subsidiary).
- **Banks:** Regions Bank, Savannah, GA, account ending **7734** (primary US operating and disbursement account); Royal Bank of Canada, Windsor, ON, account ending **4420** (Canadian operating account).

## The requirements

Elena Marsh's charge to you, in her own words from the kickoff meeting, breaks into five requirements:

1. **Build an enterprise structure that reflects two real legal entities** (US and Canada), each with its own primary ledger and business unit, sharing one chart of accounts design so results can be compared and consolidated.
2. **Design a chart of accounts that tracks cost centers (Assembly, Fabrication, Corporate Overhead) in both entities and supports intercompany elimination** — this is the design you already rehearsed in Enterprise Structures and Chart of Accounts.
3. **Configure the supplier and customer masters, bank accounts, and fixed asset setup** needed to actually transact — not just a theoretical structure.
4. **Run a full month of real transactions** — purchasing, receiving, AP invoicing, payments, customer invoicing, cash receipts, asset capitalization, depreciation, bank reconciliation, and subledger-to-GL posting — proving the configuration actually works end to end.
5. **Close the first month-end period cleanly**, with every subledger reconciled to the General Ledger, before the books go to the board.

Requirement 5 is the one that goes wrong. Keep this list — Chapter 4 asks you to review your finished work against exactly these five lines.

## Key terms

| Term | Meaning |
|---|---|
| LTV Manufacturing Corporation | This capstone's fictional, illustrative company — never a real business |
| Balancing segment | The chart of accounts segment that must net to zero for each legal entity (Company, in this design) |
| Intercompany activity | Transactions between the US parent and Canadian subsidiary that must eliminate in consolidation |

## Lab

Start a requirements document (a plain text file or spreadsheet is fine). Copy in the company snapshot, the ten-person table, the supplier/customer/bank list, and Elena Marsh's five requirements exactly as written here. You'll refer back to this page, and add to this document, through Chapter 4.

## Check yourself

- Name LTV Manufacturing Corporation's two legal entities and where each is located.
- Which three cost centers exist in both entities?
- Who is the CFO, and who is the Controller?
- Name LTV's preferred MRO supplier and its largest customer.
- What is Elena Marsh's fifth and final requirement, and why does the lesson flag it?
