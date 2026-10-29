# Lesson 21 — Identity Lifecycle Management: Joiners, Movers, Leavers

**Chapter 6 · Identity Governance · Lesson 21 of 28**

## What you'll learn

- Why every identity in an organization moves through three lifecycle events — joining, moving, and leaving — and why each one is a distinct security moment, not an afterthought
- What "provisioning" actually means when someone joins, and why the access they get on day one tends to stick around forever
- Why role changes ("movers") are the quietest source of access risk in most organizations
- Why de-provisioning a leaver is the highest-stakes JML event, and what a real, common failure looks like

## The JML model: three events, one lifecycle

**Joiners, Movers, Leavers (JML)** is the standard way identity and access management teams think about the lifecycle of a user account. It isn't a product or a framework you buy — it's a model for naming the three moments in an employee's (or contractor's, or vendor's) relationship with an organization where access to systems has to change:

- **Joiner** — a person is hired, onboarded, or newly contracted, and needs access provisioned for the first time
- **Mover** — a person changes role, team, department, or location, and their access needs to change to match
- **Leaver** — a person's employment, contract, or engagement ends, and all their access needs to be removed

Every identity governance program is, at its core, built to make these three events happen correctly, consistently, and on time — across every system the organization runs, not just the ones that are easy to automate.

## Joiners: the access you grant sets a baseline

When someone joins, the real-world goal is to grant exactly the access their role requires — commonly handled through **role-based access control (RBAC)**, where a new hire is assigned a standard access bundle tied to their job title or department (e.g., "AP Clerk" gets the AP module of the ERP, the shared drive for Finance, and nothing else). The risk with joiners isn't usually that they get too little access — IT tends to err generous so the new hire isn't blocked on day one. The real risk is that **whatever gets granted at onboarding becomes the floor, and almost never gets re-examined**. A new hire granted broad "just in case" access during onboarding often keeps that access for the rest of their tenure, because nothing in most organizations' processes forces a second look.

## Movers: access that outlives the reason it was granted

A **mover** event — a promotion, a transfer to a new department, a shift from an individual contributor role to a manager role — is supposed to trigger two things: granting the access the new role needs, and **removing the access the old role no longer needs**. In practice, most organizations are reasonably good at the first half and weak at the second. An employee who moves from the Accounts Payable team to the Accounts Receivable team typically gets AR access added quickly (someone needs them productive), but their old AP access often isn't pulled, because removing access doesn't block anyone's work the way withholding access does — there's no urgency on the removal side. Over several years and a few role changes, this is exactly how employees accumulate a sprawling, undocumented footprint of access nobody can fully explain — sometimes called **access creep**. This is the specific gap that access certification campaigns (Lesson 22) exist to catch.

## Leavers: the highest-stakes event, and the most common real failure

When someone's employment or engagement ends, every credential, account, and access grant tied to them needs to be revoked — ideally on their last working day, and for an involuntary termination, often the same hour HR confirms it. The real, well-documented failure mode here is **delayed de-provisioning**: an employee leaves, but their account in some secondary system — a SaaS tool outside the main HR-to-IT sync, a VPN group, a database login that was granted manually two years ago and never tracked centrally — stays active for weeks or months because no single system has a complete inventory of everywhere that person had access. A disgruntled former employee (or simply an unmonitored dormant account that gets compromised by an attacker) with lingering access is one of the most consistently cited causes of real insider-access incidents, precisely because it's a gap that's easy to create and easy to overlook.

## Example: a leaver event across three systems

Maria resigns from her role as a database administrator. HR processes her termination in the HR system on her last day, which correctly and automatically disables her Active Directory account and email the same day — that part of the pipeline is well-integrated. But Maria also had:

- A standing login directly on a reporting SQL Server instance, created manually by a colleague eighteen months earlier for a one-off project, never tied to her AD account, and never revoked
- Membership in a shared admin group on a legacy file server that predates the company's current onboarding/offboarding tooling

Both of those access grants survive her termination indefinitely, because neither was tracked as "Maria's access" in any system that fires on a leaver event. This is exactly why mature organizations run periodic access certification campaigns (Lesson 22) — not because the joiner/mover/leaver automation is assumed to fail, but because experience shows it reliably misses access that was granted outside the main pipeline.

## Key terms

| Term | Meaning |
|---|---|
| JML (Joiners, Movers, Leavers) | The model naming the three identity lifecycle events that require an access change |
| Provisioning | Granting access to a user, typically on joining or role change |
| De-provisioning | Removing a user's access, typically on a leaver event or role change |
| Access creep | The gradual, undocumented accumulation of access rights a user no longer needs, usually from unremoved access after mover events |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why is the "mover" event, not the "leaver" event, usually the biggest quiet contributor to access creep — even though the "leaver" event gets more security attention?
