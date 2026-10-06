# Script — The Pre-Launch Checklist

## Segment 1 (title)

Twenty-five lessons of testing, CI/CD, deployment, hosting, and monitoring come down to this: before mainnet, is everything actually in place, or does it just feel like it probably is? A checklist is how you tell the difference.

## Segment 2 (steps: the contract itself)

Start with the contract itself. The full test suite passes -- unit, fuzz, invariant, fork, not just the happy path Lesson 1 warned against. CI is actually gating merges, not just running and being ignored. And it's deployed and verified, source matching bytecode on the explorer.

## Segment 3 (steps: who can touch it)

Who can touch the contract after launch matters as much as the contract itself. Deployment and upgrade authority sit behind a multisig, not one key. The upgrade path -- if there is one -- is understood by everyone who might need to use it. And every target chain is actually deployed and verified, not just the first one.

## Segment 4 (steps: the stack around it)

The stack around the contract needs the same scrutiny. The frontend is hosted with a verified domain, not just a working preview URL. The indexer runs from a pinned, scanned container image. Secrets live in CI, rotated and scoped. The RPC connection has a real fallback, not a single provider as a single point of failure.

## Segment 5 (steps: watching it go live)

And the team needs to actually be watching before the first real transaction happens, not scrambling to set it up after. Monitoring dashboards are live. Alerts are calibrated and tested, not just configured and assumed to work. The pause mechanism has actually been exercised by the people who'd need to pull it -- not just written and never touched.

## Segment 6 (outro)

One item was deliberately left off this checklist for its own lesson: what an audit and a bug bounty actually cover, and when each one needs to happen relative to launch. That's Lesson 27.
