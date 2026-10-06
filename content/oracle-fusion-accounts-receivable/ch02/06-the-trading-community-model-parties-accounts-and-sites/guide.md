# The Trading Community Model: Parties, Accounts and Sites

Every invoice, receipt, and credit memo in Receivables is recorded against a customer. But "customer" in Oracle Fusion is not one flat record — it's built on a layered structure called the Trading Community Model (sometimes called Trading Community Architecture, or TCA), shared across Oracle Fusion applications. This lesson unpacks that structure before we create an actual customer in lesson 7.

## What you'll learn

- The four layers of the Trading Community Model: party, party site, account, and account site
- Why a single party can have more than one customer account
- How "bill-to" and "ship-to" fit into this structure

## Why not just one "customer" table?

Oracle Fusion applications — Receivables, Sales, Service, Marketing — all need to know about the same organizations and people, but each application cares about a different kind of relationship with them. The Trading Community Model separates **who someone is** from **the business relationship you have with them**, so that one shared registry of parties can support many different relationships across applications.

## The four layers

- **Party** – an organization or a person that can enter into a business relationship. A party exists independently of any specific deal — "Harborline Retail Group" is a party whether or not it has ever bought anything.
- **Party site** – a physical address associated with a party, independent of any particular business relationship. A party can have several party sites: headquarters, a warehouse, a regional office.
- **Customer account** – created when a party enters into a selling relationship with your business. The account carries business terms: payment terms, credit profile, collector assignment. A single party can have more than one account — for example, separate accounts for two different divisions that are each invoiced and managed independently, even though both trace back to the same underlying party.
- **Account site** – a party site being used in the context of a specific customer account, with one or more **site uses** attached, most commonly **Bill-To** (where invoices and statements go) and **Ship-To** (where goods are delivered). A single account site can carry both uses, or different sites can be designated for each.

## Putting it together

Recording a sales transaction requires, at minimum, a customer account and an account site with a Bill-To use. Receivables won't let you complete an invoice without one. A Ship-To use matters for tax determination and for linking back to fulfillment, but Bill-To is the use Receivables cannot do without.

## A worked example

Harborline Retail Group is a party. It has two party sites: a corporate office in Columbus and a distribution warehouse in Dayton. Because Harborline buys from Northwind Fixtures Co. for two separate store divisions that are tracked separately, Northwind sets up two customer accounts for the same party: "Harborline – East Stores" and "Harborline – West Stores." Each account has its own account site built from the Columbus party site, each flagged with a Bill-To use, so invoices for the East division and the West division post against different accounts and age independently — even though both ultimately belong to the same underlying party, Harborline Retail Group.

## Recap

The Trading Community Model separates identity (party, party site) from business relationship (customer account, account site with a site use). A party can have multiple accounts; an account site needs at least a Bill-To use before Receivables will complete a transaction against it. Next up, lesson 7: creating a customer, step by step.
