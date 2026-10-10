# Lesson 2 — External Systems

**Chapter 1 · Salesforce in the Enterprise · Lesson 2 of 22**

## What you'll learn

- A working taxonomy of the external system categories a System Architect regularly deals with
- The specific questions to ask about any external system before designing an integration with it
- Why "what kind of system is this" matters more than "what's its brand name"
- How a system's age, API maturity, and ownership shape what's actually possible, not just what's desirable

## A taxonomy, not a vendor list

It's tempting to think about external systems by brand — "we have SAP," "we have Workday," "we have an old AS/400." Brand names matter eventually, but the System Architect's first job is to classify what *kind* of system each one is, because the kind tells you far more about how to integrate with it than the vendor name does. The common categories you'll meet repeatedly are:

- **ERP (Enterprise Resource Planning).** Owns financials, procurement, inventory, and often manufacturing. Usually the system of record for anything involving money leaving or entering the business.
- **HCM/HRIS.** Owns the employee master: who's employed, their role, their reporting line, their compensation band. Salesforce often needs a read-only feed from this system for territory and approval hierarchies, rarely the other way around.
- **Data warehouse / lakehouse.** Consolidates data from many systems for reporting and analytics. Usually a consumer of data from Salesforce and other operational systems, not a source of operational truth.
- **Middleware / integration platform.** Brokers traffic between systems (an ESB, an iPaaS such as MuleSoft, or a custom integration layer). Doesn't own business data itself, but owns the rules for how data moves.
- **Marketing/engagement platforms.** Own campaign execution and engagement history, often need bidirectional sync with Salesforce for personalization and attribution.
- **Legacy and mainframe systems.** Often still the authoritative source for decades of historical transactions, frequently with limited or no modern API surface, and frequently too business-critical to simply retire.

## The questions that actually matter

For any external system, before designing anything, a System Architect needs real answers to:

- **Is this system the system of record for the data in question, or just another consumer of it?** Getting this wrong leads directly to the "two sources of truth" problem covered in Lesson 3.
- **What does its API actually support?** Real-time REST, batch file export only, or nothing newer than an overnight flat-file drop — this alone can eliminate entire categories of integration pattern.
- **Who owns it, and what's their release cadence?** A system owned by a different division with a quarterly change freeze changes what's realistic to propose.
- **What's its actual availability and performance envelope?** An integration is only as reliable as its least available dependency.
- **Is it actually still the plan of record, or is it already scheduled for retirement?** Building deep integration against a system that's being decommissioned next year is wasted architecture effort.

## Age and ownership shape the possible

A newly implemented cloud ERP with a well-documented REST API and a cooperative platform team supports a very different integration design than a 20-year-old on-premises system maintained by a single remaining subject-matter expert who treats every change request with suspicion. Both are real, common situations, and the architecture has to be honest about which one it's dealing with — proposing a real-time, bidirectional, event-driven integration against a system that can only produce a nightly batch export isn't an aspirational design, it's a design that will fail in production.

## Key terms

| Term | Meaning |
|---|---|
| External system | Any system outside Salesforce that the enterprise architecture needs to account for |
| ERP | System typically owning financials, procurement, and inventory as system of record |
| HCM/HRIS | System typically owning the employee master as system of record |
| Middleware/iPaaS | A platform that brokers data movement between systems without owning business data itself |
| Legacy system | An older system, often with limited API surface, that remains business-critical despite its age |

## Lab

Take the list of systems you built in Lesson 1's lab for your chosen company. For each system, classify it into one of this lesson's categories (ERP, HCM/HRIS, data warehouse, middleware, marketing/engagement, or legacy). Then, for the two systems you're least certain about, write down what specific question from this lesson's list you'd need answered before you could design any real integration with it.

## Check yourself

Can you list the six categories of external systems this lesson introduces, and give a one-sentence reason each category typically exists? Can you explain why "what kind of system is this" is a more useful first question than "what's this system's brand name"?
