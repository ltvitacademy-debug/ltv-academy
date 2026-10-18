# Cascade Security Model Reference

> Pulled from Lesson 4 (Designing the Security Model). Keep this open while you implement it for
> real in Lesson 11, and use it as the ground truth when scoring Category 3 of the acceptance
> rubric.

## Role hierarchy

```
VP of Sales (Monica Reyes)
 |-- Sales Manager, New Business (Derek Oyelaran)
 |    |-- Account Executive, New Business (Tom Baptiste)
 |    |-- SDR (Jordan Kessler)
 |-- Senior Account Executive, Key Accounts (Priya Nair)
 |-- Customer Success Manager (Angela Wu)
 |-- Service & Installation Lead (Marcus Webb)
```

Priya Nair (Key Accounts) reports directly to Monica, not through Derek — deliberately, so the
New Business manager doesn't see large, sensitive Key Accounts deals by default.

## Profiles

| Profile | Who gets it | What it allows |
|---|---|---|
| System Administrator | IT | Full access — standard, unmodified |
| Sales Rep | Tom Baptiste, Jordan Kessler, Priya Nair | Create/edit Leads, Contacts, Opportunities; read Accounts; no delete on closed-won Opportunities |
| Sales Manager | Derek Oyelaran, Monica Reyes | Everything Sales Rep has, plus edit/delete across their team's records and Opportunity reassignment |
| Service Profile | Marcus Webb and installers | Full access to Installation Project; read-only on Account/Opportunity |
| Customer Success Profile | Angela Wu | Full access to Service Contract; read-only on Account/Opportunity; no access to Leads |

## Organization-Wide Defaults

| Object | OWD | Why |
|---|---|---|
| Account / Contact | Private | A rep shouldn't see another rep's customers by default |
| Opportunity | Private | Deal values and terms are sensitive, especially Key Accounts |
| Lead | Private | Unqualified Leads shouldn't be visible org-wide before ownership is settled |
| Installation Project | Private | Only the assigned installer and sales team on that deal need it |
| Service Contract | Private | Renewal and pricing data belongs to Customer Success and the account owner |

## Sharing rules

| Sharing rule | Problem it solves |
|---|---|
| Service & Installation team → read access on Opportunity | Installers need to see the won Opportunity behind an Installation Project; they don't report into the sales role hierarchy |
| Customer Success → read access on Opportunity | Angela Wu needs Opportunity context for renewals; Customer Success sits outside the sales branch |
| Key Accounts → read access on Installation Project for their Accounts | Priya Nair needs visibility into installs tied to her own Key Accounts; installers report through Service, not Sales |

## The pattern worth internalizing

Every sharing rule here closes a gap role hierarchy *specifically* can't — not a general "give
this group more access" grant. Before adding a sharing rule of your own (here or in a real job),
name the exact gap it closes the way this table does. If you can't state the gap in one sentence,
the rule is probably broader than it needs to be.
