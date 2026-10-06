# Lesson 8 — The Salesforce Platform vs. Salesforce Applications

**Chapter 2 · The Salesforce Ecosystem · Lesson 8 of 20**

## What you'll learn

- The difference between "the Salesforce Platform" and "a Salesforce application"
- Why this distinction explains both CRM and non-CRM uses of Salesforce
- What "building on the platform" actually means
- How this sets up Chapter 3's deeper dive into how Salesforce runs

## Two different things share one name

People casually say "Salesforce" to mean several different things at
once, and this lesson exists to separate them:

- **The Salesforce Platform** is the underlying foundation: a
  database, a security and permissions model, and a set of
  customization and development tools that can be used to build
  almost anything
- **A Salesforce application** (Sales Cloud, Service Cloud, and the
  rest from Lesson 7) is something *built* on that platform — a
  specific, pre-made bundle of objects, screens, and automation aimed
  at a specific job

Every application ships on the platform. Not everything built on the
platform is one of the named CRM applications.

## What "the platform" provides

Strip away Sales Cloud's leads and opportunities, and what's left
underneath is still fully functional: a place to define your own data
structures (custom objects), a security model controlling exactly who
can see and edit what, a way to automate processes without traditional
code, and — for more technical building — a full programming
environment. Chapter 3 covers each of these pieces (multitenancy,
metadata, security) in detail; this lesson is only about naming the
distinction before diving into the mechanics.

## What that makes possible

Because the platform is general-purpose, companies and partners build
things on Salesforce that have nothing to do with CRM at all: an
internal app for tracking equipment maintenance, a custom portal for
managing event registrations, an entirely custom application for an
industry Salesforce never originally designed for. None of that is
"using Sales Cloud differently" — it's building a new application
directly on the platform, using the same underlying tools that Sales
Cloud itself was built with.

## Why this distinction matters for a career

This split is also why Salesforce job titles branch the way they do
(Lesson 10 covers this fully). An **administrator** mostly configures
existing applications — Sales Cloud, Service Cloud — using
point-and-click tools. A **developer** builds new, custom applications
directly on the platform, sometimes with real code. Both are "working
in Salesforce," but one is customizing a pre-built application and the
other is building something new on the platform underneath it.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce Platform | The underlying database, security model, and customization/development tools |
| Salesforce application | A specific, pre-built product (like Sales Cloud) built on top of the platform |
| Custom object | A data structure you define yourself on the platform, beyond the standard CRM objects |

## Lab

1. Write one sentence describing something you could build on the
   Salesforce Platform that has nothing to do with selling anything.
2. Explain, in your own words, why "I use Salesforce" doesn't tell you
   whether someone works mostly in a pre-built application or builds
   custom applications on the platform.

## Check yourself

You're ready for Lesson 9 when you can explain the difference between
the platform and an application in your own words, with an example of
each.
