# Script — Uptime & SLA Math

## Segment 1 (title)

"Five nines" gets thrown around as a badge of honor, but almost nobody quotes what it actually means in minutes, or what it costs. Let's do the arithmetic once, so these percentages stop being marketing and start being real numbers you can weigh against a real budget.

## Segment 2 (code: the nines, converted to real time)

A year is 525,600 minutes. 99.9% allows about 8.76 hours of downtime a year. 99.99% allows about 52.6 minutes. 99.999% allows about 5.26 minutes. Each additional nine is roughly a 10x reduction in allowed downtime, not a small improvement.

## Segment 3 (steps: why each nine costs more than the last)

Getting from 99% to 99.9% might just take better patching discipline. Getting to 99.99% usually requires real automatic failover technology, because a human can't reliably notice and fix things inside 52 minutes a year across every incident. Getting to 99.999% typically demands redundancy at every single layer.

## Segment 4 (outro)

The nines math gives you a concrete number to anchor an honest SLA conversation with a stakeholder — what the target actually allows, and what architecture it actually takes to hit it. Next up: comparing the real HA technologies against these targets.
