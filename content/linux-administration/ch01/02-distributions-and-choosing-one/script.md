# Script — Distributions & Choosing One

## Segment 1 (title)

Northbridge Retail's ops team has agreed to move onto Linux. The next question is: which Linux? There's no single distribution — there are families with different package managers, release schedules, and support models, and picking one shapes the rest of your workflow.

## Segment 2 (steps)

Almost everything traces back to three lineages. Debian-based systems, including Ubuntu, use apt and the dot-deb package format, and Ubuntu Server is especially common in the cloud. RHEL-based systems, including the free community rebuilds Rocky Linux and AlmaLinux, use dnf and dot-rpm packages, and dominate regulated enterprises through Red Hat's paid support contracts. SUSE-based systems use zypper and also rpm packages, and show up in specific enterprise niches, especially in Europe.

## Segment 3 (code)

Apt and dnf do the same job with different syntax. Apt update refreshes Ubuntu's package lists and reports what's current. Dnf list installed shows what's already on an RHEL-based box, each line naming the package, its version, and which repository installed it. Whichever family you pick decides which syntax you'll use for every lab in this course.

## Segment 4 (steps)

Release cadence often decides the choice for a server fleet. Ubuntu ships a new long-term support release every two years, each good for five years, extendable to ten. RHEL's major versions get a full ten-year lifecycle, which is why regulated industries standardize on it. Rolling-release distributions update continuously with no fixed version — great for a desktop, risky for a server you don't want changing under you. Northbridge Retail weighed cost, their team's existing familiarity with apt, and strong first-class support on AWS, and landed on Ubuntu Server 22.04 LTS.

## Segment 5 (outro)

There's no universally correct distribution, only the one that fits your team and your support needs. Next, lesson three: getting a real Ubuntu machine running on your own computer.
