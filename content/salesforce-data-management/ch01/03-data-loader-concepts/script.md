# Script — Data Loader Concepts

## Segment 1 (title)

Data Loader is the tool you reach for when the Import Wizard's limits stop being theoretical. Unlike the wizard, it's a real application you install on your machine — a one-time setup cost before you get the payoff of handling almost anything.

## Segment 2 (screenshot: Setup Data Loader page)

Setup has its own shortcut to the download, but the actual installer comes from Salesforce's developer site. It reads and writes CSV files, and talks to Salesforce through the same SOAP or Bulk API any integration would use — that's what gives it reach the wizard doesn't have.

## Segment 3 (steps: before you install)

Before installing, you need Java Runtime Environment 17 or later, since Data Loader no longer bundles its own copy. Download the zip for your OS, extract it, and run the installer script inside.

## Segment 4 (screenshot: install terminal output)

The installer copies Data Loader's program files, a configs folder where your settings and encryption keys live, and a samples folder with example mapping files. It finishes by asking about desktop and start-menu shortcuts.

## Segment 5 (screenshot: Data Loader main window)

Open Data Loader and you land on its main screen: six buttons, and every job starts by picking one. Each is really its own small wizard — log in, choose an object, choose a CSV file, map fields, and run.

## Segment 6 (steps: the six operations)

Insert, Update, and Upsert are the three ways to get data in. Delete and Hard Delete remove records — Hard Delete skips the Recycle Bin entirely and needs its own permission. Export and Export All pull data out, with Export All including soft-deleted and archived records.

## Segment 7 (outro)

Now that you know what Data Loader is and how it starts, next we prepare the CSV files it actually runs on.
