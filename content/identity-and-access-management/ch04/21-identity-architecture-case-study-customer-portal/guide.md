# Lesson 21 — Identity Architecture Case Study: Customer Portal

**Chapter 4 · Review and Practice · Lesson 21 of 24**

## What you'll learn

- How to design identity for an external, self-registering population using Lessons 15–16
- A worked example balancing low-friction signup against fraud/account-takeover risk
- How mixed populations (direct customers and reseller partners) change the design
- Why this case study's correct answer differs sharply from Lesson 20's workforce case

## The scenario

A consumer electronics company wants an Experience Cloud customer portal where buyers can register warranty claims, track orders, and chat with support. They also have a network of independent repair-shop partners who need to look up warranty status and file claims on a customer's behalf. Marketing wants signup friction minimized; support wants confidence that a portal user really is who they claim to be before showing order history.

## Walking the architecture, lesson by lesson

**Population split (Lesson 15):** This is explicitly two populations needing different treatment: direct consumers (CIAM, low friction, high volume, unbounded growth) and repair-shop partners (bounded, role-based, needing persistent access to claims data across multiple customers).

**Consumer identity (Lessons 6, 15, 16):** Recommend self-registration with social sign-on (Google/Apple/Facebook Auth. Providers) as the primary path, reducing password fatigue and offloading credential security to providers that specialize in it. Each registered consumer's Contact must link to an Account representing them as an individual customer (or a household account, depending on data model), since that Contact/Account link is what scopes their visibility to only their own orders and claims (Lesson 16).

**Balancing friction against identity confidence:** Marketing's "minimize friction" goal and support's "confirm who they are" goal are in direct tension. The resolution is **progressive profiling** (Lesson 15): let the customer register and log in with minimal friction (email or social sign-on only), but require a stronger identity check — verifying an order number or product serial number — only at the specific moment they try to view sensitive order history or file a claim, not at initial signup.

**Partner identity (Lesson 15):** Repair-shop partners need a separate site or separate Experience Cloud configuration, admin-approved rather than self-registering (these are business relationships, not anonymous signups), with **delegated administration** so each repair shop's designated manager can add/remove their own technicians without the host company's Salesforce admins handling every individual partner user.

**Sharing design (Lesson 16):** A repair-shop technician's visibility needs to span *multiple* customer Accounts (whichever customers that shop services), which is structurally different from a consumer's visibility (scoped to just their own Account) — this has to be modeled explicitly in sharing rules, not left as an afterthought once the login mechanism is built.

## Why this case study's answer differs from the workforce case

Lesson 20's workforce case had one population, one authoritative identity source, and the right default was "use the existing enterprise IdP, Salesforce as SP." This case study has **two populations with opposite design priorities** sharing the same Salesforce org, and the correct architecture explicitly treats them differently rather than forcing one identity pattern to fit both. Recognizing when a stated requirement is actually two different requirements wearing one description ("a portal") is one of the most valuable architecture skills this course aims to build.

## Key terms

| Term | Meaning |
|---|---|
| Mixed population | A site serving two or more groups needing meaningfully different identity treatment |
| Identity confidence | How certain the system is that a user really is who they claim to be, which can vary by action, not just at login |

## Lab

Write a one-page (300–400 word) design memo for this scenario covering: the two populations and why they need different onboarding, the progressive-profiling moment where identity confidence should be checked more strictly, and the sharing-model difference between a consumer's visibility and a repair-shop technician's visibility.

## Check yourself

- Why are the direct consumers and the repair-shop partners treated as two separate identity designs rather than one?
- What design pattern resolves the tension between "minimize signup friction" and "confirm identity before showing sensitive data"?
- How does a repair-shop technician's required data visibility differ structurally from a consumer's, and what does that imply for sharing rules?
