# Suppliers, Sites and Contacts

Chapter 1 kept mentioning "the supplier record" as if it were one thing. It isn't. A supplier in Oracle Fusion is actually a small hierarchy — one supplier, potentially many sites, and potentially many contacts — and almost every confusing supplier question ("why can't this business unit pay them," "why does the remittance go to the wrong address") traces back to not understanding that hierarchy. This lesson builds the model before the next lesson walks through actually creating one.

## What you'll learn

- The three levels of the supplier model: supplier, site, and contact
- Why a supplier site, not the supplier itself, is what gets assigned to a business unit
- What a site assignment actually controls
- What a supplier contact is for, separate from the site's address

## Level 1: the supplier

The **supplier** is the top-level party record — the legal entity Brightfield Office Supply is doing business with. It carries information that's true regardless of where or how Brightfield transacts with them: the supplier's name, tax registration details, and overall status (active, inactive, prospective).

## Level 2: the supplier site

A **supplier site** represents a specific location or business arrangement with that supplier — an address, plus a set of operational controls for how transactions run against it (payment terms, tax details, whether it's a purchasing site, a pay site, or both). A single supplier can have multiple sites: a national distributor might have a site in Ohio and a separate site in Texas, each with its own address and possibly its own remittance details.

Critically, a site only becomes usable once it has an active **site assignment** to a business unit. The assignment is what actually lets a business unit transact with that site — create purchase orders against it, enter invoices against it — and it's also where the **sold-to business unit** is defined, the business unit that carries the liability for what gets purchased. No active assignment means no transactions, even if the site itself looks perfectly complete.

## Level 3: the supplier contact

A **supplier contact** is a person at the supplier organization — someone Brightfield's buyers or AP team might need to reach, or who manages the supplier's own access to Oracle Fusion's Supplier Portal to check invoice and payment status. Contacts are not addresses; they're people, and a supplier can designate administrators among its own contacts to manage who else at their company gets portal access.

## Putting the hierarchy together

Picture Brightfield's fictional supplier **Vantree Industrial Parts**:

- **Supplier**: Vantree Industrial Parts (one legal entity, one supplier record)
- **Sites**: "Columbus Distribution" (an Ohio address, assigned to Brightfield's US business unit) and "Austin Distribution" (a Texas address, also assigned to Brightfield's US business unit)
- **Contacts**: Dana Ruiz (accounts receivable contact at Vantree, handles invoice disputes) and Marcus Yee (sales contact, handles new orders)

An invoice always gets entered against a **site**, not the supplier directly, because the site is what carries the address, payment terms, and tax details that make the invoice complete.

## Recap

A supplier is a hierarchy: one supplier record, one or more sites that each need an active business-unit assignment to transact, and one or more contacts who are people, not addresses. Invoices attach to a site, and a site without an assignment can't be transacted against no matter how complete it otherwise looks. Next up, lesson 7: creating a supplier from scratch.
