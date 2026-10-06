# Procurement Setup Review: Business Units and Agents

You configured business units when you learned Enterprise Structures earlier in this path. This lesson is a review, not new configuration — it is a refresher on the specific pieces of that setup that make procurement possible, so that when LTV Manufacturing Corporation's requisition moves through the system in later chapters, you understand why it defaults the way it does.

## What you'll learn

- The difference between a requisitioning BU and a procurement BU
- What a procurement agent is and why one must be assigned
- How business function assignments connect business units to procurement
- How this setup will show up as defaults later in this course

## Business units in procurement

A business unit (BU) is a unit of an enterprise that Oracle Fusion uses to secure transactional data and assign responsibility for business functions. Procurement uses two BU roles that are easy to confuse:

- **Requisitioning BU** — the business unit the *requester* belongs to. Dana Whitfield's requisition is created in LTV Manufacturing's requisitioning BU, which represents the plant that needs the bearings.
- **Procurement BU** — the business unit that actually owns the purchasing function: negotiating with suppliers, issuing purchase orders, and maintaining the supplier relationship. A single procurement BU can provide purchasing services to one or many requisitioning BUs, which is common when a company centralizes buying into a shared services function instead of letting every plant or department negotiate separately.

In many smaller implementations, the requisitioning BU and the procurement BU for a given plant are the same BU. In larger, centralized organizations, a plant can be its own requisitioning BU while a single corporate procurement BU handles all of the actual buying. LTV Manufacturing Corporation, for this course, has a procurement BU that services its plant's requisitioning BU directly — close enough to a single-BU setup that you will not need to track a complicated BU-to-BU relationship through the rest of this course.

## Business function: Procurement

A business unit does not get to issue purchase orders just because it exists — it has to be assigned the **Procurement** business function, one of the standard business functions available in Oracle Fusion (others include Billing and Revenue Management, Payables Invoicing, Receivables, and so on). Assigning the Procurement business function to a BU is what turns it into a procurement BU capable of owning purchase orders and agreements.

## Procurement agents

A **procurement agent** is a person authorized to create and manage purchasing documents — requisitions, purchase orders, purchase agreements — on behalf of a specific procurement BU. Being named a procurement agent is what actually grants Marcus Ibarra the ability to act as a buyer: without that agent assignment tied to LTV's procurement BU, Marcus could have every job role and privilege in the world and still not be allowed to own a purchase order in that BU. Agent assignments typically also carry a **document access level** (such as the ability to view, edit, or approve purchasing documents created by other agents in the same BU), which is part of how procurement managers supervise a team of buyers.

## Why this matters once the transaction starts moving

Starting in Chapter 2, you will watch fields on Dana's requisition and Marcus's purchase order populate automatically — a requisitioning BU, a procurement BU, a default buyer. None of those defaults are magic. They come directly from this setup: the BU each person belongs to, the business function assignments on those BUs, and the procurement agent record that ties Marcus to LTV's procurement BU. When a default looks wrong later in a real implementation, this is the setup a consultant checks first.

## Recap

A requisitioning BU is where a request originates; a procurement BU is the one assigned the Procurement business function and authorized to issue purchase orders, and it can serve one or several requisitioning BUs. A procurement agent is a person explicitly granted the ability to act as a buyer within a specific procurement BU. Next up, lesson 4: laying out the plan for the one transaction this course follows from here forward.
