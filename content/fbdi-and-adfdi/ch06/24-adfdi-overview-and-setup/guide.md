# ADFdi Overview and Setup

Chapters 1 through 5 covered FBDI from every angle. Chapter 6 turns to the other tool named in this course's title: ADF Desktop Integration, or ADFdi. This lesson introduces what it actually is, how it's installed, and how its whole approach differs from everything you've learned so far.

## What you'll learn

- What ADFdi actually is, in plain terms
- How it differs structurally from the FBDI pipeline
- How to install the Excel add-in it depends on
- The prerequisites that have to be in place before it works

## What ADFdi actually is

Application Development Framework Desktop Integration extends Oracle's underlying application framework into Microsoft Excel, letting a live Fusion page talk directly to a spreadsheet. In practice, this means a user can open a "Create ___ in Spreadsheet" action from inside an Oracle Fusion work area — Journals, Payables Invoices, and others — and get a specially prepared Excel workbook that is, itself, a connected client to that live page: it can download existing data, accept new or edited rows, and upload them back with the same validation the web page would apply, all without the user leaving Excel.

## How this differs from FBDI's structure

Recall FBDI's pipeline: template, CSV, ZIP, UCM, two separate scheduled processes, interface tables as a staging area. ADFdi skips nearly all of that. There's no ZIP file, no UCM upload, no separate "load" step followed by a separate "import" step. The spreadsheet talks to the application directly, and validation happens close to the moment of upload rather than hours later in a scheduled process report. This is the structural reason ADFdi suits smaller, more interactive batches — there's no staging layer built to absorb and queue tens of thousands of rows the way FBDI's interface tables are.

## Installing the Excel add-in

ADFdi depends on an Excel add-in that has to be installed on the user's machine before any "Create ___ in Spreadsheet" action will work. From the Fusion navigator, under Tools, there's a **Download Desktop Integration** option that provides the installer — commonly distributed as an MSI file for the current user. Running that installer adds the ADFdi ribbon and the underlying connectivity Excel needs to talk to Oracle Fusion.

## Prerequisites that have to be in place

Beyond the installer itself, a few things commonly need to be true for ADFdi to work smoothly: a supported version of Microsoft Excel, macros enabled (ADFdi's upload and validation logic runs through them, same root cause as the CSV-generation macro from Chapter 2), and the add-in's components trusted rather than blocked by Excel's security or Protected View settings. Skipping any of these doesn't usually produce a clear error message right away — it tends to show up as a missing ribbon, a grayed-out action, or an upload that silently does nothing, which is exactly the kind of problem covered in lesson 27.

## Recap

ADFdi connects Excel directly to a live Oracle Fusion page, skipping FBDI's staging pipeline entirely, which makes it suited to smaller, more interactive data entry. It depends on an Excel add-in installed through Download Desktop Integration, with the same kind of macro and security prerequisites that tripped up CSV generation earlier in this course. Next up, lesson 25: uploading journals with ADFdi, the first hands-on application of this tool.
