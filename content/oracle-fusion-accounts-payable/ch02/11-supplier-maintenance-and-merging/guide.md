# Supplier Maintenance and Merging

A supplier record isn't something you create once and forget. Addresses change, sites get retired, business classifications expire and get renewed, and — the part that causes the most damage if handled carelessly — the same real-world company sometimes ends up with two separate supplier records in Fusion. This closing lesson of Chapter 2 covers ordinary maintenance, then the heavier operation of merging duplicates.

## What you'll learn

- The routine maintenance tasks that keep a supplier record accurate over time
- Why inactivating is usually safer than deleting
- What a supplier merge actually does, and why it's treated as irreversible
- What to check before requesting a merge

## Ordinary maintenance

Most supplier maintenance is simply keeping the record current: adding a new address when a supplier opens another location, updating a business classification before its certificate expires, adding a new contact when a supplier's AP liaison changes, or updating payment terms if a renegotiated contract changes them. None of this is dramatic — it's the same Create/Edit screens from earlier lessons, used after the fact rather than at onboarding.

**Inactivating** a supplier, site, or bank account — rather than deleting it — is the standard way to retire something no longer in use. Transaction history (past invoices, past payments) stays intact and reportable, but the inactivated record can no longer be used on new transactions. Deleting isn't generally available or desirable once a record has transaction history behind it; inactivating preserves the audit trail while still stopping new activity.

## When duplicates happen

Despite registration and qualification controls, duplicate suppliers still happen in practice — the same real company gets entered twice under slightly different names, a supplier that was acquired by another company needs to be consolidated into the acquirer's record, or a one-off manual entry duplicates a supplier that already existed from self-registration. Left alone, duplicates split a supplier's purchase and payment history across two records, which quietly breaks spend reporting and makes it harder to apply the right payment terms or classifications consistently.

## What a supplier merge actually does

A **supplier merge** consolidates one supplier (or one supplier site) into another, moving transaction references so that purchase orders and invoices that pointed at the old record now point at the surviving one. You have some control over scope: you can merge at the full supplier level, merge specific sites from one supplier into sites on another, or restrict the merge to just unpaid invoices rather than the full transaction history.

Merging is explicitly treated as **irreversible** — once it completes, you cannot split the records back apart. Fusion also protects against one specific failure mode: it will not transfer an invoice if doing so would create a duplicate invoice (same invoice number, same supplier) on the surviving record, since that would corrupt the receiving supplier's invoice history.

## What to check before merging

Because the merge can't be undone, the practical discipline is to review both supplier records — their open invoices, unpaid balances, and site assignments — before submitting the merge request, rather than treating it as a quick cleanup click. A rushed merge that silently fails to transfer a handful of invoices (because of that duplicate-invoice-number protection) can leave a trail of unpaid items sitting invisibly on the record everyone assumed was retired.

## Recap

Ordinary supplier maintenance — updating addresses, classifications, contacts, terms — is just the earlier lessons' screens used after onboarding, and inactivating is the standard way to retire something without destroying history. A supplier merge consolidates duplicate records, can be scoped to specific sites or just unpaid invoices, and is irreversible once submitted, which is why reviewing both records first matters. That closes Chapter 2. Next up, Chapter 3: Invoices, starting with the different invoice types Payables supports.
