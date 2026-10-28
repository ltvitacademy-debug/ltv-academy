# Lesson 7 — SIEM vs. Log Management: The Real Difference

**Chapter 2 · SIEM Fundamentals · Lesson 7 of 32**

## What you'll learn

- What a log management tool actually does, and where its job ends
- The specific capabilities a SIEM adds on top of log management
- A concrete contrast between the two in the same environment
- Why "we centralize our logs" doesn't automatically mean "we have a SIEM"

## Log management: centralize it, search it

A log management tool's whole job is two steps: centralize logs from wherever they
come from, and let someone search them. That's genuinely useful — an application
crashes, and an analyst searches across every server's logs for the matching stack
trace in seconds instead of connecting to each box individually. But the tool itself
isn't watching for anything on its own. It waits to be asked.

## What a SIEM adds on top

A SIEM starts from that same centralized foundation and adds capabilities log
management doesn't have: correlation rules that run continuously and automatically
across every source, alerting that notifies an analyst the moment a rule fires —
without anyone searching first — and security-specific analytics, such as matching
activity against threat intelligence feeds, built for detecting attacks rather than
general troubleshooting.

## A concrete contrast, same environment

Picture the same environment running both kinds of tools. With log management alone,
nothing happens until a human decides to look — an app crashes, and someone searches
the stack trace after the fact. With a SIEM watching the same logs, five failed logins
across three different systems inside five minutes gets correlated and raises an alert
on its own, before any analyst thought to go searching for it. That automatic,
unasked-for detection is the entire difference between the two categories of tool.

## Why the distinction matters in practice

Vendors and job postings sometimes blur the line between "we have centralized
logging" and "we have a SIEM," but functionally the test is simple: if a tool isn't
correlating in real time and raising security alerts automatically, it's log
management, not a SIEM — no matter how good its search is. Knowing that distinction
matters when you're evaluating a real tool, scoping what a team actually has in place,
or describing your own experience accurately in an interview.

## Key terms

| Term | Meaning |
|---|---|
| Log management | A tool that centrally stores and lets you search logs — no built-in security correlation or alerting |
| SIEM | A log management foundation plus real-time correlation, automatic alerting, and security-specific analytics |
| Passive vs. active | Log management is something you search when you already suspect a problem; a SIEM actively watches and alerts without being asked |
| Security analytics | Detection logic purpose-built for security patterns, such as threat intel matching, rather than general operational search |

## Check yourself

A company says "we centralize all our logs in one searchable system." Does that alone
mean they have a SIEM? Why or why not?
