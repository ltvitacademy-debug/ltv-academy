# Lesson 31 — Flow Practice Lab: Onboarding Wizard

**Chapter 5 · Flow in Practice · Lesson 31 of 31**

## What you'll build

A multi-screen **Screen Flow** a sales rep launches the moment a deal closes: confirm the account's details, branch into an extra step for deals that need an implementation project, create the primary contact and a kickoff task, and show a real error on-screen if anything fails — the one flow type in this lab series that actually gets to use a screen for that fault path.

## The business problem

When an Opportunity closes, onboarding currently happens by memory: someone has to remember to create a contact, create a task, and schedule a kickoff call for bigger deals. A guided wizard screen flow turns that from "hopefully remembered" into "walked through, every time," using nothing more exotic than the screen flows covered back in Chapter 2.

## Step 1 — Start and Screen 1: confirm the account

```
Flow: Opportunity - Screen - Onboarding Wizard
Start: Screen Flow, launched from a Quick Action on Opportunity

Screen 1: Confirm Account Details
  Display: Account Name, Account Owner (read-only)
  Input:   Primary Contact Name (Text)
  Input:   Primary Contact Email (Email)
  Input:   Needs Implementation Project? (Checkbox)
```

## Step 2 — Decision: does this deal need an extra step?

```
Element: Decision
Label:   Needs Implementation Project?
Outcome "Yes":  {!NeedsImplementation} Equals True
Default: "Standard Onboarding" (skip straight to Step 4)
```

## Step 3 — Screen 2 (conditional): schedule the kickoff

Only the "Yes" path reaches this screen — exactly the branching pattern from Lesson 13's Decision lesson, now gating an entire screen instead of one field:

```
Screen 2: Schedule Kickoff Call
  Input: Kickoff Date/Time (DateTime)
```

## Step 4 — Create the records

```
Element: Create Records
Label:   Create Primary Contact
Object:  Contact
Fields:  LastName = {!PrimaryContactName}
         Email     = {!PrimaryContactEmail}
         AccountId = {!$Record.AccountId}

Element: Create Records
Label:   Create Onboarding Task
Object:  Task
Fields:  Subject   = "Customer Onboarding"
         OwnerId   = {!$Record.OwnerId}
         ActivityDate = {!KickoffDateTime} (or TODAY() + 2 if standard path)
```

## Step 5 — A fault path that finally gets to use a screen

Unlike the before-save and after-save flows in the last two labs, a **screen flow can show $Flow.FaultMessage directly to the person running it** — the pattern from Lesson 20 in its original, intended form:

```
Fault path off Create Primary Contact:
  Screen: Something Went Wrong
  Display Text: {!$Flow.FaultMessage}
```

## Step 6 — Screen 3: confirmation

```
Screen 3: You're All Set
  Display Text: "Contact created. Onboarding task assigned."
```

## Key terms

| Term | Meaning |
|---|---|
| Quick Action launch | Starting a screen flow directly from a record's page, not a separate menu |
| Conditional screen | A screen reached only through one Decision outcome, skipped entirely on the other path |
| Screen-flow fault path | The one flow context in this course where $Flow.FaultMessage can go straight to Display Text |

## Check yourself

Why can this lab's fault path show $Flow.FaultMessage on a screen, when Lesson 29's lead-assignment flow had to write it to a field instead?
