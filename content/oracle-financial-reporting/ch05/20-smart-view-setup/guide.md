# Smart View Setup

Chapter 5 is about the fourth reporting job: Excel-native, live analysis of ledger balances, plus collaborative narrative reporting. The tool is Smart View. Before anything else, this lesson covers getting Smart View installed and connected to a Fusion environment — the setup every later lesson in this chapter assumes is already done.

## What you'll learn

- What Smart View is, revisited precisely
- Installing the Smart View add-in
- Shared connections: how Smart View finds your Fusion environment
- Signing in and confirming the connection works

## What Smart View actually is

Smart View is a Microsoft Office add-in — most commonly used inside Excel, though it also works in Word and PowerPoint — that gives a multidimensional pivot analysis tool combined with full Excel functionality, enabling users to interactively analyze balances and define reports using a familiar spreadsheet environment. Rather than exporting a static snapshot of data into Excel once, Smart View keeps a live connection: you can refresh a worksheet and pull current balances again, pivot dimensions directly inside Excel's own grid, and drill into underlying detail, all without leaving the spreadsheet.

## Installing the add-in

Smart View is installed as a separate piece of software (an Office add-in package) on a user's machine, then appears as a new ribbon tab inside Excel, Word, and PowerPoint once installed. Because it's a genuine Office add-in rather than a web page embedded in a browser, it behaves like any other native Excel feature — its own ribbon, its own menus, functions that work inside regular Excel formulas.

## Shared connections: pointing Smart View at your environment

Once installed, Smart View needs to know which Fusion environment to talk to. This is configured through a **shared connection** — essentially a URL pointing at your organization's Oracle Fusion instance, provided by an administrator or found in the Fusion application's own settings. A user enters or selects this shared connection inside the Smart View ribbon, rather than typing a raw server address from scratch every time.

## Signing in and confirming the connection

With a shared connection configured, signing in uses the same Oracle Fusion credentials and the same security model covered back in lesson 4 — Smart View does not have its own separate login or its own separate security rules. Once signed in, a user should see the data sources they have access to (commonly including the GL balances cube that Financial Reporting Studio also reports against) available to connect to inside the Excel ribbon. A quick way to confirm the setup worked is connecting to a known data source and pulling back a single familiar balance before building anything more elaborate.

## Why this setup step matters

A consultant who skips understanding the shared-connection setup is the person who can't help a client troubleshoot "Smart View won't connect" during an actual engagement. Because Smart View relies on the exact same security model as everything else in this course, a connection failure is often a data security or duty role issue (lesson 4) rather than a Smart View-specific bug — the same troubleshooting instinct from lesson 6 applies here too.

## Recap

Smart View is an Office add-in, installed separately, connected to a Fusion environment through a shared connection URL, and signed into using the same Oracle Fusion credentials and security model as every other tool in this course. Next up, lesson 21: actually doing ad hoc analysis once that connection is live.
