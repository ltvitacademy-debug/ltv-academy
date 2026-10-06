# Security Reports and Audits

Lesson 13 introduced segregation of duties conflicts and compensating controls. This lesson covers the reporting tools that make any of that reviewable — both "what access does this person actually have" and "what did this person actually do."

## What you'll learn

- The User and Role Access Audit Report and what it shows
- The process that feeds it with data
- Audit trail (transaction-level logging) as a separate, complementary tool
- Why a consultant should expect to run these reports regularly, not just at go-live

## The User and Role Access Audit Report

The **User and Role Access Audit Report** is the primary tool for answering "what access does this user (or role) actually have?" It reports both function security privileges and, optionally, data security policies, for one user, a range of users, or a specific role — essentially the same information visible for one user at a time in the Security Console, but in a structured, exportable report that can cover many users at once. It's run as a scheduled process: **Schedule New Process → User and Role Access Audit Report**, with parameters for population (single user, multiple users, or a specific role) and whether to include data security policies.

Before this report can return anything meaningful, the underlying security data has to be loaded into a set of reporting tables by running the **Import User and Role Application Security Data** process — a step worth remembering, because a stale or never-run import is a common reason this report comes back looking wrong or empty.

## Audit trail: a different question entirely

Where the access audit report answers "what *could* this person do," **Audit Trail** (configured through **Manage Audit Policies**) answers "what did this person actually *do*" — it logs create, update, and delete activity on specific business objects an administrator has enabled for auditing, including the before-and-after values of changed fields and who made the change. The two tools are complementary, not interchangeable: access reporting is a preventive/detective control on *potential* access; audit trail is a detective control on *actual* activity. A thorough review of a suspicious transaction typically uses both — confirming the person had access to do it, and confirming exactly what they changed.

## Why a consultant runs these regularly, not just once

At Castellan Robotics Inc., the implementation team ran the User and Role Access Audit Report once, right before go-live, to confirm nobody had picked up unintended access during testing. That's necessary, but not sufficient — reviewing it on a recurring schedule (often quarterly, aligned with a broader access certification process) is what actually catches drift: a role mapping that quietly over-provisions after a reorganization, or an employee who changed departments six months ago and never had their old access removed. Security reporting is an ongoing control, not a one-time go-live checklist item.

## Key terms

| Term | Meaning |
|---|---|
| User and Role Access Audit Report | Scheduled process reporting function/data security access for users or roles |
| Import User and Role Application Security Data | The process that must run first to populate the report's underlying data |
| Audit Trail | Transaction-level logging of create/update/delete activity on enabled business objects |

## Recap

The User and Role Access Audit Report shows what access a person has; Audit Trail shows what they actually did. Both depend on setup (an import process, and enabled audit policies, respectively) and both are most valuable run on a recurring schedule, not just at go-live. Next up, Lesson 15: role design for a real company, bringing everything in Chapter 3 together into one worked design exercise.
