# Lesson 10 — Finding the Overly Broad Rule Nobody Flagged

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 10 of 16**

## What you'll learn

- How to read a firewall rule's configured source address object against its original justification
- How CIDR notation determines exactly how many addresses a rule actually covers
- Why "it's always been this way" is a red flag for a security control, not reassurance
- Why deadline pressure during initial setup is a common, predictable cause of this exact kind of gap

## Opening the rule itself

Mara opens `ALLOW-VENDOR-RDP-SUPPORT` (`FW-0231`) in the firewall console and reads its configured
source object directly: **`198.51.0.0/16`**. Then she pulls the vendor's own onboarding paperwork
from the ticket that justified the rule back in Lesson 4 — the metering vendor's documented,
contracted remote-support range is **`198.51.100.16/28`**.

Those two numbers don't match, and the gap between them is the entire problem.

## What a /16 actually covers, next to a /28

CIDR notation isn't just a format — the suffix is literally how many addresses are included:

- `198.51.100.16/28` covers 16 addresses: `198.51.100.16` through `198.51.100.31`. That's the
  vendor's entire real range.
- `198.51.0.0/16` covers 65,536 addresses: every address from `198.51.0.0` through
  `198.51.255.255`.

The vendor's real 16-address range sits *inside* the configured 65,536-address range — which is
exactly why nothing looked broken day to day. Every legitimate vendor connection still worked,
because `198.51.100.16/28` is a subset of `198.51.0.0/16`. The rule never failed to do its job for
the vendor. It just also did the job for 65,520 other addresses nobody ever intended to trust.

## Since when, and why nobody caught it

The rule's change history shows it was created on the same date as the rest of Lesson 4's setup —
the night Mara was working against a deadline to get vendor remote support stood up quickly. No
later edits exist. Nobody revisited the rule's scope after it went live, because at the time there
was no process step that required anyone to.

This isn't a story about carelessness. A `/16` is a plausible typo for someone copying a range
under time pressure and rounding up "to be safe" rather than confirming the vendor's actual
documented block — and once it worked, there was no trigger that would ever bring it back up for
review. That absence of a review step is itself a gap, and it's exactly what Lesson 12's new
standing control closes.

## Why this matters more than a typo should

`198.51.0.0/16` landing open to RDP on `3389` means any address inside that massive range could
have reached the jump host the whole time this rule existed — not just the one IP that happened to
trip the correlation rule in Lesson 8. The 3 AM alert didn't create the exposure; it's the first
time something inside that range that wasn't the vendor actually showed up and got noticed.

## Key terms

| Term | Meaning |
|---|---|
| CIDR notation | An address range written as a base address plus a `/` suffix indicating how many bits are fixed |
| `/28` | A CIDR block covering 16 addresses |
| `/16` | A CIDR block covering 65,536 addresses |
| Subset range | A smaller address block fully contained within a larger one |

## Lab

Calculate, without a calculator tool, how many addresses `198.51.100.16/28` covers and how many
`198.51.0.0/16` covers. Confirm for yourself that the first range sits entirely inside the second,
and explain in one sentence why that containment is exactly what let the mistake go unnoticed.

## Check yourself

You're ready for Lesson 11 when you can state both CIDR values from memory and explain why a `/16`
that fully contains a vendor's real `/28` hides the mistake instead of revealing it immediately.
