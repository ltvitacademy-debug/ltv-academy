# Lesson 23 — Linux Patch Management with apt and yum/dnf

**Chapter 6 · Patch Management & Baseline Configuration · Lesson 3 of 4**

## What you'll learn

- Why Linux patch management splits along distro family lines, not a single unified command
- The real `apt update && apt upgrade` workflow on Debian and Ubuntu, and what each half
  actually does
- The real `yum update` / `dnf upgrade` workflow on RHEL, CentOS, Rocky, Alma, and Fedora
- What `unattended-upgrades` does, and the real tradeoff that comes with fully automatic
  patching

## Two package-manager families, two command sets

Unlike Windows, there's no single "Windows Update" equivalent across all of Linux, because
there's no single Linux — there are **distributions**, and they split into families by which
**package manager** they use. The **Debian family** (Debian itself, Ubuntu, Linux Mint) uses
**APT**, the Advanced Package Tool, working with `.deb` packages. The **Red Hat family** (RHEL,
CentOS Stream, Rocky Linux, AlmaLinux, Fedora) uses **YUM** or its modern successor **DNF**,
working with `.rpm` packages. An administrator managing a mixed environment needs to know both
command sets — they do the same conceptual job, refresh the list of available packages, then
install newer versions, but the actual commands differ.

## Debian/Ubuntu: apt update && apt upgrade

On a Debian-family system, patching is two distinct steps, and the order matters:

```
sudo apt update
sudo apt upgrade
```

`apt update` doesn't install anything at all — it only **refreshes the local package index**,
the list of what versions are available in each configured repository. `apt upgrade` then
installs newer versions of packages that are **already installed**, without removing anything
in the process. Running `apt upgrade` without running `apt update` first means apt is working
off a stale index and may think there's nothing new to install even when there is. A related
command, `apt full-upgrade` (also called `dist-upgrade`), behaves like `apt upgrade` but is
allowed to remove a package if that's what dependency resolution requires — useful, but worth
knowing it can remove things, which plain `upgrade` never will.

## RHEL/CentOS/Fedora: yum update / dnf upgrade

On a Red Hat-family system, the same job is typically one command instead of two:

```
sudo yum update
sudo dnf upgrade
```

`yum update` (or the newer `dnf upgrade` — `dnf` is the successor package manager used on
Fedora and RHEL 8 and later, with `yum` kept as an alias for compatibility) refreshes the
repository metadata **and** installs available updates in a single command, rather than
splitting that into two steps the way apt does. If an administrator only wants to see what's
available without installing anything yet, `yum check-update` is the equivalent of running
`apt update` alone — it lists what's out there without touching the system.

## Unattended upgrades: automating without losing control

Both families support **automatic** patching so a human doesn't have to run these commands by
hand on every machine. On Debian and Ubuntu, the package is called `unattended-upgrades`; on
the Red Hat family, the equivalent is `dnf-automatic`. Both run on a schedule (via cron or a
systemd timer) and install updates — usually configured to apply only the ones classified as
**security** updates, not every available update — without anyone logging in to type a
command. That closes the patch gap automatically and removes one obvious source of human
delay, but it also removes the manual testing checkpoint Lesson 21 described: the same
speed-vs-stability tension is still there, it's just been automated instead of eliminated,
which is exactly why most real deployments still scope unattended upgrades to security patches
only and pair them with monitoring, rather than letting every package update itself
unsupervised.

## Key terms

| Term | Meaning |
|---|---|
| APT | The Advanced Package Tool, used by Debian, Ubuntu, and other Debian-family distributions |
| YUM / DNF | The package managers used by RHEL, CentOS, Rocky, AlmaLinux, and Fedora; DNF is YUM's modern successor |
| apt update vs. apt upgrade | update refreshes the package index only; upgrade installs newer versions of already-installed packages |
| full-upgrade / dist-upgrade | Like apt upgrade, but permitted to remove packages if dependency resolution requires it |
| unattended-upgrades / dnf-automatic | Packages that automatically install updates (typically security-only) on a schedule, without manual action |

## Check yourself

Why does running `apt upgrade` without first running `apt update` risk installing stale or
incomplete package information, when the equivalent risk doesn't apply the same way to a plain
`yum update`?
