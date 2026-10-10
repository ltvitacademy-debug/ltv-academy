# Lesson 6 — Complex Flow

**Chapter 2 · Build: Automation and Code · Lesson 6 of 25**

## What you'll learn

- Why this platform's Case-to-Installation-Job automation belongs in Flow, not Apex, per Lesson 2's governing principle
- The Flow Builder elements that make a Flow "complex" rather than a simple one-path automation
- The exact multi-path logic the "Case to Installation Job" record-triggered Flow needs to implement
- How fault paths keep a complex Flow from failing silently

## Why Flow, and which kind

Flow Builder is Salesforce's current low-code automation tool — since Workflow Rules and Process Builder reached end of support, Flow is the only supported declarative automation tool on the platform, which is one more reason this capstone treats it as the default rather than a legacy option. A **record-triggered Flow** runs automatically when a record is created or updated, which is exactly the trigger condition Solstice needs: when a Service Agent creates a Case of Type "Installation" or "Repair" and links it to an Asset, the platform should schedule the work automatically rather than relying on the agent to remember to create an `Installation_Job__c` by hand.

## What makes this Flow "complex"

A simple Flow has one path: condition met, one action happens. The **Case to Installation Job** Flow needs several Flow Builder elements working together, which is what earns it the "complex" label in this course's Definition of Done:

- **Entry criteria**: fires only when `Case.Type__c` is Installation or Repair *and* `Case.AssetId` is not null — set in the Flow's start configuration so it doesn't run on every Case edit.
- **Decision element**: branches on `Case.Job_Priority__c` (Standard vs. Urgent) to set different default scheduling windows.
- **Get Records element**: looks up whether an active `Service_Contract__c` exists for the Case's Asset, which determines whether the new job's `Job_Type__c` should be "Warranty Repair" versus plain "Repair."
- **Assignment logic via a subflow**: a separate, reusable subflow called **Assign Technician** queries available Technician users and assigns the least-loaded one — built as a subflow specifically so it can be reused later if Solstice adds another entry point that also needs technician assignment.
- **Create Records element**: creates the `Installation_Job__c` record with the fields resolved by the steps above.
- **Fault path**: if the create fails (for example, a required field missing), the fault path creates a Case Comment flagging the failure instead of letting the Case save with no job and no visible error.

## Why this isn't a trigger

Revisit Lesson 2's rule: reach for Apex only when declarative tools genuinely can't do the job. Nothing above requires code — Get Records, Decision, a subflow call, and Create Records are all native Flow Builder elements, and the logic is the kind a future admin (not necessarily a developer) will need to adjust as Solstice's installation process changes. That's the real test: if the logic is likely to change for business reasons rather than technical ones, and an admin should be able to make that change without redeploying code, it belongs in Flow.

## Fault paths aren't optional

Every element in Flow Builder that can fail — most commonly Create Records, Update Records, and Delete Records — can have a **fault path**: a separate branch that runs only if that element throws an error, instead of the whole Flow failing with no record of what happened. Skipping the fault path on the Create Records element here would mean a Service Agent creates a Case, sees it save successfully, and has no idea the Installation Job behind it silently failed to create — exactly the kind of invisible failure this capstone's non-functional requirements (Lesson 2) call out as unacceptable. The fault path's Case Comment gives Dmitri's team a visible signal instead.

## Key terms

| Term | Meaning |
|---|---|
| Record-triggered Flow | A Flow that runs automatically on record create/update, matching entry criteria |
| Decision element | A Flow element that branches logic based on conditions |
| Subflow | A separate, reusable Flow called from within another Flow |
| Fault path | A branch that runs when a Flow element throws an error, instead of failing silently |
| Flow Builder | Salesforce's current declarative automation tool, now the only supported one after Workflow Rules and Process Builder's end of support |

## Lab

In a scratch org (or on paper, labeling every element), build the Case to Installation Job Flow described above: entry criteria, a Decision on priority, a Get Records lookup against `Service_Contract__c`, a subflow call to a stub "Assign Technician" subflow, a Create Records element for `Installation_Job__c`, and a fault path that creates a Case Comment. Test it by creating a Case with Type = Repair and a populated Asset, and confirm an `Installation_Job__c` is created.

## Check yourself

- What two entry criteria does the Case to Installation Job Flow require before it runs at all?
- Why is technician assignment built as a subflow instead of inline within the main Flow?
- What specifically goes wrong for a Service Agent if the Create Records element has no fault path?
