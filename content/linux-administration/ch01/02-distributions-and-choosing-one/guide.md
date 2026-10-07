# Distributions & Choosing One

Northbridge Retail's ops team has signed off on moving their application servers to Linux. The next question lands on your desk: Linux *what*, exactly? There is no single "Linux" to install — there are families of distributions with different package managers, different release philosophies, and different support models. Picking wrong doesn't break anything immediately, but it means fighting your tooling for years. This lesson walks through the real options and the criteria a team actually uses to choose.

## What you'll learn

- The three major distribution families and how they relate to each other
- The practical difference between `apt` and `dnf`, the two package managers you'll meet most
- What "LTS" means and why release cadence matters for a production server fleet
- The criteria Northbridge Retail's team actually used to pick a distribution

## The major distribution families

Almost every distribution you'll encounter in a DevOps job traces back to one of three lineages:

- **Debian-based** — Debian itself, and Ubuntu, which is built on top of Debian. These use the `.deb` package format and the `apt` package manager. Ubuntu Server is extremely common in cloud environments because of Canonical's long-term support commitment and strong cloud-image availability on AWS, Azure, and GCP.
- **RHEL-based** — Red Hat Enterprise Linux, and its free, binary-compatible community rebuilds, **Rocky Linux** and **AlmaLinux**. These use the `.rpm` package format and the `dnf` package manager (the modern successor to `yum`, whose command is still accepted for compatibility). RHEL-based systems dominate regulated enterprises because of Red Hat's paid support contracts and certification ecosystem.
- **SUSE-based** — openSUSE (community) and SUSE Linux Enterprise Server (commercial), common in Europe and in specific enterprise niches, also using `.rpm` but with the `zypper` package manager.

Fedora deserves a mention even though it's rarely run in production: it's Red Hat's upstream testing ground, where features get tried out roughly a year before they land in the next RHEL release.

## apt vs. dnf: the same job, different syntax

Here's package list refresh and status on a Debian-based system:

```
$ apt update
Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]
Reading package lists... Done
Building dependency tree... Done
All packages are up to date.
```

And the equivalent check for installed packages on an RHEL-based system:

```
$ dnf list installed | head -5
Installed Packages
NetworkManager.x86_64          1:1.42.2-1.el9      @System
bash.x86_64                     5.1.8-6.el9         @System
coreutils.x86_64                8.32-36.el9         @System
curl.x86_64                     7.76.1-26.el9_3     @System
```

Different commands, same underlying job: both track installed software against repositories and resolve dependencies automatically. You'll learn the install/remove/search subcommands for both in Chapter 2 — for now, recognize that whichever family you pick determines which syntax you use for the rest of this course's labs.

## Release cycles and LTS

Release cadence is often the deciding factor for a server fleet:

- **Ubuntu** ships a new LTS (Long-Term Support) release every two years in April — 22.04 "Jammy," 24.04 "Noble" — each supported for 5 years standard, extendable to 10 years with a free Ubuntu Pro subscription for personal/small-team use.
- **Debian** releases roughly every two years with no fixed schedule, and is famous for conservative, extremely stable "stable" branches, with community LTS support extending further.
- **RHEL** major versions (8, 9, 10) each get a full 10-year lifecycle, which is why regulated industries standardize on it — you plan a migration once a decade, not every two years.
- **Rolling-release** distributions like Arch or openSUSE Tumbleweed push updates continuously with no fixed "release," which is great for staying current but risky for a production server you don't want changing under you.

For a server, you almost always want a fixed, supported release — not a rolling one.

## How Northbridge Retail actually chose

Their ops lead weighed three things: cost (no budget yet for RHEL support contracts), familiarity (the team already knew `apt` from personal use), and cloud support (their new VMs run on AWS, where Ubuntu LTS images are a first-class, well-documented option). They landed on **Ubuntu Server 22.04 LTS** for the first wave of migrations, with Rocky Linux kept on the table for any future workload that specifically needs RHEL compatibility. There's no universally "correct" distro — there's the one that fits your team, your support needs, and your release-cycle tolerance.

## Key terms

- **Distribution family** — a lineage of distributions sharing a package format and manager (Debian/Ubuntu, RHEL/Rocky/AlmaLinux, SUSE)
- **`apt`** — the Debian/Ubuntu package manager, working with `.deb` packages
- **`dnf`** — the modern RHEL/Fedora/Rocky package manager, working with `.rpm` packages (successor to `yum`)
- **LTS (Long-Term Support)** — a release guaranteed security updates for a fixed, multi-year window, preferred for production servers
- **Rolling release** — a distribution model with continuous updates and no fixed version, better suited to desktops than servers
