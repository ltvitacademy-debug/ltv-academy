# Lesson 7 — Reading and Writing Basic Snort/Suricata Rules

**Chapter 2 · Intrusion Detection & Prevention Systems · Lesson 7 of 32**

## What you'll learn

- The general shape every Snort and Suricata rule follows, regardless of what it's detecting
- What the action, protocol, and IP/port fields at the start of a rule each control
- How to read the rule options inside the parentheses, including `msg`, `content`, and `sid`
- How to walk through one real, simplified rule line by line and explain exactly what it does

## The rule skeleton

Snort and Suricata — two of the most widely used open-source detection engines, and the tools most commonly meant by "writing a detection rule" in a SOC — both use the same basic rule syntax. Every rule follows this shape:

```
action protocol src_ip src_port -> dst_ip dst_port (rule options)
```

- **action** — what the engine does on a match: `alert` (raise an alert only), `drop` (silently discard the packet, IPS mode), `reject` (block and notify), or `pass` (explicitly ignore)
- **protocol** — `tcp`, `udp`, `icmp`, or `ip`
- **src_ip src_port -> dst_ip dst_port** — the source and destination of the traffic, with `->` showing the direction the rule watches (some rules use `<>` for traffic in either direction)
- **(rule options)** — everything in parentheses, which describes exactly what to look for in that traffic and how to label the match

## A real worked example

Here's one real, simplified rule a SOC might actually write to catch a basic SQL injection attempt:

```
alert tcp any any -> $HOME_NET 80 (msg:"Possible SQL Injection Attempt"; content:"UNION SELECT"; sid:1000001; rev:1;)
```

Reading it piece by piece: `alert` means it only raises an alert, it doesn't block anything. `tcp any any` means any TCP traffic, from any source address and port. The `->` points toward `$HOME_NET 80` — `$HOME_NET` is a variable representing your own protected network, so this means traffic headed to your web servers on port 80. Put together, the rule watches: *any TCP traffic headed to our web servers on port 80.*

## Breaking down the options

Inside the parentheses:

- **`msg`** — the human-readable description that shows up in the alert itself, here `"Possible SQL Injection Attempt"`. This is the first thing an analyst reads when triaging the alert.
- **`content`** — the exact byte pattern to search for inside the packet's payload. Here it's the literal string `"UNION SELECT"`, a telltale fragment of a SQL injection attempt trying to abuse a vulnerable query.
- **`sid`** — a unique numeric ID every custom rule must have (locally written rules conventionally start at 1000000 and up, to avoid colliding with the official rule sets' IDs), so an analyst or another tool can reference that exact rule unambiguously later.
- **`rev`** — the revision number of the rule, which goes up each time the rule itself is edited, so a team can track which version is currently deployed.

## Key terms

| Term | Meaning |
|---|---|
| Action | The first field in a rule; what the engine does on a match (`alert`, `drop`, `reject`, `pass`) |
| Direction operator (`->`) | Shows which way the traffic flows that the rule is watching |
| `content` | A rule option specifying the exact byte pattern to match in the packet payload |
| `sid` | A unique numeric ID required on every custom rule |

## Check yourself

Without looking back at the lesson, walk through `alert tcp any any -> $HOME_NET 80 (msg:"Possible SQL Injection Attempt"; content:"UNION SELECT"; sid:1000001; rev:1;)` field by field. What traffic does it watch, and what does it do when it finds a match?
