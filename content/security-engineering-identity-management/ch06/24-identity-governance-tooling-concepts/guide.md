# Lesson 24 — Identity Governance Tooling Concepts

**Chapter 6 · Identity Governance · Lesson 24 of 28**

## What you'll learn

- What Identity Governance and Administration (IGA) is as a product category, and what problem it exists to solve at scale
- What IGA platforms actually automate — JML workflows, certification campaigns, and SoD enforcement — versus what a spreadsheet-based process can realistically do
- Real examples of IGA platforms (SailPoint, Saviynt) and what they're built around
- Why "doing this in spreadsheets" breaks down specifically at scale, not in principle

## IGA: a product category, not a single tool

**Identity Governance and Administration (IGA)** is the category of software platforms built to automate the three things this chapter has covered so far: the joiner/mover/leaver lifecycle (Lesson 21), access certification campaigns (Lesson 22), and separation-of-duties / toxic-combination enforcement (Lesson 23) — across every system in an organization, at a scale no manual process can sustain. IGA is a distinct category from plain identity *and access management* (IAM, which handles authentication — logging someone in) and from privileged access management (PAM, which handles elevated admin credentials specifically). IGA sits on top of those, focused on the *governance* question: not "can this person log in," but "should this person have the access they currently have, and who's accountable for that decision."

## What these platforms connect to, and what that buys you

An IGA platform's core value comes from **connectors** — pre-built integrations into HR systems (to know who's a joiner, mover, or leaver automatically), directory services like Active Directory, and target applications (ERPs, cloud platforms, custom line-of-business apps) to both read their current access and push access changes back into them. With that connectivity in place, the platform can build a single, continuously updated picture of **who has access to what, everywhere** — the exact inventory problem that made Maria's SQL Server login invisible in Lesson 21's example, and that made David's leftover AP access hard to spot by eye in Lesson 22's example.

## What gets automated vs. what a spreadsheet can do

A small organization with a handful of systems can run a version of JML, certification, and SoD checks manually — an IT admin updates access when HR sends a termination email, a manager fills out a spreadsheet of her team's access once a quarter, someone manually cross-references two systems' permission lists looking for toxic combinations. This works, in a limited way, at small scale. It breaks down specifically as the number of systems, users, and roles grows, because:

- **JML automation**: an IGA platform fires provisioning/de-provisioning automatically from an HR system-of-record event, across every connected system simultaneously — a spreadsheet process relies on a human remembering to update every system individually, which is exactly how Maria's SQL Server login got missed
- **Certification campaigns**: an IGA platform generates the review list automatically, routes it to the right manager or owner, tracks who has and hasn't completed their review, and auto-revokes unattested access on the deadline — a spreadsheet-based campaign requires someone to manually compile access lists from every system, email them out, and chase people down to finish
- **SoD enforcement**: an IGA platform checks a person's *entire* access footprint across every connected system against a maintained catalog of toxic combinations automatically, continuously — a spreadsheet-based check requires someone to manually cross-reference permission lists across systems, which realistically only catches the most obvious combinations, and only when someone remembers to look

None of this means an IGA platform replaces human judgment — a manager still makes the actual keep/revoke decision in a certification campaign, and a resource owner still decides whether a flagged SoD conflict is a real risk or an approved exception. What the platform automates is the *mechanics* of surfacing the right information to the right person, on a schedule, at a scale a spreadsheet simply cannot sustain once an organization has dozens of systems and thousands of access grants.

## Real platforms in this category

**SailPoint** (notably its IdentityIQ and cloud-based IdentityNow products) and **Saviynt** are two real, widely deployed vendors in the IGA space — both offer the connector libraries, JML automation, certification campaign workflows, and SoD policy engines described above, and both are commonly cited alongside each other as leaders in this product category. They aren't the only vendors in the space, but they're a useful, real anchor for what "an IGA platform" concretely looks like: a system that connects to HR and dozens of target applications, maintains a live access inventory, runs scheduled certification campaigns, and continuously checks for toxic combinations — the same three concepts this chapter has built up lesson by lesson, running automatically instead of by hand.

## Key terms

| Term | Meaning |
|---|---|
| IGA (Identity Governance and Administration) | The product category automating JML, access certification, and SoD enforcement at scale |
| Connector | A pre-built integration an IGA platform uses to read/write access in a target system (HR, AD, an ERP, etc.) |
| SailPoint, Saviynt | Two real, widely deployed IGA platform vendors |
| Access inventory | A single, continuously updated picture of who has access to what, across every connected system |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: what specifically breaks down in a spreadsheet-based JML/certification/SoD process as an organization scales — and what an IGA platform's connectors do to prevent that breakdown?
