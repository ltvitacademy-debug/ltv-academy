# Lesson 10 — Service and Version Enumeration Beyond Just Open Ports

**Chapter 3 · Scanning and Enumeration · Lesson 2 of 4**

## What you'll learn

- How Nmap's `-sV` version detection actually identifies software, and
  what `--version-intensity` controls
- How to grab a banner by hand when you want to confirm what a script
  reported, rather than trusting it blindly
- Why an exact software version — not just "port 21 is open" — is
  what actually points toward a known-vulnerable configuration
- How enumeration extends past TCP/UDP ports into protocol-specific
  tools like `enum4linux` for SMB

## An open port tells you almost nothing by itself

"Port 21 is open" is barely useful. Dozens of FTP server
implementations exist, spanning two decades of patch history, and
whether that port represents a real finding depends entirely on
**which** FTP server, and **which version**. Enumeration is the
process of turning a port number into an exact answer: what's
listening, what software, what version, and — ultimately — what
that version is known to be vulnerable to. This is the step that
actually produces leads worth investigating, which is why a real
scanning phase spends far more time here than on the initial port
sweep.

## Version detection with `-sV`

```
nmap -sV -p 21,22,80 10.10.10.5
```

```
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 2.3.4
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
```

`-sV` works by sending a sequence of probes from Nmap's
`nmap-service-probes` database and comparing the responses against
known signatures — this is how it tells the difference between
Apache and nginx both claiming to be "http," and pulls the exact
version string out of the response where possible. You can turn the
dial with `--version-intensity 0-9`: lower values send only the
most common probes (faster, less thorough), `9` tries everything in
the database (slower, most thorough). `-A` is a convenience flag that
bundles `-sV`, `-O`, default scripts, and traceroute into one run.

That `vsftpd 2.3.4` line is not a neutral detail. vsftpd 2.3.4 is a
specific, publicly known-backdoored build — the kind of exact-version
hit that turns a scan line into a real lead. The lesson isn't "that
version is bad" by itself; it's that version strings are what you
cross-reference against CVE databases, which is exactly what Chapter
4 builds on.

## Confirming it by hand: banner grabbing

Automated detection is good, not infallible — services get
reconfigured to hide or spoof their banners. Confirming manually with
a raw connection is a basic, important habit:

```
nc -nv 10.10.10.5 21
```

```
220 (vsFTPd 2.3.4)
```

Netcat (or `telnet target 80` for HTTP, then typing `HEAD / HTTP/1.0`
and two newlines) opens the raw socket yourself and reads whatever
greeting the service sends unprompted — no interpretation layer in
between. When an automated tool's output and a hand-grabbed banner
disagree, trust what you read with your own eyes and dig into why.

## The Nmap Scripting Engine: `-sC` and `--script`

```
nmap -sV -sC -p- 10.10.10.5
```

`-sC` runs Nmap's default script set — safe, commonly useful NSE
scripts that pull extra detail `-sV` alone won't: HTTP titles and
headers, SSL certificate details, SMB OS info, and more. Specific
scripts can be targeted directly, e.g. `--script smb-os-discovery` or
`--script http-title`, when you already know what you're after.

## Enumeration beyond Nmap: protocol-specific tools

Some services need a dedicated tool to enumerate properly. **SMB**
enumeration with `enum4linux -a 10.10.10.5` can pull share names,
domain/workgroup info, user lists, and password policy from a
Windows host, often without authentication if the target is
misconfigured. **SNMP** enumeration with default community strings
(`snmpwalk -c public -v1 target`) can leak an entire device
configuration. These aren't Nmap flags, but they're the same
discipline: don't stop at "the port is open," keep enumerating until
you know exactly what's really there.

## Key terms

| Term | Meaning |
|---|---|
| `-sV` | Nmap's version detection, matching service responses against the `nmap-service-probes` database |
| `--version-intensity` | 0–9 scale controlling how many version-detection probes Nmap sends per port |
| Banner grabbing | Manually connecting to a service (e.g. with `nc`) to read its raw greeting, confirming automated detection |
| NSE (`-sC`/`--script`) | The Nmap Scripting Engine; runs scripts that extract detail beyond plain version strings |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
is an exact version string more useful to a pentester than just
knowing a port is open, and why would you ever bother confirming a
banner by hand after `-sV` already reported one?
