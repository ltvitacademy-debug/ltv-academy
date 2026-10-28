# Lesson 28 — A Worked SOAR Playbook Example

**Chapter 7 · SOAR & Automation Basics · Lesson 28 of 32**

## What you'll learn

- How to walk a complete, realistic SOAR playbook step by step, from trigger to final outcome
- What "ingest," "extract," and "enrich" mean in practice, using one concrete phishing report
- Why the playbook still notifies an analyst even on the branch where it takes action automatically
- How this single worked example ties together orchestration, automation, and response from Lesson 25

## The scenario

An employee receives an email claiming to be from IT, asking them to "verify" their password at a link. Instead of clicking it, they do exactly what Chapter 1 of this course's broader security awareness would want: they forward it to the security team's phishing-report mailbox. That one forwarded email is the trigger for everything that follows.

## Step 1: Ingest

The moment the forwarded email lands in the phishing-report mailbox, the SOAR platform picks it up as a new case — this is the **ingest** step. Orchestration (Lesson 25) is what makes this possible at all: the SOAR platform is connected to the mailbox through its API, watching for new messages, so nothing has to wait for an analyst to notice it sitting in an inbox.

## Step 2: Extract

Next, the playbook pulls the raw material out of the email automatically: the original sender's address, the full text of the "verify your password" link, and any attachments. This is pure **automation** — the same extraction an analyst would do by hand, run instantly and identically every time a report comes in.

## Step 3: Enrich

With the sender address and URL in hand, the playbook checks them against threat intelligence feeds — the same kind of lookup covered in this course's log-source lessons. This is **enrichment**: gathering outside context on an indicator before deciding anything. Say the link resolves to a domain that threat intel already flags as a known credential-harvesting site, registered three days ago. That's a strong, specific signal, not a guess.

## Step 4: Branch and respond

This is where **response** (Lesson 25's third word) actually happens:

```
IF the URL/domain is confirmed malicious by threat intel:
    - Auto-quarantine the email from every inbox it reached
      (not just the one employee who reported it)
    - Block the domain at the email gateway so future copies
      never arrive at all
    - Open a case and notify an analyst: "Confirmed phishing,
      contained automatically -- reviewed by [playbook name]"

IF the verdict is inconclusive or intel has no record of the domain:
    - Leave the case open
    - Route it directly to an analyst's queue for manual review
    - Notify the reporting employee that it's being looked into
```

## Step 5: Notify either way

Notice the analyst is told something on *both* branches, not just the one requiring their judgment. On the confirmed-malicious branch, there's no decision left to make — but an analyst still needs a visible record that action happened, in case the same campaign shows up again or a pattern across multiple reports needs spotting. That's the Lesson 27 relationship in practice: the playbook didn't need a human to contain this one email, but a human stays in the loop to catch anything the playbook itself can't — like whether this is the fifth nearly-identical report this week, which would be worth investigating as its own campaign.

## Tying it back together

This single scenario uses every piece from this chapter: orchestration connects the mailbox, threat intel feed, and email gateway into one flow; automation runs the extraction and enrichment without anyone opening the email by hand; response actually quarantines and blocks instead of just alerting; and the scenario qualifies for a playbook at all specifically because it's repeatable and well-understood, exactly the two conditions Lesson 26 named. The chapter capstone, starting with Lesson 29's queue of real-looking alerts, is where you'll apply this same triage thinking yourself.

## Key terms

| Term | Meaning |
|---|---|
| Ingest | The step where a new case or alert enters a playbook, usually via an API connection to the source |
| Extract | Pulling raw indicators (sender, URL, attachment) out of the alert automatically |
| Enrich | Checking an extracted indicator against an outside source, like threat intel, to add context before deciding |
| Confirmed vs. inconclusive branch | The fork in a playbook where the next action depends on whether enrichment returned a clear verdict |

## Check yourself

Walk through the phishing-report playbook from this lesson in your own words, naming which step is ingest, which is extract, which is enrich, and which is response — then explain why the analyst is still notified even on the branch that's fully automated.
