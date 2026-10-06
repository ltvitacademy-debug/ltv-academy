# Lesson 4 — Designing the Security Model

**Chapter 1 · Design · Lesson 4 of 20**

## What you'll learn

- How to design a role hierarchy for Cascade's actual sales structure
- Which profiles Cascade's org needs, and what each one is for
- The Organization-Wide Defaults (OWD) this data model calls for, object
  by object
- Which sharing rules close the specific gaps the role hierarchy and OWD
  leave open
- Why this design work happens before Lesson 11 implements any of it

## The two questions, applied to Cascade

Salesforce security always answers two independent questions: **what can
a user do**, and **which records can they see**. Chapter 1's job is to
answer both, on paper, for Cascade's actual people and objects from
Lessons 2 and 3 — Lesson 11 builds it for real.

## The role hierarchy

Cascade's role hierarchy mirrors its real reporting structure, built from
the people you met in Lesson 2:

```
VP of Sales (Monica Reyes)
 |-- Sales Manager, New Business (Derek Oyelaran)
 |    |-- Account Executive, New Business (Tom Baptiste)
 |    |-- SDR (Jordan Kessler)
 |-- Senior Account Executive, Key Accounts (Priya Nair)
 |-- Customer Success Manager (Angela Wu)
 |-- Service & Installation Lead (Marcus Webb)
```

Role hierarchy access rolls **up**, not down: Monica Reyes can see every
record her entire team owns; Derek Oyelaran can see what Tom Baptiste and
Jordan Kessler own, but not what Priya Nair owns, since Priya sits in a
separate branch reporting directly to Monica. That last detail is
deliberate — Key Accounts deals are large and sensitive, and Cascade
doesn't want the New Business manager seeing them by default.

## Profiles

A role controls visibility; a profile controls what someone is allowed to
do and which objects/fields they can touch. Cascade needs five:

| Profile | Who gets it | What it allows |
|---|---|---|
| **System Administrator** | IT (you) | Full access — standard Salesforce profile, unmodified |
| **Sales Rep** | Tom Baptiste, Jordan Kessler, Priya Nair | Create/edit Leads, Contacts, Opportunities; read Accounts; no delete on closed-won Opportunities |
| **Sales Manager** | Derek Oyelaran | Everything Sales Rep has, plus edit/delete across their team's records and Opportunity reassignment |
| **Service Profile** | Marcus Webb and his installers | Full access to Installation Project; read-only on Account/Opportunity |
| **Customer Success Profile** | Angela Wu | Full access to Service Contract; read-only on Account/Opportunity; no access to Leads |

Executive visibility (Monica Reyes) comes from the **role hierarchy**, not
a separate profile — she uses the Sales Manager profile but sits at the
top of the role tree, so she inherits visibility without needing broader
object permissions than her own job requires.

## Organization-Wide Defaults

OWD sets the *default* visibility before role hierarchy or sharing rules
add anything back. Cascade's model needs it tight, since Key Accounts
deals are sensitive and installers shouldn't see unrelated sales data:

| Object | OWD | Why |
|---|---|---|
| **Account / Contact** | Private | A rep shouldn't see another rep's customers by default |
| **Opportunity** | Private | Deal values and terms are sensitive, especially Key Accounts |
| **Lead** | Private | Unqualified Leads shouldn't be visible org-wide before ownership is settled |
| **Installation Project** | Private | Only the assigned installer and sales team on that deal need it |
| **Service Contract** | Private | Renewal and pricing data belongs to Customer Success and the account owner |

Private OWD plus the role hierarchy above means a rep sees their own
records and their manager sees everything below them — but it leaves two
real gaps that role hierarchy alone can't close.

## Sharing rules that close the gaps

| Sharing rule | Problem it solves |
|---|---|
| **Service & Installation team → read access on Opportunity** | Marcus Webb's installers need to see the won Opportunity behind an Installation Project, but they don't report into the sales role hierarchy |
| **Customer Success → read access on Opportunity** | Angela Wu needs Opportunity context for renewals, but Customer Success also sits outside the sales branch |
| **Key Accounts → read access on Installation Project for their Accounts** | Priya Nair needs visibility into installs tied to her own Key Accounts, even though installers report through Service, not Sales |

Each rule is a criteria-based or ownership-based sharing rule that grants
exactly the access a branch of the org chart doesn't already get through
role-hierarchy inheritance — nothing broader.

## Why design this before Lesson 11

Role hierarchy, profiles, and sharing rules are hard to unwind once users
are already relying on them. Designing the full picture here — against
the finished data model from Lesson 3 — means Lesson 11 is translation
into Setup, not a series of ad hoc decisions discovered mid-build.

## Key terms

| Term | Meaning |
|---|---|
| Role hierarchy | A tree controlling which records roll up to which managers |
| Profile | What a user is allowed to do and see at the object/field level |
| Organization-Wide Default (OWD) | The baseline record visibility before role hierarchy or sharing rules add anything |
| Sharing rule | A rule that grants additional access beyond OWD and role hierarchy to a specific group |

## Lab

Draw Cascade's role hierarchy tree from the diagram above, then write one
sentence for each of the three sharing rules explaining exactly which gap
it closes and why role hierarchy alone doesn't cover it.

## Check yourself

- Why does Priya Nair report directly to Monica Reyes instead of through
  Derek Oyelaran?
- What OWD setting does every object in this model use, and why?
- Name one sharing rule and the specific access gap it closes.
