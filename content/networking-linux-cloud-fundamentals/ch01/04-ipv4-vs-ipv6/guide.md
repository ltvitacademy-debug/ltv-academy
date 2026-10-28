# Lesson 4 — IPv4 vs. IPv6

**Chapter 1 · Networking Fundamentals · Lesson 4 of 32**

## What you'll learn

- Why the internet is running out of IPv4 addresses
- How IPv6 solves the address-exhaustion problem
- What an IPv6 address actually looks like, and how to read its shorthand
- What dual-stack means, and why most networks run both protocols today

## IPv4's fundamental problem: it's only 32 bits

IPv4 addresses are 32 bits, which caps the entire IPv4 address space at about 4.3 billion unique
addresses. That sounded unlimited in the 1980s. It is nowhere close to enough for a planet with
billions of phones, laptops, servers, and IoT devices all needing an address. The Internet
Assigned Numbers Authority (IANA) allocated the last free blocks of IPv4 address space years ago
— the internet has been managing IPv4 scarcity since, mainly through NAT (letting many private
devices share one public IPv4 address, covered in a later lesson) rather than actually running
out.

## IPv6: 128 bits, a genuinely enormous address space

IPv6 addresses are 128 bits — not twice as many addresses as IPv4, but roughly
340 undecillion (3.4 x 10^38) of them. That's large enough that address exhaustion isn't a
realistic concern on any human timescale, which removes the need for NAT as a scarcity
workaround (though NAT and private addressing still exist for other reasons, like security
boundary design).

An IPv6 address is written as eight groups of four hexadecimal digits, separated by colons:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

Two shorthand rules make these addresses less painful to write in practice:

1. **Leading zeros in each group can be dropped**: `0db8` becomes `db8`.
2. **One single run of consecutive all-zero groups can be collapsed to `::`** (only once per
   address, since using it twice would make the address ambiguous).

Applying both rules to the address above:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
  -> 2001:db8:85a3:0:0:8a2e:370:7334        (drop leading zeros)
  -> 2001:db8:85a3::8a2e:370:7334           (collapse the double-zero run)
```

## Dual-stack: how the transition actually works in practice

Almost no organization has fully retired IPv4 — the realistic migration path is **dual-stack**,
where a device and network run IPv4 and IPv6 at the same time, side by side, and use whichever
one the destination actually supports. Cloud platforms (Azure, AWS) support dual-stack
networking for exactly this reason: a workload can be reached over either protocol while the
wider internet gradually finishes its own IPv6 adoption.

```
Dual-stack device:
  eth0: 192.168.1.50/24                    (IPv4, still works)
  eth0: 2001:db8:85a3::50/64               (IPv6, also works)
```

## Key terms

| Term | Meaning |
|---|---|
| IPv4 address exhaustion | IPv4's 32-bit space (~4.3 billion addresses) running out, managed mainly through NAT |
| IPv6 | The 128-bit successor address format, with a practically inexhaustible address space |
| `::` shorthand | A single collapsed run of consecutive all-zero groups in an IPv6 address, usable only once |
| Dual-stack | Running IPv4 and IPv6 simultaneously on the same device or network during the transition |

## Check yourself

Why can the `::` shorthand only be used once in a single IPv6 address, even if the address has
two separate runs of all-zero groups?
