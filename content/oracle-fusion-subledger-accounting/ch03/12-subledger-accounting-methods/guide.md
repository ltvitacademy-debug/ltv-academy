# Subledger Accounting Methods

You met the Subledger Accounting Method briefly back in lesson 3, before you knew what an AAD was. Now that you understand AADs fully, this lesson revisits the accounting method with the full picture: it is the object that collects one AAD per subledger application into the single configuration a ledger will actually use.

## What you'll learn

- How an accounting method relates to AADs, concretely
- Why a method references one AAD per application, not one AAD for everything
- What happens when a subledger application has no AAD assigned in a method
- How to think about a method as the "final assembly" step

## The accounting method as final assembly

A **Subledger Accounting Method** is a named object that, for every subledger application a company uses, specifies exactly one AAD to use. Picture a method named "Acme Standard Accounting Method." Inside it, you'd see something like: Payables → "Acme Corp Payables Accounting" (your customized copy from lesson 11), Receivables → "Standard Receivables Accounting" (the seeded version, unmodified, because Receivables needed no changes), Fixed Assets → "Acme Corp Fixed Assets Accounting," and so on for every SLA-enabled application in use.

This is the final assembly step: individual rules became rule sets, rule sets became AADs, and now AADs for every application get assembled into one method. A method is the single object a ledger is actually assigned (which you'll cover in the next lesson), and from that one assignment, every subledger application's accounting behavior for that ledger is fully determined.

## Mixing seeded and custom AADs freely

An important, practical point: a single accounting method is not required to use all-seeded or all-custom AADs. It is completely normal, and common, for a method to reference a seeded AAD for one application that needed no changes, and a custom AAD for another application that did. Each subledger application's AAD assignment inside the method is independent of every other application's assignment.

## What happens if an application has no AAD assigned

If a company uses a subledger application — say, Cash Management — but the accounting method has no AAD mapped to it, accounting events raised by that application for that ledger cannot be processed; Create Accounting (which you'll study in Chapter 4) has nowhere to look up rules. This is a common root cause of "why didn't this transaction create a journal entry" troubleshooting, which you'll cover directly in Chapter 5's troubleshooting lesson: always check whether the subledger application in question actually has an AAD assigned inside the active accounting method.

## Recap

A Subledger Accounting Method is the final assembly object that maps each subledger application a company uses to exactly one AAD — seeded or customized, independently per application. This completes the configuration chain from individual rule to method. Next up, lesson 13: assigning methods to ledgers, where you'll see exactly how this method gets connected to a specific primary or secondary ledger.
