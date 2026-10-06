# Dashboards

**Chapter 3 · Dashboards · Lesson 14 of 22**

A report answers one question at a time. A **dashboard** puts several reports' worth of answers on one screen, as charts, tables, and single numbers, so a manager can see the state of the business in one glance instead of opening report after report. This lesson is the tour: where dashboards live, what the builder looks like, and what a finished one actually delivers.

## What you'll learn

- How a dashboard relates to the reports underneath it
- Where dashboards live, organizationally (folders again)
- What the Dashboard Builder canvas looks like
- The basic building block: a widget, backed by a source report

## A dashboard is reports, visualized

Every number or chart on a dashboard — called a **component** or **widget** — is backed by a real report. The dashboard itself stores no data of its own; it's a saved arrangement of widgets, each pointing at a report, refreshed together whenever the dashboard runs. Change the underlying report and every dashboard using it updates automatically.

## Where dashboards live

Just like reports, every dashboard is saved into a **folder**, and that folder's sharing is what controls who can see it (Lesson 10's rules apply identically here). The Dashboards tab lists Recent, Created by Me, Private Dashboards, and All Dashboards down the left, with the same folder structure underneath.

## The Dashboard Builder

Click **Edit** on a dashboard (or **New Dashboard** to start one) and you land in the builder: a grid canvas with **+ Widget** and **+ Filter** buttons across the top, Save and Done to the right. Click + Widget and choose a type — Chart, Metric, Gauge, Table, or plain Text — then drag it into place on the grid. Every widget you add needs a source report before it can show anything.

## From report to component

Adding a chart widget means picking a report, choosing how to display it (bar, line, donut, funnel, and more), and the builder shows a **live preview** right there before you commit. This is the moment a report — something you'd otherwise have to go open and run — becomes a glanceable number or shape that updates itself every time the dashboard refreshes.

## Recap

- A dashboard is an arrangement of widgets, each one backed by a real report underneath.
- Dashboards live in folders and inherit the same sharing model as reports.
- The Dashboard Builder is a grid canvas — + Widget and + Filter are the two tools that shape it.
- Every widget needs a source report; change that report and the widget updates with it.

## Check yourself

A manager asks why a number on their dashboard looks wrong. Where should you actually go to investigate — the dashboard, or something else?
