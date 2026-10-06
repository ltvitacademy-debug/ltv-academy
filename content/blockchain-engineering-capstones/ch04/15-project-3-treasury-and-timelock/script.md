# Lesson 15 — Treasury & Timelock · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This lesson builds the piece that actually holds the money -- and the mandatory delay that protects it even after a vote passes.

## S2 · STEPS — Why a timelock, not direct execution

Don't let the Governor hold funds and execute proposals the instant a vote succeeds. A TimelockController sits in between, so there's always a window after a vote passes but before anything moves -- time for the community to notice and react if a proposal turns out to be malicious or just a mistake.

## S3 · CODE — The real TimelockController

Here's the constructor, verified against OpenZeppelin's current docs. Four arguments: minDelay, the actual wait in seconds; proposers, who can queue a call -- that's the Governor itself, not a person; executors, who can trigger it once ready; and an optional admin.

## S4 · CODE — Wiring it together

After deployment, you grant the proposer role to the Governor contract, grant the executor role to the zero address so anyone can trigger an already-approved call, and then renounce the admin role from your own deployer account.

## S5 · STEPS — The step that matters most

That renounce call is what actually makes this a DAO. If the deployer keeps admin access, they can grant themselves proposer or executor rights at any time and skip the vote entirely. A governance system you can't walk away from isn't decentralized -- it's a demo.

## S6 · OUTRO

Next lesson: the Governor contract itself, wired to this timelock, and the full proposal lifecycle in a UI.
