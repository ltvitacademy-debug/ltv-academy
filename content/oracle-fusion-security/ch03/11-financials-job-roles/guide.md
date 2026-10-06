# Financials Job Roles

Chapters 1 and 2 built the general vocabulary: roles, privileges, data security, provisioning. Chapter 3 applies all of it specifically to Financials. This lesson surveys the predefined job roles you'll actually encounter in General Ledger, Payables, and Receivables, and how they relate to each other within a module.

## What you'll learn

- The predefined job role hierarchy within General Ledger
- The predefined job role hierarchy within Payables
- The predefined job role hierarchy within Receivables
- Why most implementations use these seeded roles with only light customization

## General Ledger job roles

Oracle Fusion predefines several job roles for General Ledger, most commonly:

- **General Accounting Manager** — oversees the general accounting function, including period close and reporting
- **General Accountant** — performs day-to-day general ledger tasks: journal entry, reconciliation, inquiry
- **Financial Analyst** — focused on reporting and analysis rather than transaction entry

## Payables job roles

Payables has a clearer supervisory hierarchy than GL, reflecting the invoice-processing workflow:

- **Accounts Payable Manager** — manages the AP department and personnel, sets policy
- **Accounts Payable Supervisor** — oversees the work of AP Specialists
- **Accounts Payable Invoice Supervisor** — focused specifically on invoice creation and processing oversight
- **Accounts Payable Specialist** — enters invoices, ensuring accuracy, uniqueness, and completeness; the role you first saw referenced in Lesson 1

## Receivables job roles

Receivables mirrors a similar manager/specialist structure:

- **Accounts Receivable Manager** — manages AR activities end to end: policy, process, issue resolution, monitoring, and reporting
- **Accounts Receivable Specialist** — manages and implements day-to-day customer payment activities: receipts, adjustments, collections support

## How these map to duty roles underneath

Every one of these job roles, consistent with Lesson 4, is really a bundle of duty roles. An Accounts Payable Manager inherits duty roles an Accounts Payable Specialist does not — such as those covering approval-limit configuration or AP policy setup — while still inheriting the base invoice-entry duty roles a Specialist also has, because managing the department includes being able to do what the department does. This is why, in practice, a manager role is rarely "completely different" from the specialist role beneath it; it's usually that specialist role's duty roles plus more.

## Why implementations use these mostly as-is

Oracle ships these job roles pre-built specifically so most companies don't need to design access from scratch. At Castellan Robotics Inc., the implementation team's job role decisions for Payables were almost entirely "use the seeded Accounts Payable Specialist and Accounts Payable Supervisor roles as delivered," with the real configuration work going into *which business units* each person's role assignment covered (Lesson 7) — not into redesigning what the roles themselves could do. Custom role design is reserved for genuine gaps, which you'll see a worked example of in Lesson 15.

## Key terms

| Term | Meaning |
|---|---|
| General Accounting Manager | GL job role overseeing accounting function and close |
| Accounts Payable Manager/Supervisor/Specialist | The AP supervisory hierarchy |
| Accounts Receivable Manager/Specialist | The AR manager/specialist structure |

## Recap

GL, AP, and AR each have a predefined job role hierarchy, generally a manager role layered over a specialist role's duty roles, and most implementations adopt them with little change — configuring data access rather than redesigning function access. Next up, Lesson 12: a closer look at what General Ledger, Payables, and Receivables security specifically controls.
