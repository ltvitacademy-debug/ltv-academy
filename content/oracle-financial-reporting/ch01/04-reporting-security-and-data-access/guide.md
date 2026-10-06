# Reporting Security and Data Access

A dashboard that happily shows a procurement clerk the entire company's payroll journal is not a reporting success — it's a security incident waiting to be discovered. Before you build or even run a report, you need to understand how Oracle Fusion decides who sees what. This lesson closes out the Reporting Overview chapter by covering the two layers of security that apply to every one of the four tools you'll use for the rest of this course.

## What you'll learn

- The difference between function security and data security, applied to reporting
- How duty roles control which reporting tools and subject areas a user can even open
- How data security — ledger access, business unit access — filters the rows a user sees inside a report
- Why OTBI, BI Publisher, and Smart View all respect the same underlying security, not separate rules of their own

## Two layers, not one

Oracle Fusion applies the same role-based security model to reporting that it applies to everything else, and that model has two distinct layers:

1. **Function security** answers "can this user even open this tool or this piece of content at all?" It's governed by job roles and duty roles. A user without a duty role that grants access to OTBI, for instance, simply won't see OTBI content in their Reports and Analytics catalog. A user without access to the Financial Reporting Center won't see that work area in their Navigator menu.
2. **Data security** answers "given that this user can open the tool, which rows of data are they actually allowed to see?" This is enforced independently of function security, through data security policies tied to things like data access sets, ledgers, and business units.

Both layers matter, and they're independent. A user can have function access to OTBI (they can open the tool) but have data security that limits every analysis they run to a single business unit's data. Another user might have broad data access but no duty role granting them access to a reporting tool at all.

## Function security: duty roles control the catalog

The reporting-specific duty roles determine what shows up in a user's Reports and Analytics catalog and Financial Reporting Center:

- Access to specific **OTBI subject areas** is granted through duty roles tied to the underlying product (a Payables-focused role grants the Payables subject area; it does not automatically grant the General Ledger subject area).
- Access to the **Financial Reporting Center** and the ability to open or author reports there requires its own reporting duty roles.
- Access to **BI Publisher** report definitions and the ability to schedule them is likewise controlled by duty roles, separate from the roles that let someone simply run a predefined report someone else built.

In practice, this means a well-designed security setup gives a collections analyst exactly the Receivables subject area and nothing else, while a controller might be granted broad access across General Ledger, Payables, and Receivables subject areas to support close activities.

## Data security: filtering rows, not hiding menus

Even once a user can open OTBI or the Financial Reporting Center, data security determines which rows come back. The most common mechanism in Fusion Financials is the **data access set**, assigned to a user, which determines which ledgers (and, within a ledger, which balancing segment values or other segment values) that user can see transactions and balances for. The same OTBI analysis, run by two different users, can legitimately return two different result sets — not because the analysis is broken, but because each user's data security scoped it differently.

This is also why reporting security questions come up constantly during implementation: if a client reports "the numbers in this report look wrong," one of the first things to check, before assuming the report itself is broken, is whether the user's data access is scoped the way they expect.

## One security model, four tools

A common misconception is that each reporting tool has its own separate security rules. It doesn't work that way. OTBI, BI Publisher, Financial Reporting Studio, and Smart View all sit on top of the same underlying Oracle Fusion security model — the same duty roles and the same data security policies that govern the transactional work areas. This is a deliberate design choice: it means a user's reporting access can't accidentally be broader than their transactional access. If someone can't see Payables invoices in the Payables work area, they can't see them in an OTBI analysis either.

## Recap

Reporting access in Oracle Fusion runs on two independent layers: function security (duty roles, deciding which tools and subject areas you can even open) and data security (data access sets, deciding which rows you see once you're in). All four reporting tools share this same security model rather than inventing their own. This closes out Chapter 1. Next up, Chapter 2 begins with lesson 5: a tour of the Financial Reporting Center itself.
