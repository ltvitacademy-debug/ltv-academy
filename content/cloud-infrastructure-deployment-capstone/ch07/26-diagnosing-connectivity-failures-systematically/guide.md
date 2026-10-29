# Lesson 26 — Diagnosing Connectivity Failures Systematically

**Chapter 7 · Troubleshooting Common Deployment Issues · Lesson 26 of 32**

## What you'll learn

- A fixed, five-question diagnostic sequence for any "can't reach it" ticket, run in order every
  time instead of guessed at
- Why that order — running, routed, allowed, resolvable, listening — mirrors the same layered
  logic the networking fundamentals course taught with the OSI model
- How to tell, from the question that finally fails, which layer actually broke
- Why skipping ahead to the layer you suspect almost always costs more time than just running all
  five, in order

## The five questions, in order

Lesson 25 named network/routing, security group/NSG rules, and DNS as three of the five places a
deployment usually breaks. This lesson turns those three (plus one more practical check) into one
repeatable sequence you run on any connectivity ticket, top to bottom, every time:

1. **Is the resource actually running?** Before anything else, confirm the VM, instance, or service
   is up at all — `az vm get-instance-view` or `aws ec2 describe-instances`. A resource that never
   finished booting isn't a networking problem yet.
2. **Is there a route to it?** Check the subnet's route table or effective routes. Is there a path
   from where the traffic originates to where the resource lives — the default internet route, a
   peering connection, a VPN, whatever the topology requires?
3. **Is the firewall/NSG/security group actually allowing this traffic?** Not "is there a rule that
   looks related" — specifically, does a rule allow this protocol, this port, from this exact
   source, right now? Lesson 32's incident lived here: the rule existed, but its source range was
   stale.
4. **Is DNS resolving correctly?** If you're connecting by hostname, confirm it resolves to the IP
   you actually expect — `nslookup` or `dig` — before assuming the IP itself is wrong.
5. **Is the service actually listening on the expected port?** Even with a perfect network path, an
   application that crashed, never started, or is listening on a different port than you assumed
   will still refuse the connection. `netstat`, `ss`, or a `systemctl status` check on the host
   settles this.

## Why this exact order

This sequence isn't arbitrary — it's the same layered logic the networking fundamentals course
built with the OSI model, applied practically instead of academically. You check the broadest,
cheapest thing first (is it even running?) and narrow down toward the most specific, most
expensive-to-verify thing last (is the process itself listening correctly?). Running the questions
out of order — jumping straight to "let me check the app logs" because that's your gut instinct —
means you might spend twenty minutes investigating an application that was never actually reachable
in the first place, because of a route or a security rule three layers earlier. Lesson 31's and
Lesson 32's incidents both resolved in minutes specifically because the engineer worked top to
bottom instead of guessing.

## A worked walkthrough

```text
Ticket: "Can't connect to the new app server on port 8080."

1. Running?      az vm get-instance-view -> PowerState/running        [PASS]
2. Routed?       effective routes show 0.0.0.0/0 -> internet gateway  [PASS]
3. Allowed?      NSG rule list -> no rule permits port 8080 inbound   [FAIL - stop here]
4. Resolving?    (not reached - the failure is already explained)
5. Listening?    (not reached)

Root cause found at question 3: no NSG rule exists for port 8080 at all.
Fix: add an inbound Allow rule for TCP 8080 from the correct source range.
```

Notice the sequence stops the moment a question fails — there's no need to check DNS or the
listening port once the firewall layer has already explained the entire symptom. That's the other
half of the value here: the sequence doesn't just find the answer, it tells you when to stop
looking.

## Key terms

| Term | Meaning |
|---|---|
| Effective routes | The actual, resolved routing rules governing a subnet after all route sources combine |
| Layered diagnosis | Checking broad infrastructure layers before narrower ones, in a fixed order |
| Listening port | The specific port a running service is actually bound to and accepting connections on |
| `nslookup` / `dig` | Command-line tools that confirm what IP address a hostname actually resolves to |

## Check yourself

A connectivity ticket passes questions 1, 2, and 3 but fails at question 4 — DNS isn't resolving
the hostname to the right IP. Walk through why that specific failure point rules out a firewall
problem and a "service is down" problem at the same time.
