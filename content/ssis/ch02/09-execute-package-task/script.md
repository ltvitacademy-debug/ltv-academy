# Script — Execute Package Task

## Segment 1 (title)

The Execute Package Task lets a package run another package as part of
its own workflow. Let's look at why you'd actually want to do that, and
how the two packages relate.

## Segment 2 (steps: parent calls child)

The package containing the Execute Package Task is the parent package;
the package it runs is the child package. On the task itself, the
ReferenceType property decides how it finds that child — Project
Reference, if the child lives in the same project, or External
Reference, if it's stored in the SQL Server msdb database or out on the
file system. Once it runs, the child package can execute in the
parent's own process, or in a separate process entirely — that's the
ExecuteOutOfProcess property — and either way, logging details and, if
you've set it up, an active transaction both flow back up to the
parent.

## Segment 3 (steps: reasons to break workflow apart)

Why bother splitting a package up at all? Three real reasons. It
simplifies workflow — building one package per dimension table instead
of one giant package loading a whole star schema at once is dramatically
easier to read and test. It enables reuse — a shared extraction package
can be called from several different parent packages. And it improves
security — you can grant a package author access to just the packages
relevant to their work, instead of one all-or-nothing package.

## Segment 4 (outro)

Parent and child packages, connected by one task — that's the whole
pattern. Next lesson, we look at the two looping containers: For Loop
and Foreach Loop, for repeating a control flow a fixed number of times
or once per item in a collection.
