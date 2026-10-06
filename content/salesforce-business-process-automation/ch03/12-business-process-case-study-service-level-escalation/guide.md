# Lesson 12 — Business Process Case Study: Service Level Escalation

**Chapter 3 · Applied Automation · Lesson 12 of 18**

## What you'll learn

- How to design automation around a deadline instead of a threshold
- Why time-based workflow (from Lesson 1's toolbox) is the right tool here, not an approval process
- How a worked escalation design handles "almost late" and "already late" differently
- What to watch for when the same record can trigger more than one scheduled action

> **Fictional case study.** Briarcliff Networks is an invented managed-services company used to walk through a realistic scenario. No real company, data, or Salesforce org is represented.

## The business problem

Briarcliff Networks runs IT support for small businesses under contract, with a Service Level Agreement promising a four-hour response to Urgent cases. Support leadership's complaint: cases were quietly blowing past the four-hour mark with nobody noticing until the customer called to complain. There was no internal warning system — a case could sit untouched for the full SLA window and beyond, and the first person to find out was whoever picked up the phone.

## Turning the complaint into requirements

- Someone needs a heads-up before a case breaches its SLA, not after.
- If it breaches anyway, a different, more senior person needs to know immediately.
- The customer should get an acknowledgment that their case is being escalated internally, without staff having to remember to send one.

Unlike Lesson 11's quote approval, nothing here needs anyone to say "approve" or "reject" — it's a pure countdown problem, which points at time-based scheduled actions rather than an approval process.

## The escalation design

```
Record: Case (Priority = "Urgent", Status != "Closed")
SLA Target: 4 hours from CreatedDate

T-1 hour (3 hrs in):
  Notify: Case Owner  "SLA warning -- 1 hour remaining"

T+0 (4 hrs in, still open):
  Notify: Case Owner's Manager  "SLA breached"
  Update: Case.Escalated__c = true

T+0, customer-facing:
  Send Email: Case Contact
  "Your case has been escalated for priority handling"
```

The warning and the breach are two separate scheduled actions off the same trigger, not one action firing twice — the people who need to hear about them, and what they need to hear, are different at each point.

## Why the design holds together

The warning fires at the three-hour mark specifically so the case owner still has an hour to act before anyone above them is looped in — paging a manager for every Urgent case the moment it's created would train people to ignore the notification. The breach step only fires if the case is still open at the four-hour mark; if it closed in time, the scheduled action is removed from the pending actions list automatically and nothing fires. That's why `Status != "Closed"` matters in both the entry criteria and as something to double check when the case is reopened later.

## The result

Support leadership now sees SLA warnings before breaches happen instead of after a customer call, and every escalation is visible on the case itself — no separate tracking spreadsheet required.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled (time-based) action | An automation step that fires at a calculated time relative to a date field, not immediately |
| SLA warning | A proactive notice sent before a deadline is missed |
| Breach | The deadline passing while the record is still in a state that means it wasn't met |

## Check yourself

You're ready for Lesson 13 when you can explain why Briarcliff's design needs two separate scheduled actions off the same case, instead of one action that fires once at the four-hour mark.
