# Lesson 30 — Flow Practice Lab: Case Escalation

**Chapter 5 · Flow in Practice · Lesson 30 of 31**

## What you'll build

An **after-save, record-triggered flow** on Case that uses a **Scheduled Path** to check back in on a case hours after it opens, escalates it if it's still unresolved, notifies everyone on the case team in **one bulkified email** instead of one per person, and logs a real record if that notification fails.

## The business problem

A case that's been open past its SLA without being escalated is a case nobody's actively chasing. We want the platform itself to notice — automatically bump priority and flag it as escalated once a case has been open for 4 hours and is still unresolved, and make sure every case team member actually finds out, in one email, not several separate ones.

## Step 1 — Start element with a Scheduled Path

```
Flow: Case - After Save - SLA Escalation
Start: Case, record created or updated, After Save
Scheduled Path: "4 Hours After Case Created"
  Offset: 4 hours after Case.CreatedDate
```

A Scheduled Path lets a record-triggered flow come back and re-check a record later — exactly what "still open after 4 hours" requires, without a separate Scheduled Flow polling the whole object.

## Step 2 — Decision: still open and unescalated?

```
Element: Decision
Label:   Still Open and Unescalated?
Outcome "Needs Escalation":
  Status Not Equal To "Closed"  AND  Escalated__c Equals False
Default: "Already Handled" (end the path)
```

## Step 3 — Get the case team, bulkified

```
Element: Get Records
Label:   Get Case Team Members
Object:  CaseTeamMember
Filter:  ParentId Equals {!$Record.Id}
Store:   teamMembers (all records)
```

## Step 4 — Loop to collect, not to send

Following Lesson 22's bulkification pattern, the loop's only job is building a collection — it never sends anything itself:

```
Loop: teamMembers
  Add teamMembers.Member.Email to emailCollection
End Loop

Assignment:
  {!$Record.Escalated__c} = True
  {!$Record.Priority} = "High"

Action: Send Email (Action element)
  To Addresses: {!emailCollection}   -- one send, not one per loop pass
```

One **Send Email** action, outside the loop, addressed to the whole collection at once — not an email Action sitting inside the loop firing once per team member, which is exactly the unbulkified pattern that lesson warned about.

## Step 5 — A fault path that creates a record, not a field

This flow runs after save, so a fault here can't block the case's own save — but it can still fail silently if you let it. A fault path off **Send Email** creates a dedicated log record instead:

```
Fault path off Send Email:
  Element: Create Records
  Label:   Log Escalation Notification Failure
  Object:  Flow_Error__c
  Fields:  Message__c = {!$Flow.FaultMessage}
           Related_Case__c = {!$Record.Id}
```

## Key terms

| Term | Meaning |
|---|---|
| Scheduled Path | A record-triggered flow branch that runs a set time after the trigger, not immediately |
| CaseTeamMember | The object holding who's on a case's team — queried here, not hardcoded |
| Bulkified Send Email | One Action call addressed to a whole collection, built by a loop that only collects |

## Check yourself

Why does the Send Email Action sit outside the loop instead of inside it, and what would happen to a case with six team members if it were built the unbulkified way instead?
