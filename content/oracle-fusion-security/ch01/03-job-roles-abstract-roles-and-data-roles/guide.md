# Job Roles, Abstract Roles and Data Roles

Lesson 1 told you that Oracle Fusion uses four kinds of roles. This lesson covers three of them — job roles, abstract roles, and data roles — the roles that typically get provisioned directly to a user. Lesson 4 covers the fourth, duty roles, which sit one level below these and are rarely provisioned directly.

## What you'll learn

- What a job role represents and how it maps to a real job title
- What an abstract role represents and how it differs from a job role
- What a data role adds on top of a job role
- Why these three are the roles an administrator usually provisions

## Job roles

A **job role** represents a specific job function within the business — something tied to a real job title or responsibility, such as **Accounts Payable Manager**, **General Ledger Accountant**, or **Cash Manager**. A job role is built by combining duty roles (Lesson 4) that together cover everything a person in that job needs to do. Job roles are typically predefined ("seeded") by Oracle, and most implementations use the seeded ones with little or no modification.

At Castellan Robotics Inc., a payables clerk is provisioned the seeded **Accounts Payable Specialist** job role, which gives her the duty roles needed to enter and manage invoices — without anyone having to hand-build that access from scratch.

## Abstract roles

An **abstract role** represents something that is true of a person regardless of their specific job — not a job function, but a general classification. The most common example is **Employee**: every employee, no matter their job title, typically gets the Employee abstract role, which grants access to things every employee needs, like entering their own expense reports or viewing their own payslip. Other common abstract roles include **Line Manager** and **Contingent Worker**.

The key distinction: a job role answers "what is this person's job," while an abstract role answers "what kind of person is this, independent of their job."

## Data roles

A **data role** takes a job role and adds a specific slice of data to it. Where a job role says "this person can manage payables," a data role can narrow that to "this person can manage payables, specifically for the US Business Unit." A data role inherits all the function security of the job role it's built from, and layers data security on top of it, scoping that access to a business unit, a ledger, a legal entity, or another dimension.

Data roles are more central to HCM security (where they're commonly auto-generated per department or business unit) than to Financials, where data access is more often controlled through data access sets and direct business-unit assignment — both covered in Chapter 2. Still, the concept matters everywhere: a role can carry both "what you can do" and "where you can do it."

## Why these three get provisioned, not duty roles

Job roles, abstract roles, and data roles are the roles an administrator actually hands out to users through provisioning (Lesson 9). Duty roles, by contrast, live underneath job and abstract roles as building blocks and are almost never provisioned on their own — that relationship is the subject of Lesson 4.

## Key terms

| Term | Meaning |
|---|---|
| Job role | Represents a specific job function, e.g. Accounts Payable Manager |
| Abstract role | Represents a general classification independent of job, e.g. Employee |
| Data role | A job role plus a specific data scope, e.g. "Payables, US Business Unit only" |

## Recap

Job roles map to real jobs, abstract roles describe what kind of person someone is regardless of job, and data roles add a data scope on top of a job role. All three get provisioned directly to users. Next up, Lesson 4: duty roles and privileges — the building blocks underneath every job and abstract role.
