# Duty Roles and Privileges

Lesson 3 covered the roles administrators hand out: job, abstract, and data roles. This lesson goes one level deeper, to the building blocks those roles are made of — duty roles and privileges. Understanding this layer is what lets you actually read a role's composition instead of just trusting its name.

## What you'll learn

- What a duty role is and why it represents "a set of related tasks"
- What a privilege is and how it attaches to a duty role
- How duty roles inherit one another to build up a complete job role
- Why grants happen at the duty role level, as a security design guideline

## Duty roles: the real unit of "what can be done"

A **duty role** represents a set of related tasks someone performs as part of their job — something granular, like "Accounts Payable Invoice Processing" or "Journal Entry Creation." Duty roles are the actual carriers of access in the sense that matters for troubleshooting: this is the layer where function security privileges and data security policies actually attach.

The design guideline in Oracle Fusion is that grants should be made to duty roles, and duty roles are then given to job or abstract roles as children — not the other way around. A job role like Accounts Payable Manager doesn't hold privileges directly; it holds a collection of duty roles, and each of those duty roles holds the privileges and data security policies.

## Privileges: the smallest grantable unit

A **privilege** is a single, real-world action on a single business object — "create an invoice," "approve a journal," "void a payment." Privileges are what actually secure the underlying code: the page, the button, the scheduled process. A privilege is granted to a duty role, never directly to a job role and never directly to a user.

So the chain, read from the bottom up, is: **privilege → duty role → job role or abstract role → user** (by provisioning). Each link adds structure, but access always traces back down to a privilege doing one specific thing.

## Duty roles inherit other duty roles

Duty roles aren't flat — a duty role can itself inherit other, more granular duty roles. "Accounts Payable Invoice Processing" might inherit a narrower duty role just for matching invoices to purchase orders. This lets Oracle (and implementers building custom roles) reuse small, well-defined pieces of access across multiple job roles instead of redefining the same privilege set over and over.

A practical consequence for you as a future consultant: when a user at Castellan Robotics Inc. reports they can't perform some specific action, the fix is almost never "add a privilege directly to their user." It's tracing which duty role should carry that privilege, confirming the job role includes that duty role, and confirming the job role is provisioned to the user. You'll practice exactly this kind of tracing in Chapter 4.

## Why this layering exists

This structure exists so Oracle (and implementers) can change what a duty role contains — adding or removing a privilege — and have that change propagate automatically to every job role that inherits it, without hand-editing dozens of job roles individually. It also means two job roles that happen to share a duty role (say, both an AP Manager and an AP Supervisor needing "Accounts Payable Invoice Inquiry") get consistent, maintainable access.

## Key terms

| Term | Meaning |
|---|---|
| Duty role | A set of related tasks; the layer where privileges and data security policies actually attach |
| Privilege | The smallest grantable unit — one real-world action on one business object |
| Role inheritance | A duty role can inherit other duty roles; job/abstract roles inherit duty roles |

## Recap

Grants attach to duty roles, not to job roles and never to users directly. The chain runs privilege → duty role → job or abstract role → user. Tracing that chain is the core skill for diagnosing access problems later in this course. Next up, Lesson 5: function security vs. data security, in full depth.
