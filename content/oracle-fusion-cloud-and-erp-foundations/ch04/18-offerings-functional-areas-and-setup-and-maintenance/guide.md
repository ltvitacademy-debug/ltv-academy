# Offerings, Functional Areas and Setup and Maintenance

**Chapter 4 · Implementation Basics and Careers · Lesson 18 of 20**

Every lesson so far has referenced "configuration" and "setup" without pinning down exactly where that happens. This lesson names the actual place: the **Setup and Maintenance** work area, and the hierarchy Oracle uses to organize every configuration decision inside it.

## What you'll learn

- What Setup and Maintenance is for
- The hierarchy: Offering → Functional Area → Task
- What an implementation project is, in this specific technical sense
- Why this structure matters to how real implementations are planned

## Setup and Maintenance

**Setup and Maintenance** is the dedicated work area where all of an implementation's configuration tasks live — it's the structured front door to configuring Oracle Fusion Cloud, rather than hunting for setup screens scattered across the application. It's where a company works through every decision needed to make Oracle Fusion Cloud behave the way their business needs it to, before go-live and on an ongoing basis afterward.

## The hierarchy: Offering → Functional Area → Task

Configuration in Setup and Maintenance is organized in three levels:

1. **Offering.** The broadest grouping — a full product area a company has subscribed to, such as **Financials**. An offering represents a major slice of the whole Oracle Fusion Cloud ERP pillar.
2. **Functional Area.** A grouping of related configuration within an offering. Inside the Financials offering, functional areas include things like **Payables**, **Receivables**, and **General Ledger**.
3. **Task.** The actual, specific configuration activity — for example, inside the Payables functional area, a task might be "Manage Payment Terms" or "Manage Tax Reporting Configuration."

This mirrors the Navigator → Work Area → Task hierarchy from Lesson 13, but for configuration specifically rather than day-to-day transaction work — the same instinct to organize broad-to-narrow shows up throughout Oracle Fusion's design.

## Implementation projects

An **implementation project** is a specific, named scope of offerings, functional areas, and tasks selected for one company's rollout — essentially a checklist and tracking tool built from the hierarchy above. A project team creates an implementation project, selects exactly which offerings and functional areas are in scope for that company (not every company needs every offering), and then assigns specific tasks to specific team members with target completion dates. As tasks get completed, the implementation project tracks overall configuration progress, which is also how a project manager can report "we're 70% complete on Financials configuration" with a real number behind it, not a guess.

## Why this structure matters

Without this hierarchy, "configuring the system" would be a vague, overwhelming blob of work. With it, a project can be broken into concrete, assignable, trackable pieces: this functional consultant owns Payables functional area tasks, that one owns Receivables, and the implementation project itself shows exactly how much is done and how much remains. Understanding this structure is part of what separates someone who can navigate Setup and Maintenance from someone who can actually run an implementation inside it.

## Key terms

| Term | Meaning |
|---|---|
| Setup and Maintenance | The dedicated work area for all configuration tasks |
| Offering | The broadest grouping, e.g. Financials |
| Functional Area | A grouping of related configuration within an offering, e.g. Payables |
| Implementation project | A named, scoped, trackable set of configuration tasks for one company's rollout |

## Check yourself

You're ready for Lesson 19 when you can explain the Offering → Functional Area → Task hierarchy using Financials → Payables → "Manage Payment Terms" as the example, and describe what an implementation project actually tracks.
