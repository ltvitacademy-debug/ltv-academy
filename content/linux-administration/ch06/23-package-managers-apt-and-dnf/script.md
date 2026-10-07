# Script — Package Managers: apt & dnf

## Segment 1 (title)

Installing software on Linux almost never means downloading an installer — it means asking a package manager to pull a known-good build from a repository, along with everything it depends on. Debian and Ubuntu use apt; Red Hat, Rocky, and Fedora use dnf, and Northbridge Retail runs both across its fleet.

## Segment 2 (code)

apt update refreshes the local list of available packages from configured repositories without installing or upgrading anything by itself. apt install then pulls down a package and its dependencies together, while remove uninstalls it but leaves configuration files behind — purge is the one that takes those too.

## Segment 3 (code)

dnf covers the exact same operations with a near-identical command structure, and it refreshes its own metadata cache automatically when it's stale, so there's no separate update step most of the time before an install. dnf update upgrades everything installed, and dnf remove uninstalls a package the same way apt remove does.

## Segment 4 (code)

Both tools let you confirm exactly what's installed right now rather than guessing. apt list --installed and dnf list installed each show the installed version and which repository it came from, which matters when you need to confirm a security patch actually landed.

## Segment 5 (steps)

The two toolchains map almost one to one: apt upgrade and dnf update both bring every installed package current, apt search and dnf search both look up a package by name, and apt purge's config-file cleanup takes a couple of extra steps to replicate under dnf.

## Segment 6 (outro)

Whichever package manager a Northbridge server runs, the underlying job is the same: install known-good software from a trusted repository instead of a random download. Up next, chapter six, lesson twenty-four: disks, partitions, and mounts — where that newly installed software actually lives on disk.
