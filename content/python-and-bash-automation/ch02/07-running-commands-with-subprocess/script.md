# Script — Running Commands With subprocess

## Segment 1 (title)

Not everything belongs in pure Python. Northbridge Retail's deployment scripts still need to run a git pull to update code on a server, or trigger a database backup command on the system itself. The subprocess module is how a Python script reaches out, runs an external command, and reacts to whether it actually worked.

## Segment 2 (code)

subprocess.run takes a list — the command, then its arguments — runs it, and hands back a CompletedProcess object. capture_output=True grabs whatever the command printed to stdout and stderr instead of letting it print directly to the terminal, and text=True decodes that as a normal string instead of raw bytes. You can also pass cwd to run the command from a specific working directory, like the project folder being deployed.

## Segment 3 (code)

Every CompletedProcess has a returncode: zero means the command succeeded, anything else means it failed. Check it before assuming a backup or a deploy step actually worked — or pass check=True and let Python raise an exception automatically on a nonzero result.

## Segment 4 (code)

Always pass the command as a list with shell=False, which is the default. That runs the command directly, with no shell involved to misinterpret anything. shell=True hands the whole string to the system shell instead, and if any part of that string comes from user input, it can be used to run extra, unintended commands.

## Segment 5 (steps)

Put it together and a safe subprocess call looks the same every time: pass a list of arguments, capture the output as text, check the return code — or use check=True — and set a timeout so a command that hangs, like an SSH session that never returns, doesn't freeze your entire script.

## Segment 6 (outro)

Next up, you'll wrap scripts like this in a real command-line interface using argparse, building a Northbridge server-health tool end to end.
