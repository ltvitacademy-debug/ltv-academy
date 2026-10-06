# Lesson 13 — Integration Users and Security

**Chapter 3 · Authentication and Security · Lesson 13 of 19**

## What you'll learn

- Why a dedicated integration user, not a personal login, should back any system-to-system integration
- The concept of least privilege applied to an integration user's roles and access
- Concrete failure modes of using a personal employee login for an integration
- Who should own an integration user's credentials and lifecycle

## A dedicated identity, not a personal login

An **integration user** is a service account created specifically for
a system-to-system integration — never a specific employee's own
login. This matters for reasons that show up the moment something
changes:

- **Survives staff turnover** — the integration keeps working after
  the employee whose "personal" login was being used leaves the
  company or changes roles.
- **Clearly identifiable** — named in a way that makes its purpose
  obvious during a security review (for example,
  `integration.ap.bankfeed`), rather than looking like a human
  account.
- **Centrally owned** — password rotation, access review, and
  deactivation are owned by IT/security as a process, not dependent on
  one individual remembering.

## Least privilege, applied

A well-configured integration user is scoped as narrowly as the
integration actually requires:

- **Specific job/duty roles** — only the roles tied to the data the
  integration touches, not broad administrative access.
- **Specific business units** — access limited to the business units
  the integration is actually built for.
- **Read-only where possible** — if an integration only ever reads
  data (an outbound extract, for example), it should never have write
  access at all.

## What goes wrong without this

| Using a personal login as a service credential | A dedicated integration user |
|---|---|
| Breaks when the employee leaves or is reset | Independent of any one employee |
| Hard to track in a security audit | Clearly named and scoped |
| Often over-privileged (whatever that person could do) | Scoped to exactly what the integration needs |

Setting up integration users correctly is foundational work a
Financials consultant is expected to get right before any integration
goes live — it's a recurring finding in security reviews when it's
skipped.
## Key terms

| Term | Meaning |
|---|---|
| Integration user | A dedicated service account for a system-to-system integration, not a personal login |
| Least privilege | Granting only the specific access a role or integration actually needs |
| Duty role | A granular role tied to specific actions/data, assigned to a job role or user |
| Access review | A periodic check that an account's granted access still matches its actual need |

## Check yourself

A company's nightly AR extract integration has been running under the AR manager's own personal login for two years. List three concrete risks this creates, and what you'd replace it with.
