# Lesson 12 — Wireless Networking and Wi-Fi Security Basics

**Chapter 3 · Ports, Protocols & Network Services · Lesson 12 of 32**

## What you'll learn

- Why WEP is considered broken and deprecated, and what specifically made it fail
- How WPA2's 4-way handshake works and why it's still the most common Wi-Fi security in use
- What WPA3 fixes that WPA2 couldn't, and why it's now the current standard
- Why open Wi-Fi is dangerous, and how an evil-twin or rogue access point attack actually works

## WEP: broken, and deprecated for good reason

Wired Equivalent Privacy (WEP) was the original Wi-Fi security standard, and it's been considered
broken since the early 2000s. WEP reused the same small set of encryption keys in a way that
leaked enough patterns in the traffic that an attacker capturing a modest amount of traffic could
mathematically recover the key — often in minutes with freely available tools. No modern network
should run WEP; it exists in this course purely as the cautionary example of what "encrypted"
doesn't actually guarantee "secure."

## WPA2: still common, and built on a real handshake

WPA2 replaced WEP with AES encryption and a proper key-exchange process: the **4-way handshake**.
When a device joins a WPA2 network, the access point and the device use the network's shared
password (combined with the network name) to derive a **Pairwise Master Key**, and then exchange
four messages to confirm both sides derived the same session key without ever sending that key
itself over the air. That handshake is also WPA2's best-known weak point — an attacker who
captures it can attempt an offline **dictionary or brute-force attack** against the password,
which is why a long, non-obvious Wi-Fi password still matters even on WPA2.

## WPA3: the current standard, and what it actually fixes

WPA3 is the current standard and directly addresses WPA2's biggest weakness: it replaces the
4-way handshake's password exchange with **SAE** (Simultaneous Authentication of Equals, also
called the "dragonfly" handshake), which is resistant to the offline dictionary attacks that work
against a captured WPA2 handshake. WPA3 also adds **forward secrecy** — even if a password is
later compromised, previously captured traffic can't retroactively be decrypted — and it
encrypts traffic on open networks that previously had none. Both WEP and WPA2 are still
encountered on real networks, so an analyst needs to recognize all three, not just the newest one.

## Why open Wi-Fi is dangerous

An "open" Wi-Fi network — the kind with no password at coffee shops and airports — has no
encryption between the device and the access point at all, by definition. Anyone else on that
same network, with freely available tools, can potentially observe unencrypted traffic from other
users on it. HTTPS still protects the content of an individual connection even on open Wi-Fi, but
the network itself offers zero protection, which is exactly the environment where the next attack
thrives.

## Evil twin and rogue access point attacks

A **rogue access point** is any unauthorized Wi-Fi access point placed on or near a network. An
**evil twin** is a specific, common form of it: an attacker sets up an access point broadcasting
the same network name (SSID) as a legitimate one — "Airport_Free_WiFi" next to the real
"Airport_Free_WiFi" — hoping devices or users connect to the fake one instead. Once a victim
connects, the attacker sits in the middle of their traffic, able to observe unencrypted data,
redirect them to fake login pages to harvest credentials, or inject malicious content. It works
because most devices and people have no reliable way to tell two networks with the identical name
apart just by looking at them.

## Key terms

| Term | Meaning |
|---|---|
| WEP | The original, cryptographically broken Wi-Fi security standard; deprecated |
| WPA2 | Common current standard using AES and a 4-way handshake; vulnerable to offline password attacks on a captured handshake |
| WPA3 | Current standard; uses SAE to resist offline dictionary attacks and adds forward secrecy |
| Evil twin | A rogue access point broadcasting a legitimate network's SSID to trick devices into connecting to it |

## Check yourself

Why does capturing a WPA2 network's 4-way handshake let an attacker attempt an offline dictionary
attack against the Wi-Fi password, and why doesn't that same approach work against a WPA3
network using SAE?
