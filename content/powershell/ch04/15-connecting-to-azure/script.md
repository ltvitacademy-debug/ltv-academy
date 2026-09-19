# Script — Connecting to Azure From PowerShell

## Segment 1 (title)

Once Az is installed, connecting is one line — Connect-AzAccount opens a browser window for interactive sign-in, then prints which account, subscription, and tenant you landed in.

## Segment 2 (screenshot: choosing a shell in Cloud Shell)

Azure Cloud Shell, built into the Azure Portal, is a genuinely real zero-install option — a browser-based shell already signed in as you. First run, it asks you to choose Bash or PowerShell.

## Segment 3 (screenshot: Cloud Shell first-run setup)

Cloud Shell's first-run setup creates a small storage account to persist your files between sessions — a one-time step per subscription. After that, reopening Cloud Shell drops you straight into an already-authenticated PowerShell prompt.

## Segment 4 (steps: checking and disconnecting)

Check which subscription you landed in before running anything that creates or deletes a resource — Set-AzContext switches it. Disconnect-AzAccount matters on a shared machine, the same way logging out of anything else does.

## Segment 5 (outro)

Connect-AzAccount locally, or Cloud Shell with zero install — either way, you're authenticated to Azure. Next up: running actual T-SQL from PowerShell with dbatools.
