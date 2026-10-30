# Lesson 1 — The Business Ask: One App, One Deadline

**Chapter 1 · Beginner Capstone: Migrating the First Workload to Azure · Lesson 1 of 10**

## What you'll learn

- Why "migrate it to Azure" is never one task until you ask what "it" actually means
- The three things every migration ask needs before you touch the Azure Portal or CLI: the
  workload, the deadline, and the definition of "done"
- How to turn a hallway request into a one-paragraph scope statement you could hand to anyone

## The ask

You're **Theo Bryant**, a newly hired Cloud Engineer at **Driftwood Outdoor Apparel**, a small
but growing e-commerce retailer. Driftwood's product-catalog application — the page shoppers
browse to see products and photos — runs on a single aging on-prem server with no real
monitoring. If that server goes down, there's no backup plan beyond someone noticing it's down.

Your IT Manager, **Priya Suresh**, stops by your desk on your second week:

> "We've got a product launch coming up, and I don't trust that old server to hold up under more
> traffic. I want you to migrate the catalog app to Azure before launch — the images, and the
> server itself. Can you own that?"

That's the whole ask. No ticket, no architecture diagram, no existing migration plan to extend.
One stakeholder, one app, and a deadline on the calendar. This is exactly how a first real cloud
project usually starts — not as a fully scoped initiative, but as a sentence that sounds simple
and isn't yet.

## Why "migrate it to Azure" is a trap

That sentence hides more than it says. If you start provisioning resources before asking
anything, you'll guess wrong on at least one of these, and you won't find out until launch week:

- **"The images"** — are the product images stored as files on the same server, in a database,
  or somewhere else? You can't move something until you know where it actually lives.
- **"The server itself"** — does "migrate" mean recreate the exact same setup on an Azure VM, or
  is there room to also fix things that were never right on-prem (like monitoring)?
- **"Before launch"** — what's the actual date? Is there a hard cutoff, or a window where things
  need to be stable before the marketing team starts driving traffic to it?
- **"Can you own that?"** — does Priya want a finished migration with no check-ins, or does she
  expect to review the plan before anything moves?

None of these are hard questions. They're just questions nobody has answered yet, and every one
of them changes what you'd actually build.

## Turning a vague ask into a specific one

The skill this lesson teaches isn't the Azure CLI — it's **requirements clarification**, and
it's the most valuable conversation you'll have on this whole project. A short follow-up with
Priya gets concrete answers:

- **Workload**: the product-catalog app's static product images, currently stored as files on
  the on-prem server's disk, plus the application server itself — the VM-style workload that
  serves the catalog pages.
- **Deadline**: the product launch is five weeks out. Priya wants the migration done and
  validated at least one week before launch, so there's time to catch problems before real
  traffic arrives.
- **Definition of done**: the catalog app runs entirely on Azure, serving the same pages and
  images it serves today, with basic monitoring in place so a problem gets noticed before a
  customer reports it — something the on-prem server has never had.
- **Check-ins**: Priya wants to see the migration plan before anything gets built, and a short
  update before the actual cutover — she's not expecting a surprise on launch day.

Written down, the real ask becomes:

> *"Migrate Driftwood's product-catalog application — its static product images and its
> application server — from the on-prem server to Azure, with basic monitoring in place, fully
> validated at least one week before the product launch."*

That one sentence is now something you could hand to a teammate and they'd understand exactly
what "done" looks like. That's the test for whether a requirement is actually specific.

## What you're NOT deciding yet

Scoping also means noticing what you don't know yet, without guessing at it this early:

- Exactly which Azure services fit best — that's next lesson's job, not this conversation's.
- Whether anything about the app itself needs to change — assume "same app, new home" until you
  learn otherwise.
- Long-term platform plans beyond this one app — Priya asked about one app and one deadline, not
  a multi-year cloud strategy.

## Key terms

| Term | Meaning |
|---|---|
| Requirements clarification | Turning a vague request into a specific, answerable scope before building anything |
| Stakeholder | The person who asked for the migration and will judge whether it succeeded — here, Priya |
| Definition of done | The concrete, checkable condition that tells you the work is actually finished |
| Static asset | A file (like a product image) served as-is, rather than generated by application code |

## Lab

Before writing any CLI commands, write your own one-paragraph scope statement for Driftwood's
ask, in your own words, covering: the workload, the deadline, and the definition of done.
Compare it against the example above — did you land on the same scope, or did you need to make a
different assumption? Either is fine, as long as you can defend it if Priya asks.

## Check yourself

You're ready for Lesson 2 when you can state, from memory, the three things you needed answered
before touching Azure at all: what's the workload, what's the deadline, and what does "done"
actually mean — and explain why "migrate it to Azure" wasn't specific enough on its own.
