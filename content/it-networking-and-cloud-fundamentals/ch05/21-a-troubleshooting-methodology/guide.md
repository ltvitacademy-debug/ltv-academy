# A Troubleshooting Methodology

The last two lessons covered tools one at a time. This lesson covers the order to actually use them in, so a vague "something's broken" turns into a specific, fixable finding instead of a guessing game.

## What you'll learn

- Why starting at the bottom of the stack (not the application) usually narrows problems fastest
- A concrete order to work through: physical/network, DNS, transport, application
- How to isolate a problem by changing one variable at a time
- Why documenting what was already checked matters as much as finding the fix

## Work from the bottom of the stack up

When Northbridge Retail's checkout page reports an error, the instinct is to open the application's own logs first. That's often the slowest path, because an application error can be caused by something several layers below it — a routing problem, a DNS record, a closed port — that the application logs never mention at all, even though that's often where the real cause actually lives. A faster methodology works up the stack instead of guessing at the top:

1. **Physical / network reachability** — is the host even reachable? ping it, check whether its basic network path is up.
2. **DNS** — does the name actually resolve to the address expected? dig confirms or rules this out in seconds.
3. **Transport / port** — is something actually listening on the expected port? ss or a quick connection attempt answers this.
4. **Application** — only once the layers below are confirmed working does it make sense to dig into application logs and behavior.

## Isolate one variable at a time

A problem that "started happening for some users" is usually more specific than it first sounds. Does it fail from every location, or only some? Every browser, or one? Every account, or one specific account's data? Each of those is a single variable to isolate — change or remove one at a time and see whether the problem follows it. If the checkout error only reproduces for one specific product, the product's data is a much stronger suspect than the checkout service as a whole.

## Form a hypothesis, then test it specifically

Once the layer-by-layer checks and the isolated variable point somewhere, the next step is a specific, falsifiable hypothesis — "the load balancer's health check is marking backend-03 unhealthy" — not a vague one like "something's wrong with the servers." A specific hypothesis has an obvious next test: check backend-03's health check logs directly, rather than restarting things at random and hoping.

| Step | Question it answers |
|---|---|
| Reachability | Is the host up at all? |
| DNS | Does the name resolve correctly? |
| Transport | Is the right port actually listening? |
| Application | Is the app logic itself behaving correctly? |

## Document as you go

Writing down what's already been checked — and what it showed — prevents two people from re-running the same ping five separate times, and gives whoever picks up the issue later a clear starting point instead of starting the whole methodology over from scratch. For a recurring issue, that record also becomes the first thing worth checking the next time it happens.

## Key terms

| Term | Meaning |
|---|---|
| Bottom-up troubleshooting | Checking network, DNS, and transport before diving into application logs |
| Variable isolation | Changing or removing one factor at a time to see what the problem follows |
| Hypothesis | A specific, testable guess about the cause, rather than a vague impression |
| Documentation | A written record of what's already been checked and what it showed |
