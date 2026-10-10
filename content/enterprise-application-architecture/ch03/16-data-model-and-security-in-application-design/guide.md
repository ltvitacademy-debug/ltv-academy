# Lesson 16 — Data Model and Security in Application Design

**Chapter 3 · Application Architecture Practice · Lesson 16 of 25**

## What you'll learn

- How an Application Architect applies data-modeling and sharing knowledge in the context of one application's design (not re-deriving it from scratch)
- The standard-object-vs-custom-object decision, made concrete
- The lookup-vs-master-detail decision, and why it's a security and lifecycle decision, not just a technical one
- Why security has to be designed alongside the data model, not layered on after

## Building on prerequisite knowledge, applied here

This course assumes you already know the deep mechanics of data modeling at scale and sharing/visibility design — that's the Data Architect and Sharing and Visibility Architect prerequisite certifications' territory, not this course's job to re-teach. What this lesson covers is narrower and more specific: how those skills get *applied* in the context of designing one application's data model, as part of the solution design process from Lesson 15.

## Standard object or custom object

Once the domain model (Lesson 3) is settled, mapping an entity onto Salesforce means asking, for each one: does a standard object (Account, Contact, Case, Opportunity, Asset, and others) already represent this entity well enough, or does this entity's shape and behavior diverge enough that a custom object is the better fit? Choosing a custom object when a standard object was actually close enough means giving up standard-object benefits for free — native integrations, built-in automation, reporting that other teams already expect to find on that object. Choosing a standard object and bending it to fit when the entity genuinely doesn't match its intended purpose creates its own debt: fields that mean something different than what the object's name implies, confusing anyone who touches that object later expecting standard behavior. This decision belongs explicitly in the data-model-mapping step of Lesson 15's sequence, made deliberately rather than defaulted either direction.

## Lookup vs. master-detail: a lifecycle decision, not just a technical one

A **lookup relationship** and a **master-detail relationship** aren't just two technical flavors of the same thing — they encode a real lifecycle and ownership decision from the domain model. Master-detail ties a child record's existence, and by default its sharing, to its parent: delete the parent, and the children go with it (subject to the recycle bin); the child generally inherits the parent's sharing rather than having independent sharing of its own. That's the right fit when the domain model's lifecycle genuinely says the child has no independent existence without the parent — a Claim Line Item that only means anything in the context of its parent Claim. Lookup is the right fit when the domain model says the related record has its own independent existence and lifecycle — a Claim that references a Technician, where deleting the Technician record should not delete every Claim they ever handled. Getting this backwards isn't a cosmetic mistake; it can mean cascading deletes nobody intended, or sharing behavior that doesn't match what the business actually needs.

## Security designed alongside, not layered on after

A data model finished without considering who should see which records, and who should be able to create, edit, or delete them, is only half a data model. The practical habit: for every object introduced in a design, explicitly note who needs to see records they didn't create (which points toward org-wide defaults and sharing rules — Sharing and Visibility Architect territory, applied here) and what field-level restrictions apply (which points toward field-level security and, for genuinely sensitive fields, encryption). Treating this as a late add-on, discovered during user acceptance testing when someone notices they can see records they shouldn't, is a far more expensive way to find the same gap that a five-minute question during data-model mapping would have caught.

## Key terms

| Term | Meaning |
|---|---|
| Standard object | A Salesforce-provided object (Account, Contact, Case, Opportunity, Asset, etc.) with built-in behavior, automation hooks, and reporting support |
| Custom object | A business-defined object built when no standard object's shape and behavior fit the domain entity well enough |
| Master-detail relationship | A relationship tying a child record's existence and default sharing to its parent |
| Lookup relationship | A relationship where the related record has independent existence and lifecycle from the record referencing it |

## Lab

For the warranty-claims domain model (Customer, Equipment, Warranty Claim, Service Technician), decide for each entity whether it maps to a standard object or needs a custom object, and justify each choice in one sentence. Then decide whether the relationship between Warranty Claim and Service Technician should be a lookup or master-detail, and explain your answer using the lifecycle reasoning from this lesson — specifically, what should happen to a Claim if the Technician who handled it is later deleted from the org.

## Check yourself

Can you explain why choosing between a standard object and a custom object is a deliberate data-model-mapping decision, not a default either direction? Can you explain, with an original example, why the lookup-vs-master-detail choice is a lifecycle and security decision, not just a technical configuration setting?
