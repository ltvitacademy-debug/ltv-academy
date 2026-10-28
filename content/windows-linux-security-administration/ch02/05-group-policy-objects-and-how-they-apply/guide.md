# Lesson 5 — Group Policy Objects and How They Apply

**Chapter 2 · Group Policy & Windows Hardening · Lesson 5 of 32**

## What you'll learn

- What a Group Policy Object (GPO) actually is, and the three places it can be linked: a site, a domain, or an OU
- How GPO inheritance cascades down the OU tree, and which GPO wins when two linked GPOs conflict
- The difference between an Enforced GPO and Block Inheritance, and which one actually wins
- How to force a policy refresh with `gpupdate /force` and confirm what really applied with `gpresult`

## A GPO is inert until it's linked to something

A **Group Policy Object (GPO)** is a named collection of configuration settings — password rules, desktop restrictions, firewall behavior, software deployment, dozens of other categories — built on top of the Active Directory structure from Lesson 2. On its own, a GPO does nothing. It only takes effect once you **link** it to a container: a **site**, a **domain**, or an **organizational unit (OU)**. The same GPO can be linked to more than one container at once, and a container can have more than one GPO linked to it.

This separation matters in practice. An admin might build one GPO called "Password Policy — Baseline" and link it at the domain level so it reaches everyone, then build a second GPO, "Finance — Enhanced Password Policy," and link that one only to the Finance OU. Two GPOs, two different scopes, same domain.

## Inheritance: GPOs cascade down the OU tree

GPOs apply in a fixed order, remembered by the mnemonic **LSDOU**: **L**ocal policy on the machine first, then **S**ite-linked GPOs, then **D**omain-linked GPOs, then **O**U-linked GPOs — and if an OU sits inside another OU, the parent OU's GPOs apply before the child OU's. When two linked GPOs set the same setting differently, **the one applied later wins**, which means an OU-linked GPO overrides a domain-linked GPO by default, and a child OU's GPO overrides its parent OU's GPO.

**Concrete example:** the domain-level "Password Policy — Baseline" GPO sets minimum password length to 8 characters. The Finance OU has its own "Finance — Enhanced Password Policy" GPO setting minimum length to 14. Because OU GPOs apply after domain GPOs, every Finance user needs a 14-character password, while everyone else in the domain only needs 8. Nothing was misconfigured — that's inheritance working exactly as designed.

## Enforced vs. Block Inheritance — only one of these wins outright

Two settings let administrators push back against that default cascade, and they aren't equal:

- **Block Inheritance**, set on an OU, tells that OU to ignore GPOs linked above it (site- and domain-level), so only the OU's own linked GPOs apply.
- **Enforced** (the modern name for the older "No Override" setting), set on an individual GPO at a higher level, forces that specific GPO to apply to everything below it — **even an OU that has Block Inheritance turned on.**

Enforced always beats Block Inheritance. **Concrete example:** a domain admin sets the "Password Policy — Baseline" GPO to Enforced because the company's compliance policy requires that exact password rule everywhere, no exceptions. Later, the Finance OU owner turns on Block Inheritance to shield that OU from an unrelated desktop-restriction GPO linked at the domain. The password policy still reaches Finance regardless — Enforced ignores the block entirely, because it's a property of the GPO being pushed down, not something the receiving OU can opt out of.

## Confirming what actually applied

With GPOs stacking from multiple levels, guessing which setting "wins" on a real machine is unreliable — you check it with two tools:

- **`gpupdate /force`**, run on a given machine, immediately re-pulls and reapplies every linked GPO instead of waiting for the normal background refresh (roughly every 90 minutes by default). Useful the moment you've just changed a GPO and don't want to wait.
- **`gpresult /r`** (or `/h` for an HTML report) shows the **Resultant Set of Policy (RSoP)** for a specific user or computer: exactly which GPOs actually applied, and which ones were filtered out and why — security filtering, WMI filtering, or loopback processing can all exclude a GPO that's technically linked but never actually reaches that object.

**Concrete example:** a technician edits the Finance GPO to add a new desktop restriction. A Finance user calls saying nothing changed. The technician runs `gpupdate /force` on that user's machine to push the update immediately, then runs `gpresult /r` to confirm the updated GPO shows up in the applied list — closing the loop instead of assuming it worked.

## Key terms

| Term | Meaning |
|---|---|
| GPO (Group Policy Object) | A named collection of settings that does nothing until linked to a site, domain, or OU |
| GPO inheritance | GPOs apply in LSDOU order (Local, Site, Domain, OU), with later/closer GPOs winning on conflicting settings |
| Block Inheritance | An OU-level setting that stops GPOs linked above it from applying — except Enforced ones |
| Enforced | A GPO-level setting that forces that GPO to apply everywhere below it, overriding Block Inheritance |
| `gpupdate` / `gpresult` | `gpupdate /force` refreshes policy immediately; `gpresult /r` shows which GPOs actually applied (RSoP) |

## Check yourself

The Marketing OU has Block Inheritance turned on. A GPO linked at the domain level, set to Enforced, controls screen-lock timeout. Does that GPO reach users in the Marketing OU? Explain why, in terms of LSDOU and which setting overrides which.
