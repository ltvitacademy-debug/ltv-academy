# Lesson 15 — Data Custodians and Data Consumers

**Chapter 3 · Roles and Structure · Lesson 15 of 30**

## What you'll learn

- What a data custodian is responsible for, and how it differs from stewardship
- Why custodians are almost always IT or platform roles, not business roles
- What a data consumer is, and why consumers still have governance responsibilities
- How all four roles — owner, steward, custodian, consumer — fit together end to end

## The data custodian

A **data custodian** is responsible for the safe custody, transport, and storage of data,
and for implementing the business rules that the owner and steward have defined. Where the
owner decides *what* the rules should be and the steward maintains *what the data means*,
the custodian is responsible for the technical environment: the database structure, access
controls, backups, encryption, and the pipelines that move data from one system to another.

Custodians are almost always IT, data platform, or database administration roles — a DBA
maintaining a production database, a platform engineer configuring access permissions in a
data warehouse, or a data engineer building the pipeline that loads a table every night.
DAMA-DMBOK's core text actually treats "steward" and "custodian" as close synonyms, but in
practice — and in how this course uses the terms — they're different people with different
skills: a steward needs to understand what the data *means*; a custodian needs to understand
how the systems that hold it actually work.

A useful way to keep owner, steward, and custodian straight:

| Role | Answers the question |
|---|---|
| Owner | "Who decides what the rules are?" |
| Steward | "What does this data mean, and is it meeting the quality bar?" |
| Custodian | "Where does this data physically live, and who implements the controls?" |

## The data consumer

A **data consumer** is anyone who uses data to do their job without holding an owner,
steward, or custodian responsibility for it — an analyst building a report, a manager
pulling a dashboard, a sales rep looking up an account. Consumers are the largest group of
people touching data in almost any organization, and it's tempting to think governance
doesn't apply to them at all. It does, in a lighter but real form:

- **Follow access rules** — use data only for what they're authorized to use it for
- **Report problems** — flag data that looks wrong rather than silently working around it
  or, worse, publishing a report built on bad numbers
- **Respect classification** — don't copy a restricted dataset into an unrestricted
  spreadsheet because it's more convenient
- **Provide feedback** — consumers are often the first to notice a definition doesn't match
  how the business actually talks about something, and that feedback is valuable input for
  stewards

Treating consumers purely as passive recipients of "the rules" wastes the best quality
signal most governance programs have: the people closest to actually using the data, every
day, who notice when something is off before any dashboard or audit does.

## The four roles, end to end

Putting Lessons 13–15 together, a single piece of data typically flows through all four
roles: the **owner** decides a customer record must have a verified email before it's
considered "complete"; the **steward** maintains that definition and checks it's being
followed; the **custodian** implements the validation rule and the storage that enforces it;
and the **consumer** — a sales rep — relies on that record being accurate when they reach
out to a customer. One broken link anywhere in that chain, and the sales rep is working from
bad data without ever knowing why.

## Key terms

| Term | Meaning |
|---|---|
| Data custodian | Responsible for the technical storage, security, and movement of data |
| Data consumer | Anyone who uses data without holding an owner/steward/custodian responsibility for it |

## Lab

Using the same domain from Lessons 13 and 14's labs, write one paragraph that traces all four
roles for a single piece of data in that domain: who would be the owner, who would be the
steward, who would be the custodian (name the team, even if no individual is assigned today),
and who are the main consumers. Note any role that has nobody currently filling it.

## Check yourself

Can you explain, in your own words, why DAMA-DMBOK's "steward and custodian are synonyms"
simplification doesn't hold up well in practice — and why consumers aren't fully exempt from
governance responsibility even though they don't hold formal authority?
