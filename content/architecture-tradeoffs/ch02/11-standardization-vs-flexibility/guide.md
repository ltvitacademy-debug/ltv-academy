# Lesson 11 — Standardization vs. Flexibility

**Chapter 2 · Tradeoffs in Depth · Lesson 11 of 20**

## What you'll learn

- Why one global process is easier to maintain but harder for every individual team to love
- Concrete Salesforce examples: one global Opportunity page layout vs. per-business-unit layouts, a single approval process vs. team-specific variants
- The real cost standardization imposes on teams with genuinely different needs
- How to decide how much local flexibility a given process actually deserves

## One system, one set of rules — until it isn't enough

A single, standardized Opportunity process — one page layout, one set of required fields, one approval process, one set of automation rules — is dramatically easier to build, document, train on, and maintain than a different version per business unit or region. There's one thing to test when Salesforce ships a new release. There's one thing new hires have to learn. There's one place to fix a bug. Standardization is, in a real sense, free complexity reduction — it doesn't just feel simpler, it measurably is simpler, because there's only one version of everything to reason about.

The cost shows up the moment two teams' actual businesses genuinely differ. A standardized Opportunity page layout built around a straightforward sales motion forces a professional-services team that sells statement-of-work engagements through a completely different qualification and approval path to either misuse fields that don't really mean what the label says for their process, or petition for exceptions that erode the standardization that made the system simple in the first place. A single global approval process with one threshold for "requires VP sign-off" either sets that threshold too low for a team that routinely closes seven-figure deals (creating approval fatigue on deals that were never actually risky) or too high for a team that closes small, frequent deals (letting genuinely risky deals through without the right eyes on them). Forcing every team into the same mold isn't neutral — it's a real cost paid specifically by the teams whose actual process doesn't match the standard, even while it's a real benefit for the teams whose process does match it.

## The decision isn't "standardize or don't" — it's "standardize what, exactly"

The useful framing splits a process into pieces rather than treating it as one all-or-nothing choice:

- **What's genuinely common across every team, regardless of their differences?** Core fields like Account, Amount, Close Date, and Stage exist for every sales team regardless of what they sell — standardizing these costs nothing, because nobody's actual process differs on them.
- **What looks common but is actually different once you ask the team that owns it?** This is where the real tradeoff work happens. "Approval process" sounds like one thing, but a seven-figure enterprise deal and a thousand-dollar add-on renewal are not actually the same kind of decision, and forcing them through the same threshold is standardizing something that was never actually uniform.
- **Can the variation be handled through configuration rather than a parallel, separately-maintained process?** Record Types, dynamic page layouts assigned by Record Type, and approval process entry criteria scoped by Record Type or business unit let a single underlying system present different, team-appropriate experiences without actually forking the maintenance burden into separate systems. This is the strongest tool for this tradeoff: it gets most of standardization's maintenance benefit while still letting the parts that are genuinely different actually be different.
- **Who bears the cost of getting this wrong?** A team forced into an ill-fitting standard process will route around it — informal spreadsheets, Slack approvals outside the system, Opportunities abandoned halfway through a form that doesn't fit their deal. That workaround cost is real and often invisible to whoever decided the standard, because it doesn't show up as a support ticket; it shows up as bad data and adoption nobody's measuring directly.

## Key terms

| Term | Meaning |
|---|---|
| Standardization | Using one common process, layout, or rule set across every team, trading per-team fit for lower overall maintenance and training cost |
| Record Type | A Salesforce mechanism that lets a single object present different page layouts, picklist values, and process paths for different business scenarios |
| Approval process entry criteria | Conditions that scope which records enter a given approval process, usable to let one underlying process behave differently per team or threshold |
| Shadow process | An informal workaround (spreadsheets, out-of-system approvals) a team builds when the standard process doesn't fit their actual work |

## Lab

A company's sales org includes a transactional SMB team (hundreds of small, fast deals a month) and an enterprise team (a handful of large, complex deals a quarter). Leadership wants "one Opportunity process" for consistency. Using the criteria above, design a split: what should genuinely stay standardized across both teams, what should vary using Record Types or similar configuration, and what would you flag to leadership as a real cost of forcing full standardization on the parts that differ?

## Check yourself

Can you explain why standardization is a genuine, measurable complexity reduction, not just a preference? Can you describe at least one concrete Salesforce mechanism (beyond "just build two separate systems") that lets a process standardize what's genuinely common while still flexing where teams are genuinely different?
