# Modules and Integration: Finance, Procurement, Supply Chain, HR

**Chapter 1 · ERP Fundamentals · Lesson 3 of 20**

Lesson 2 walked two processes across several modules. This lesson slows down and looks at the modules themselves — what each one actually covers, and the specific pieces of data they share with each other.

## What you'll learn

- What falls inside Financials, Procurement, Supply Chain, and HR
- The master data that ties every module together
- Concrete examples of module-to-module integration
- Why consultants rarely specialize in just one module for long

## The four core module families

- **Financials.** The accounting core: General Ledger, Accounts Payable, Accounts Receivable, Cash Management, Fixed Assets, Expenses, and Subledger Accounting. Every other module eventually hands Financials a transaction to record.
- **Procurement.** Everything about buying: requisitions, purchase orders, supplier qualification and management, contracts, and sourcing/negotiation.
- **Supply Chain Management (SCM).** Everything about moving and making goods: Inventory, Order Management, Manufacturing, and Planning.
- **Human Capital Management (HCM).** Everything about people: Core HR records, compensation, benefits, payroll, and talent management.

This course focuses on the Oracle Fusion Financials Consultant path, so Financials is where most of this program lives — but a consultant who only understands Financials in isolation, with no sense of where its numbers come from, will struggle the moment something looks wrong.

## Master data: the glue between modules

Modules integrate smoothly because they share **master data** — the core reference records that don't change transaction to transaction. The same **supplier** record used in Procurement is the one Accounts Payable pays. The same **customer** record used in Order Management is the one Accounts Receivable bills. The same **employee** record in HCM is the one that approves a requisition or submits an expense report. Without shared master data, every module would need its own copy of "who is this supplier," and those copies would drift out of sync — exactly the spreadsheet problem from Lesson 1, just moved inside the ERP.

## Integration in practice: three examples

1. **Procurement → Financials.** A purchase order is created in Procurement. When the invoice is matched and approved, Payables (Financials) picks it up and eventually posts an accounting entry — no one retypes the PO details into the invoice.
2. **Supply Chain → Financials.** When inventory is shipped to a customer (Supply Chain's Order Management), the cost of that inventory reduction flows automatically into the Cost of Goods Sold accounting entry in the General Ledger.
3. **HCM → Financials.** An employee submits an expense report. Their employee record (HCM) determines their manager for approval routing, and once approved, the reimbursement becomes a Financials transaction through Expenses and eventually Payables.

## Why this matters for a Financials consultant

A support ticket rarely says "the General Ledger is broken." It says "this invoice won't post" or "this expense report is stuck." Tracing that back often means understanding that the invoice depends on a receipt from Supply Chain, or that the expense report is stuck on an approval because HCM has the wrong manager on the employee's record. Financials consultants who understand the surrounding modules — at least at a conceptual level — solve real problems faster than ones who only know Financials screens.

## Key terms

| Term | Meaning |
|---|---|
| Financials | The accounting core: GL, AP, AR, Cash, Fixed Assets, Expenses |
| Procurement | Requisitions, purchase orders, suppliers, contracts |
| Supply Chain Management (SCM) | Inventory, Order Management, Manufacturing, Planning |
| HCM | Core HR, compensation, benefits, payroll, talent |
| Master data | Shared reference records (supplier, customer, employee) used across modules |

## Check yourself

You're ready for Lesson 4 when you can name which module family a purchase order, a shipment, an expense report, and a payroll run each belong to — and explain why a supplier record is shared rather than duplicated.
