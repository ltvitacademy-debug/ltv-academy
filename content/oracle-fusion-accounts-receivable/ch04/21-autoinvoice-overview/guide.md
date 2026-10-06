# AutoInvoice Overview

Lesson 1 mentioned that transactions can arrive manually or through AutoInvoice. Now that you've seen what a complete, well-formed transaction actually looks like, this lesson explains how AutoInvoice builds one automatically from raw imported data.

## What you'll learn

- Why high-volume billing needs an import program instead of manual entry
- The three phases AutoInvoice runs every batch through
- What happens to data that fails validation

## Why AutoInvoice exists

Manual entry doesn't scale. A company shipping thousands of orders a day, or billing project milestones out of a separate project system, cannot have someone keying each one into the Transactions Workbench. AutoInvoice is the program that takes transaction data staged in a set of interface tables — populated by Order Management, Project Billing, or any outside billing feed that can write to them — and turns it into real, validated Receivables transactions using an Imported transaction source (lesson 13).

## The three phases

1. **Validation** – AutoInvoice checks line-level data in the interface tables: is the transaction type valid, does the customer exist and have a usable bill-to site, is there at most one freight line per group, is the amount reasonable. Lines that fail validation stay in the interface tables and do not proceed.
2. **Grouping** – validated lines are grouped into transactions according to the business's configured grouping rule (which attributes must match for lines to land on the same transaction header) and line-ordering rule. This phase also validates header-level data needed for a successful grouping — for instance, confirming all lines destined for one header agree on customer and currency.
3. **Transfer** – grouped, fully validated transactions are created in the real Receivables tables, just like a manually entered transaction would be, complete with distributions derived through AutoAccounting.

## What happens to errors

Records that fail validation at any phase are not silently dropped. They are moved to an interface errors table, where someone can review the specific rejection reason, correct the underlying data (often back in the source system, like Order Management), and resubmit. Nothing invalid becomes a real transaction, and nothing valid is lost — it just waits for correction.

## A worked example

Northwind Fixtures Co.'s Order Management system ships 400 customer orders overnight and stages 400 corresponding lines in the AutoInvoice interface tables, tagged with the "OM AutoInvoice Import" source from lesson 13. The nightly AutoInvoice run validates all 400 lines; 397 pass and get grouped into transactions (one order per invoice, per the grouping rule) and transferred into real Receivables transactions, fully accounted through AutoAccounting with no manual entry. The remaining 3 lines reference a customer site that was end-dated the day before; they land in the interface errors table, and the next morning an AR analyst corrects the site reference and resubmits just those 3.

## Recap

AutoInvoice turns staged, imported data into real Receivables transactions through three phases: validation, grouping, and transfer. Records that fail validation land in an errors table for correction and resubmission rather than being lost or silently created wrong. Next up, lesson 22: completing and printing transactions, closing out Chapter 4.
