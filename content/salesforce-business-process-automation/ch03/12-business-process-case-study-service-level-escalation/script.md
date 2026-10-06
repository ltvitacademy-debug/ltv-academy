# Script — Business Process Case Study: Service Level Escalation

## Segment 1 (title)

Briarcliff Networks is a fictional managed-services company we're using to design around a deadline instead of a dollar threshold -- a genuinely different kind of problem than Lesson 11's quote approval.

## Segment 2 (steps: a deadline nobody was watching)

Briarcliff promises a four-hour response on Urgent support cases. The problem: there was no internal warning system. Cases quietly blew past that four-hour mark with nobody noticing, and the first person to find out was whoever picked up the phone when the customer called to complain.

## Segment 3 (steps: two moments, two audiences)

The design splits into two moments with two different audiences. An hour before the deadline, the case owner gets a warning -- still time to act. At the deadline itself, if the case is still open, the owner's manager gets notified, the case is flagged as escalated, and the customer gets an automatic acknowledgment that it's being handled with priority.

## Segment 4 (code: the process as configured)

That's two scheduled time-based actions off the same case record, not one action firing twice -- a warning at the three-hour mark, a breach notice at four hours, each with a different audience and a different message.

## Segment 5 (code: why it holds together)

The warning fires early enough that the owner has a real hour to act before a manager gets looped in -- paging someone for every Urgent case immediately would just train people to ignore it. And the breach notice only fires if the case is still open. Close it in time, and that scheduled action simply never happens.

## Segment 6 (outro)

Leadership now sees warnings before breaches, not after an angry phone call. Next lesson: once a piece of automation like this is actually built, how do you document it so the next person doesn't have to reverse-engineer it from scratch?
