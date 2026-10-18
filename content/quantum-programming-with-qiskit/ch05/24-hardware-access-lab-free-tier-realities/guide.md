# Hardware-Access Lab: Free-Tier Realities

Everything in this chapter so far has been about the mechanics of real hardware: picking a backend, transpiling for it, managing jobs, reading noisy results. This lesson is about the practical, career-relevant constraint that sits underneath all of it — you almost certainly have a limited amount of real hardware access, and how you spend it is a real engineering decision.

## What you'll learn

- Why free-tier access to real quantum hardware is a genuinely limited resource, not an unlimited one
- How shared-queue priority tiers affect how long you actually wait
- The practical workflow this implies: simulate first, validate, then spend real hardware access deliberately
- How to think through prioritizing your own limited quota across multiple circuits you want to run

## Free-tier access is limited — check the current terms

IBM Quantum Platform's free or open access tier comes with real limits on how much you can run — typically some form of monthly compute time or job allowance. The exact current limits change over time as IBM adjusts its offering, so rather than repeating a specific number here that could be stale by the time you read it, the honest guidance is: go check the IBM Quantum Platform's current plans/pricing page before you plan any real hardware work, and treat whatever quota you're given as a real, finite budget — because it is one.

## Priority tiers affect your place in the queue

The queueing behavior covered earlier in this chapter isn't uniform across all users. Paid tiers — Premium or pay-as-you-go plans — typically get priority over open, free-tier access on shared backends. That means two users submitting jobs to the same backend at the same moment can see meaningfully different wait times purely based on their account tier. This is worth knowing not to make you feel shortchanged, but because it's a realistic constraint you should plan around: if you're on free-tier access, build in the expectation that your queue waits may be longer than what a tutorial running on a paid tier might show.

## The practical workflow: simulate first, hardware second

Given limited quota and variable queue times, the right workflow is almost always:

1. Build and debug your circuit entirely on `AerSimulator` — it's free, effectively instant, and you can run it as many times as you want while you iron out bugs, check logic, and confirm your circuit does what you think it does.
2. Only once you're confident the circuit is correct in simulation, submit it to real hardware — and when you do, batch as many of your validated circuits together into as few job submissions as possible (as covered in the previous lesson), since every job submission spends queue time and, on a metered plan, potentially spends quota too.

Submitting a circuit to real hardware before you've validated it in simulation is a common way to waste scarce quota on a bug you could have caught for free.

## Reflect: prioritizing your own limited quota

Suppose you have a small number of real-hardware runs available to you this month, and you have several circuits you're curious about — some you're fairly confident are correct, some you're still debugging, and some you'd just like to compare against simulation results for your own learning. Think through, concretely:

- Which circuits have you validated thoroughly enough in simulation that a real-hardware run would tell you something new (like the noise signature from the previous lesson), rather than just catching a bug you could catch for free?
- Could any of your planned runs be combined into a single batched job submission instead of separate ones?
- Is there a circuit you're tempted to run on hardware mainly out of curiosity rather than because you need hardware-specific information from it — and would simulation actually answer your question just as well?

There's no single correct answer here; the point is that treating hardware access as a budget, and making that prioritization explicit, is itself a real skill you'll use again any time you work with metered or shared compute resources — quantum or otherwise.

## Key terms

| Term | Meaning |
|---|---|
| Free/open tier | IBM Quantum Platform's no-cost access level, with real but variable limits on compute time/jobs — check the current plans page |
| Priority tier | Account level (e.g. free/open vs. Premium/pay-as-you-go) that affects queue priority on shared backends |
| Validate in simulation first | The practical workflow of debugging on `AerSimulator` before spending limited real-hardware quota |
| Quota | Your limited allowance of real hardware compute/jobs on a given plan, which resets or is tracked over time |
| Batching for quota | Combining multiple validated circuits into one job submission to conserve both queue time and metered quota |

## Check yourself

You have three circuits: one you've already debugged thoroughly in simulation and are confident is correct, one you're still actively debugging and keep finding small mistakes in, and one you just want to see for curiosity's sake with no specific question in mind. Given a small, limited amount of real-hardware quota this month, how would you prioritize these three, and why?
