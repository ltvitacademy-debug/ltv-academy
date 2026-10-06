# Role Design for a Real Company

Chapter 3 has covered financials job roles, the duty roles beneath them, segregation of duties, and reporting. This lesson pulls all of it together into one worked exercise: designing security for a small finance department at Castellan Robotics Inc., end to end.

## What you'll learn

- How to translate a department's org chart into role assignments
- When to use seeded roles as-is vs. build something custom
- How to check a proposed design for segregation-of-duties conflicts before go-live
- A repeatable checklist for this kind of exercise

## The department

Castellan Robotics Inc.'s US Operations finance team has four people:

- **Priya Nair**, Controller — oversees the whole team, approves high-value transactions, reviews period close
- **Marcus Webb**, Senior Accountant — posts journal entries, performs reconciliations, cannot independently approve his own entries
- **Dana Ferreira**, AP Lead — enters and matches supplier invoices, cannot approve payments
- **Tom Aldeen**, AR Lead — applies customer receipts and routine adjustments, cannot write off balances

## Step 1: map people to seeded job roles

Following the Lesson 11 principle of using seeded roles first:

| Person | Job role(s) |
|---|---|
| Priya Nair | General Accounting Manager, Accounts Payable Manager, Accounts Receivable Manager |
| Marcus Webb | General Accountant |
| Dana Ferreira | Accounts Payable Specialist |
| Tom Aldeen | Accounts Receivable Specialist |

No custom roles are needed yet — every requirement above matches what a seeded role already does.

## Step 2: assign data access

Every role above still needs a security context and value (Lesson 8):

| Person | Context | Value |
|---|---|---|
| Priya Nair | Data Access Set + Business Unit | US Operations Data Access Set; US Operations BU |
| Marcus Webb | Data Access Set | US Operations Data Access Set |
| Dana Ferreira | Business Unit | US Operations BU |
| Tom Aldeen | Business Unit | US Operations BU |

## Step 3: check for segregation-of-duties conflicts

Run the design against the Lesson 13 conflict patterns:

- Marcus Webb (General Accountant) can post journals he created — is that a conflict? No: the design brief says he "cannot independently approve his own entries," which means approval of **his** entries is reserved for Priya, even though General Accountant includes basic posting. This is enforced by an **approval workflow rule**, not by removing his posting duty role entirely — a department can layer workflow-level controls on top of role-based access rather than only removing privileges.
- Dana Ferreira (AP Specialist) cannot approve payments — confirmed, since Accounts Payable Specialist's duty roles don't include payment approval; that stays with Priya's Accounts Payable Manager role.
- Tom Aldeen (AR Specialist) cannot write off balances — confirmed, for the same reason covered in Lesson 12.

No unresolved conflicts remain. If one had (say, if Marcus's role had also included payment approval), the fix would be either removing the conflicting duty role or documenting a compensating control per Lesson 13.

## A repeatable checklist

1. List real people and what they're actually responsible for — not job titles alone.
2. Map each person to the closest seeded job role(s); resist customizing until you've confirmed a genuine gap.
3. Assign the data access (security context + value) each role needs.
4. Check the combined design for segregation-of-duties conflicts before anyone is provisioned.
5. Document any accepted conflict and its compensating control.

## Key terms

| Term | Meaning |
|---|---|
| Approval workflow rule | A control layered on top of role-based access, not a replacement for it |
| Role design checklist | People → seeded roles → data access → SoD check → documentation |

## Recap

Good role design starts from real responsibilities, prefers seeded roles, assigns data access deliberately, and is checked for SoD conflicts before go-live — not after. Chapter 3 is complete. Next up, Chapter 4 and Lesson 16: requesting and approving access, covering the human workflow around everything you've designed.
