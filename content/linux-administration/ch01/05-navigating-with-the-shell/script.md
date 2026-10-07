# Script — Navigating With the Shell

## Segment 1 (title)

You've got the map from the last lesson — now it's time to actually move through that tree. Pwd, cd, and ls are the three commands you'll type more than any others for the rest of your career, so this lesson is about getting genuinely comfortable with them.

## Segment 2 (code)

Pwd prints your current working directory, which is the single most useful question to ask before running anything relative. Cd takes either an absolute path, starting from the root and valid from anywhere, or a relative path, interpreted from wherever you currently are. Cd dot-dot moves you up to the parent directory.

## Segment 3 (steps)

A few shortcuts are worth memorizing immediately. The tilde always means your own home directory, from anywhere, and cd with no arguments takes you there too. A single dot means the current directory itself — you'll use that constantly to run a script sitting right where you are, as in dot-slash-deploy-dot-sh. And cd dash jumps you back to whichever directory you were in just before your last cd, which is genuinely useful when you're bouncing between two locations all day.

## Segment 4 (code)

Plain ls hides almost everything useful. Dash a shows hidden dotfiles like dot-bashrc and dot-ssh, which otherwise don't appear at all — a common source of confusion for anyone new to Linux. Dash l shows permissions, owner, and size instead of just names. And dash h formats those sizes in kilobytes and megabytes instead of raw bytes.

## Segment 5 (outro)

Press tab while typing a path and the shell completes it for you — that single habit eliminates most typos in long paths. With pwd, cd, and ls genuinely comfortable, chapter two starts next: users, permissions, and ownership, where the real administration work begins.
