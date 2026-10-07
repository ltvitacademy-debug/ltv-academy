# Script — The Filesystem Hierarchy

## Segment 1 (title)

Northbridge Retail's team has Ubuntu running. Before anyone edits a config file or reads a log, they need to know where things actually live, and Linux organizes that very differently from Windows's drive letters.

## Segment 2 (steps)

There's no C drive or D drive — there's exactly one root directory, written as a single slash, and every other disk or device gets mounted onto some folder inside that one tree instead of getting its own letter. This layout is standardized across virtually every distribution by something called the Filesystem Hierarchy Standard, which is why a server looks structurally the same whether it's Ubuntu, Debian, or RHEL.

## Segment 3 (steps)

Four directories you'll touch constantly. Etc holds system-wide configuration — almost everything you edit as an admin. Var slash log holds logs and other data that changes while the system runs. Home holds each regular user's personal files. And opt is the conventional home for self-contained third-party or in-house applications installed outside the package manager. A fifth directory, dev, is worth knowing too — it holds device files representing hardware, not regular data.

## Segment 4 (code)

Ls -la on the root directory shows that layout directly — notice bin and sbin are actually symlinks into usr, because modern Ubuntu merged those directories but kept the old paths working. Df -h shows what's mounted where and how much space is left on each filesystem — useful the moment a server starts complaining it's out of disk.

## Segment 5 (outro)

Automation tools deploy config to etc and read logs from var slash log specifically because the standard guarantees they'll be there on any Linux box. That predictability is also why a script written for one Linux server tends to just work on another, with no special-casing needed. Next, lesson five: actually moving around this tree with cd, ls, and pwd.
