# Lesson 25 — What SOAR Actually Is and Why It Matters

**Chapter 7 · SOAR & Automation Basics · Lesson 25 of 32**

## What you'll learn

- What the acronym SOAR actually stands for, and what each of its three words means as a distinct, real capability
- How orchestration connects the separate tools a SOC already runs so they act as one system instead of three or four
- Why automation is a separate idea from orchestration — running a sequence of steps without a human doing each one
- Why growing alert volume and a limited analyst headcount make SOAR increasingly necessary, not just a nice-to-have

## SOAR: three real words, not just an acronym

**SOAR** stands for **Security Orchestration, Automation, and Response**, and the easiest way to actually understand it is to take the three words one at a time instead of treating them as one blurred concept. Every tool you've learned about so far in this course — the SIEM in Chapters 2 through 4, the dashboards in Chapter 6 — is built to detect and surface things that need attention. SOAR is built to do something once they are.

## Orchestration: connecting the tools a SOC already has

A real SOC doesn't run one tool. It runs a SIEM, an EDR platform, a threat intelligence feed, an email security gateway, a ticketing system, and often several more, each with its own console and its own login. Without orchestration, an analyst manually pivots between all of them: copy an IP out of the SIEM, paste it into the threat intel tool, copy the verdict into a ticket, open the EDR console to isolate a host. **Orchestration** is the layer that connects those tools together through their APIs so data and actions can move between them automatically, instead of through an analyst's clipboard. The tools don't change — the SOAR platform just becomes the thing that talks to all of them on the analyst's behalf.

## Automation: skipping the human for the repeatable steps

Orchestration makes the connection possible; **automation** is what actually uses it. Automation means running a defined sequence of steps without a person manually doing each one, every single time it's needed. If a phishing report always starts with the same first move — pull the sender address and any URLs out of the email — there's no reason an analyst needs to open the email, read it, and copy that data out by hand on report number 400 any more than on report number 1. Automation runs that extraction the same way every time, instantly, freeing the analyst for the part of the job that actually needs judgment.

## Response: taking action, not just raising an alert

This is the piece that separates SOAR from a SIEM. A SIEM's job, as Chapter 2 covered, is to detect and alert — it tells a human something looks wrong and waits. **Response** means the platform can carry out an actual action itself: block a sender, quarantine a file, or isolate a host, the same kinds of real response actions covered for EDR platforms earlier in this course. A SOAR playbook can trigger those exact actions automatically, the moment its conditions are met, rather than waiting for an analyst to read the alert and issue the command by hand.

## Why SOC scale makes SOAR increasingly necessary

None of this is automation for its own sake. Alert volume at a typical SOC climbs every year — more endpoints, more cloud services, more log sources feeding the SIEM — while analyst headcount grows far more slowly, if it grows at all. That gap produces **alert fatigue**: too many alerts for the available analysts to review carefully, which means some get rushed and some get missed entirely. SOAR doesn't fix the volume problem by adding people; it fixes it by removing the well-understood, repeatable portion of the workload from a human's plate entirely, so the same team can absorb a much higher alert volume without burning out or missing the alerts that genuinely need a person's attention.

## Key terms

| Term | Meaning |
|---|---|
| SOAR | Security Orchestration, Automation, and Response — connecting tools, running steps automatically, and taking real action |
| Orchestration | Connecting a SOC's separate tools (SIEM, EDR, threat intel, etc.) through their APIs so data and actions flow between them |
| Automation | Running a defined sequence of steps without a human manually performing each one every time |
| Response | The platform taking a real action itself — block, quarantine, isolate — not just raising an alert |
| Alert fatigue | Too many alerts for the available analysts to review carefully, causing missed or rushed triage |

## Check yourself

You're ready for Lesson 26 when you can explain, in your own words: what is the actual difference between orchestration and automation, and why does SOAR need both before it can deliver the "response" part of its name?
