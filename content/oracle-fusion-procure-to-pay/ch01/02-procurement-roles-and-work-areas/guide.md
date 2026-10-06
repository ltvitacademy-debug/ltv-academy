# Procurement Roles and Work Areas

Every stage of Procure-to-Pay is carried out by someone with a specific job to do, using a work area built for that job. Before you can follow LTV Manufacturing Corporation's bearing purchase through the system, you need to know who these people are and which part of Oracle Fusion Cloud they actually open.

## What you'll learn

- The core job roles involved in a P2P transaction
- The Oracle Fusion work areas each role uses
- How security and function duties limit what each role can do
- Where Dana, Marcus, Priya, and Chen fit into this picture

## The core roles

Oracle Fusion Cloud is built around named job roles, each with a bundle of duty roles and privileges behind it. The roles that matter for this course are:

- **Requester** — any employee who needs goods or services and submits a requisition. Uses the **Self Service Procurement** work area, usually called Purchase Requisitions. Dana Whitfield, the maintenance supervisor, is a requester.
- **Procurement agent / buyer** — processes requisitions into purchase orders, negotiates with suppliers, and manages the supplier relationship. Uses the **Purchase Orders** and **Purchase Agreements** work areas. Marcus Ibarra is the buyer on this transaction.
- **Procurement manager** — oversees buyers, sets policy, and may approve purchase orders above certain thresholds. Often the same work areas as a buyer, with broader access.
- **Receiving / warehouse personnel** — confirm that goods arrived or services were performed. Use the **Receiving** work area. Priya Nandan, the receiving clerk, works here.
- **Accounts payable processor** — enters, matches, and validates supplier invoices. Uses the **Invoices** work area inside Payables. Chen Liu plays this role.
- **Approver** — anyone named in an approval rule, for a requisition or a purchase order. This can be a manager, a finance controller, or a system-defined approval group, and is usually a side responsibility layered onto someone's regular role rather than a dedicated job.

## Work areas versus modules

It helps to separate two ideas that are easy to blur together. A **module** (Purchasing, Payables, Receiving) is how Oracle organizes functionality and security behind the scenes. A **work area** is the landing page a user actually opens — Purchase Requisitions, Purchase Orders, Purchase Agreements, Receiving, Suppliers, Invoices — each scoped to the tasks one role needs. A requester's Self Service Procurement work area hides everything a buyer would need, and a buyer's Purchase Orders work area hides everything an AP processor would need. This is deliberate: it keeps each person focused on their part of the process and limits what they can see or touch to what their role requires.

## Why this separation matters for a consultant

As a consultant, you will be asked to diagnose problems across roles you don't personally hold. If Dana says her requisition "disappeared," you need to know that it is sitting in an approval queue that belongs to someone else, not lost. If Marcus says a purchase order "won't go to the supplier," you need to know whether the problem is a missing supplier communication method, not a purchasing bug. Knowing which work area owns which task is the map you use to figure out where in the chain a transaction actually is.

## Function security and segregation of duties

Job roles are built from duty roles, which grant specific privileges — the ability to create a requisition, approve a purchase order, enter an invoice, and so on. Oracle Fusion also supports segregation of duties (SoD) policies that can prevent, for example, the same person from both creating and approving a purchase order over a certain value, or both entering and approving the same invoice. You will not configure security in this course, but recognizing that these controls exist — and that they are often why a user "can't see" a button — will save you hours of troubleshooting later.

## Recap

Each stage of Procure-to-Pay has an owner: the requester (Dana), the buyer (Marcus), receiving personnel (Priya), and the AP processor (Chen), each working inside a work area scoped tightly to their job. Work areas are the landing pages built on top of modules, and function security and segregation-of-duties policies control who can do what inside them. Next up, lesson 3: a review of the procurement setup — business units and procurement agents — that makes all of this possible.
