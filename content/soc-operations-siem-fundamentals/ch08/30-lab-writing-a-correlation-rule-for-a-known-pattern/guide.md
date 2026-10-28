# Lesson 30 — Lab: Writing a Correlation Rule for a Known Pattern

**Chapter 8 · Capstone: A Day in the SOC · Lesson 30 of 32**

## What you'll learn

- How to turn Chapter 4's correlation-rule logic into a working rule for one specific,
  well-known pattern: impossible travel
- Why the rule has to group events by identity and compare them across a time window, instead
  of matching on any single event alone
- How to calculate "impossible" using distance and time rather than a hardcoded list of
  suspicious countries
- Why a rule this useful also needs tuning exceptions, or it starts flagging the SOC's own
  legitimate VPN traffic

## The scenario

Thornfield Financial Services' SOC wants a standing correlation rule for impossible travel
before next quarter — not a one-off search run by hand after something's already gone wrong,
the way Alert C in Lesson 29 nearly did. This lab writes that rule using the same WHEN /
correlation-window / THEN shape from Chapter 4, built from the two real login events in
Lesson 29's incident.

## Step 1: define the triggering event

The rule only needs to watch one kind of event: a successful authentication, pulled from every
monitored sign-in source — VPN, SSO, and the legacy mail protocol that let Lesson 29's second
login skip MFA. A failed login tells the rule nothing about where someone actually got in.

```
WHEN event_type = "successful_authentication"
```

## Step 2: group by identity, within a window

A single login event can never be impossible on its own — it only becomes impossible compared
to another login from the same account. The rule groups matching events by `user_id` and only
compares logins that fall inside a correlation window, the same concept Chapter 4 uses to
separate "related events" from "coincidence":

```
GROUP BY user_id
WITHIN 60 minutes
  COUNT(DISTINCT geo_country) >= 2
```

Sixty minutes is generous on purpose — it has to catch Lesson 29's 39-minute gap between
Chicago and Hanoi comfortably, without being so short that a slower attacker's second login
slips just outside it.

## Step 3: calculate "impossible," don't guess at it

Instead of a hardcoded list of suspicious countries — which ages badly and misses plenty — the
rule calculates the speed required to travel between the two login locations in the time
available, and compares it against the fastest plausible commercial travel speed:

```
distance_miles = geo_distance(location_1, location_2)
required_speed = distance_miles / hours_between(time_1, time_2)
WHEN required_speed > 500
  RAISE ALERT "Impossible Travel Detected" severity=high
```

Chicago to Hanoi in 39 minutes requires a speed no commercial flight gets close to, which is
exactly what fires the alert — and it would fire the same way for any two distant cities, not
just the ones already on a watchlist.

## Step 4: tune it before it goes live

A rule this sensitive to geography will also flag Thornfield's own corporate VPN, which
sometimes exits through a concentrator in a different country than the employee's actual
location — a false "impossible travel" that has nothing to do with an attacker. Before shipping
the rule, the SOC adds an exception for known corporate VPN exit-node ranges, and sets the
severity lower (rather than suppressing it entirely) for any pair of logins where one side is a
recognized exit node, so a genuinely suspicious pairing involving that range still gets
reviewed.

## Key terms

| Term | Meaning |
|---|---|
| Correlation window | The time span within which the rule compares related events from the same identity |
| Impossible travel | A login pattern where the distance and time between two logins exceed any plausible travel speed |
| Geo-distance calculation | Deriving required travel speed from two login locations and timestamps, instead of matching a fixed list |
| VPN exit-node exception | A tuning rule that prevents a corporate VPN's own routing from triggering a false impossible-travel alert |

## Check yourself

The rule in Step 3 calculates a required speed instead of checking against a list of
"suspicious" countries. Why does that make the rule durable against an attacker who logs in
from a country nobody's ever flagged before?
