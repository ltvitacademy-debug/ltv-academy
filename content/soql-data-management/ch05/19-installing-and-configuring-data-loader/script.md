# Script — Installing & Configuring Data Loader

## Segment 1 (title)

Data Loader is Salesforce's own free desktop app for moving data in bulk. In this lesson we install it, connect it to an org, and look at the settings that matter.

## Segment 2 (code: free, official, desktop)

Data Loader is free, official, and installs on your own computer. It handles bulk insert, update, upsert, delete and export, and it works with plain CSV files for both input and output. It's the standard tool for this job.

## Segment 3 (steps: logging in)

Logging in is straightforward. Pick an operation, choose how to log in, with OAuth being the modern option, then pick Production or Sandbox. Get that environment choice right before you click anything else. Salesforce then asks you to approve access in your browser. One requirement: your user must have API access, which depends on your edition and your permissions.

## Segment 4 (code: settings worth knowing)

A few settings are worth knowing. Batch Size controls how many records go up at a time, with a default of 200. Use Bulk API switches to a mode built for larger volumes. Insert Null Values decides whether blank cells actually erase existing data. And query request size affects exports.

## Segment 5 (outro)

Data Loader is installed and connected. Next up: exporting data, which is running a SOQL query and saving the results to a CSV.
