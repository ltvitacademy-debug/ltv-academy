# Lesson 2 — Why Asynchronous Apex Exists

**Chapter 1 · Asynchronous Processing · Lesson 2 of 16**

## What you'll learn

- The specific technical restrictions that make synchronous Apex the wrong tool for some jobs
- What a mixed DML error is, and why asynchronous Apex sidesteps it
- Why large-volume record processing needs its own transaction boundaries
- Why keeping the user-facing transaction fast matters even when a limit isn't being hit

## This isn't a style preference — it's forced by real restrictions

New Apex developers sometimes treat "should this be asynchronous?" as a taste question, like choosing between two ways to format a loop. It isn't. Salesforce enforces specific, hard restrictions on synchronous execution that make some operations outright impossible without handing them off asynchronously. Understanding those restrictions is what makes the rest of this course make sense — every asynchronous tool exists because some combination of these problems needed solving.

## Callouts from triggers aren't allowed

A trigger runs synchronously, inside the same transaction as the DML operation that fired it. Salesforce does not allow an HTTP callout from that kind of context — a callout has to happen outside of a pending DML transaction, specifically so the platform never has an open database transaction sitting around waiting on a slow network call to an external system. If a requirement is "when this Opportunity is updated, notify an external system over HTTP," that callout cannot happen directly in the trigger. It has to be handed off — to a future method or a Queueable job — so it runs in its own transaction, free of that restriction.

## Mixed DML errors

Salesforce classifies certain objects as "setup objects" (think `User`, `GroupMember`, and other objects tied to org security and setup) and the rest as regular, non-setup objects. Salesforce doesn't allow a single transaction to perform DML on a setup object and a non-setup object together — attempting it throws a **mixed DML error**. This shows up in ordinary-looking requirements more often than you'd expect: for example, a process that needs to both insert a `GroupMember` row and update an `Account` in the same operation. Moving one of those two DML operations into an asynchronous context — most often a future method — runs it in a separate transaction, which clears the restriction, because the two DML operations are no longer happening in the same transaction.

## Governor limits don't stretch to fit large jobs

Chapter 1's later lessons (and Lesson 11 specifically) cover the exact numbers, but the shape of the problem is simple: a synchronous transaction has a fixed, relatively small budget — a limited number of SOQL queries, a limited number of DML rows, a limited amount of heap memory, a limited amount of CPU time. A request to "update every Contact missing a required field" across an org with two million Contacts cannot be done inside one synchronous transaction's budget, no matter how tightly the code is written. Batch Apex exists specifically to split a job like this into many separate transactions — each with its own fresh governor limits — so no single transaction has to carry the whole job.

## Keeping the user-facing transaction fast

Even when a job technically fits inside synchronous limits, there's a separate reason to push it off the main thread: a user clicking a button, saving a record, or loading a Lightning page is waiting on that transaction to finish. A transaction that takes several extra seconds to also send a confirmation email, log an audit record, or call an external API makes every save feel sluggish — even though none of it is strictly a governor-limit violation. Handing that secondary work off asynchronously lets the user's save complete immediately, while the extra work finishes a moment later, invisibly.

## These four reasons map directly onto the four tools

- A trigger needs a callout → a problem future methods and Queueable Apex both solve (Lessons 3–4).
- A one-time job needs to touch millions of records → Batch Apex's reason for existing (Lesson 5).
- A job needs to run on a recurring cadence, not in response to a user action at all → Scheduled Apex's reason for existing (Lesson 6).

Keep these four reasons in mind as you learn the syntax for each tool — the "why" rarely changes, even as the "how" gets more specific.

## Key terms

| Term | Meaning |
|---|---|
| Mixed DML error | Thrown when a single transaction performs DML on a setup object (like `User`) and a non-setup object together |
| Setup object | An object tied to org security/configuration (e.g. `User`, `GroupMember`) subject to mixed DML restrictions |
| Governor limit | A hard cap the Salesforce platform enforces per transaction to keep any one transaction from consuming unbounded shared resources |

## Lab

A Salesforce admin asks you to build a feature: "When a new Case is created, add the submitting Contact to a public Chatter Group (which requires inserting a `GroupMember` row), and also update the Account's `Last_Case_Date__c` field." Walk through why this, as described, risks a mixed DML error if written as one synchronous block, and describe which piece of the work you'd move asynchronously and why.

## Check yourself

Can you name three distinct, concrete reasons synchronous Apex is the wrong tool for a given job (not "it's slower," but the specific restriction or limit involved)? Can you explain what a mixed DML error is without looking it up?
