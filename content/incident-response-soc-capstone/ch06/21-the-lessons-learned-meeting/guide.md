# Lesson 1 — The Lessons Learned Meeting

**Chapter 6 · Post-Incident Activity · Lesson 1 of 4**

## What you'll learn

- Why Post-Incident Activity centers on a real, scheduled meeting — not an informal hallway debrief
- What NIST SP 800-61 recommends about timing, attendance, and agenda for that meeting
- The three questions every lessons learned meeting has to answer: what worked, what didn't, what should change
- Why skipping this meeting means a SOC keeps relearning the same mistakes during the next live incident

## A real meeting, not a formality

Chapter 1 named Post-Incident Activity as the fourth NIST SP 800-61 phase and described it as "a
lessons-learned review that asks what worked, what didn't, and what needs to change." This lesson
makes that concrete: in a real SOC, that review is a scheduled meeting with a defined attendee list
and agenda, held while the incident is still fresh — not a line in a closing ticket comment, and not
something that only happens "if there's time." NIST's own guidance is explicit that this step gets
skipped under deadline pressure more than any other phase, precisely because an incident that's been
contained and recovered from *feels* finished. It isn't. The meeting is where a resolved incident
turns into an organization that's actually better prepared for the next one.

## Timing: soon, while the details are still sharp

NIST recommends holding the lessons learned meeting soon after an incident is resolved — within days,
not weeks — while the timeline, the decisions that were made, and the friction the team hit are all
still fresh in people's heads. Wait too long and the details blur: nobody remembers exactly why
containment took 45 minutes instead of 15, or which tool didn't have the access it needed. For a
major incident, NIST recommends holding this meeting on its own; for smaller incidents, a SOC can
reasonably batch several together into one periodic review, so the practice doesn't become so heavy
that it stops happening at all.

## Who's in the room, and what they're asked

A useful lessons learned meeting pulls in everyone who touched the incident, not just the IR lead:
the analysts who triaged and investigated, the engineers who executed containment, the system owner
whose environment was affected, and often someone from management who can actually approve the fixes
that come out of it. The agenda itself boils down to three questions, asked about every phase of the
response: **What worked?** (the on-call page went out immediately, the EDR tool isolated the host
cleanly) **What didn't?** (a critical log source wasn't actually feeding the SIEM, nobody knew who
had authority to take a production server offline) **What should change?** (fix the log pipeline,
document the escalation authority in the IR plan). Every answer to that third question becomes a
candidate action item — and Lesson 2 covers how those get written down so they actually get done.

## A concrete example

A SOC just closed out a business email compromise: an attacker used a phished credential to log into
a VP's mailbox and set up a forwarding rule to exfiltrate finance emails. In the lessons learned
meeting, the team walks the timeline. What worked: the SIEM alert on the new forwarding rule fired
within minutes, and the analyst who triaged it correctly escalated instead of sitting on it. What
didn't: the team spent over an hour trying to confirm whether MFA was enabled on that account, because
nobody on the call had direct access to the identity platform and had to wait for someone else to log
in and check. What should change: give the on-call IR analyst read access to MFA status directly, so
that specific delay can't happen again. That one finding, captured because the meeting happened at
all, becomes a concrete fix instead of a story people just remember and hope to avoid repeating.

## Key terms

| Term | Meaning |
|---|---|
| Lessons learned meeting | A scheduled post-incident review, held soon after resolution, that asks what worked, what didn't, and what should change |
| Post-Incident Activity | The NIST SP 800-61 phase this meeting belongs to, which feeds its findings back into Preparation |
| Action item | A concrete, trackable fix that comes out of a "what should change" finding |
| Retrospective | A general term for a structured after-the-fact review; the lessons learned meeting is incident response's version |

## Check yourself

Without looking back: what are the three questions a lessons learned meeting has to answer, and why
does NIST recommend holding it within days of resolution rather than weeks later?
