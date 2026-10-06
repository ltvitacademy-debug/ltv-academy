# Bank Account Uses and Security

A bank account isn't just a record sitting in Cash Management — other modules need permission to use it, and the business needs confidence that only the right people can see it or touch it. This lesson covers both halves: what an account is allowed to be used for, and the three layers of security that control who can get at it.

## What you'll learn

- The four bank account "uses" that connect an account to other subledgers
- The three layers of bank account security
- The privilege and duty role that control security setup itself
- Why this matters beyond just "keeping things tidy"

## Bank account uses

A bank account only becomes useful to other modules once it is explicitly assigned a **use**. The four uses are:

- **Payables disbursement** — the account can be used to pay suppliers
- **Receivables receipt** — the account can be used to receive customer payments
- **Payroll** — the account can be used to pay employees
- **Cash Management** — the account participates in reconciliation and positioning (every account needs this one)

An account can carry more than one use at once — a single operating account is commonly set up for both disbursement and receipt. Assigning a use is what makes an account selectable, for example, in the Payables "Pay suppliers" setup; without the right use assigned, that account simply won't show up as an option.

## Three layers of bank account security

Security for bank accounts is deliberately layered so that access can be as broad or as narrow as the business needs:

1. **Bank account use security** — controls which uses (disbursement, receipt, payroll) are enabled for the account at all.
2. **Bank account access security** — grants access by business unit or function, so an entire business unit or a specific function (like "Payables Invoicing") can use the account without naming individual people.
3. **User and role security** — the finest-grained layer. If an account's **Secure Bank Account by Users and Roles** flag is set to Yes, then a user must either be individually named, or hold a role that is explicitly named, on that account's Security tab before they can use it — access by business unit or function alone is not enough.

Most implementations leave general operating accounts open at the business-unit/function level, and reserve named user-and-role security for payroll or treasury accounts where leaking access would be a real problem — a fictional example would be Harborview Metals Inc. locking its payroll disbursement account down to two named Treasury users plus the Cash Manager role, while leaving its general AP disbursement account open to the whole Payables Invoicing function.

## Controlling the security setup itself

Modifying the User and Role Security tab on a bank account requires the **Manage Bank Account Security** privilege (`CE_MANAGE_BANK_ACCOUNT_SECURITY_PRIV`). An implementation that wants to restrict *who can even open* that Security tab builds a custom role with that privilege removed. Separately, setting up the banks, branches, and accounts themselves requires the **Cash Management Administration** duty role from Lesson 1.

## Why this matters

Bank account security isn't bureaucratic overhead — a disbursement account with loose access is a direct fraud and error risk, since the people who can see and select an account for payment are the people who can move money out of it. A Fusion consultant configuring Cash Management is, in part, configuring an internal control.

## Key terms

| Term | Meaning |
|---|---|
| Bank account use | Flags enabling an account for Payables, Receivables, Payroll, and/or Cash Management |
| Bank account access security | Grants access by business unit or function |
| User and role security | Named-user/role access, enforced when "Secure by Users and Roles" is Yes |
| Manage Bank Account Security privilege | Required to edit the Security tab itself |

## Recap

An account needs a use assigned before another module can select it, and access is secured in three layers — use, business-unit/function access, and named user-and-role security. The privilege to edit that security is itself locked down. Next up, lesson 4: a review of the full setup checklist before we move into bank statements.
