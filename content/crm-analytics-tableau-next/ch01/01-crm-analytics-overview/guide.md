# CRM Analytics, Overview

You finished the native Reports & Dashboards course knowing exactly where standard Salesforce reporting runs out of road: very large data volumes, blending in data from outside Salesforce, deep interactive exploration, and calculations that the report builder simply cannot express. **CRM Analytics** is Salesforce's own answer to that ceiling. This lesson gives you the map of what it is, where it lives, and what its building blocks are, before we go deep on any one of them.

## What you'll learn

- What CRM Analytics is, and how it differs from the Reports tab you already know
- The four core assets: datasets, lenses, dashboards, and apps
- Where to find everything in Analytics Studio
- The product's naming history, so old documentation doesn't confuse you

## A separate analytics platform inside your org

Native reports query your Salesforce records live, straight from the objects. CRM Analytics works differently. It is a distinct analytics platform that runs alongside your org and appears inside Salesforce, and it does its work on **datasets**: copies of data that have been extracted, prepared, and stored in a format built for fast aggregation and exploration. The data is loaded on a schedule, not queried live from your objects each time someone opens a page.

That one design choice explains most of what makes CRM Analytics different. Because datasets are precomputed and optimized for analysis, the platform can handle far more data, and far more interactive slicing, than a live report can. It also means datasets can combine Salesforce data with data from other systems. The trade-off is that dataset data is only as fresh as its last refresh, which is why scheduling comes up so often in later lessons.

## Analytics Studio

Analytics Studio is the home base. Its left navigation gives you Home, Browse, and Favorites, plus links to tools such as Data Manager. The **Browse** page lets you filter every asset in the platform by type: apps, dashboards, components, reports, lenses, models, datasets, folders, and templates. If you can find a thing here, you can open it, and if you have the right permissions, you can build a new one from the Create button.

## The four assets to know

| Asset | What it is |
|---|---|
| **Dataset** | Prepared data stored in CRM Analytics, the raw material for everything else |
| **Lens** | A quick, saved exploration of a single dataset |
| **Dashboard** | A page of interactive widgets (charts, numbers, tables, filters) built on datasets |
| **App** | A folder-like container that holds related assets and controls who can see them |

Sharing works at the **app** level, much like folders in native reports, so app design is a real part of governing a deployment.

## A note on names

This product has been renamed several times. It began as Wave Analytics, became Einstein Analytics, then Tableau CRM, and is now called CRM Analytics. Many Trailhead module URLs and older blog posts still say "wave". They describe the same product family. Salesforce is also actively steering new investment toward Tableau Next and Data 360 (formerly Data Cloud), which the next lessons cover, so treat any product name as a snapshot and check the current release notes before relying on it.

## Licensing, briefly

CRM Analytics is generally licensed separately from core Sales Cloud or Service Cloud. Exact license names and bundles change over time, so confirm with your Salesforce account team or current documentation rather than assuming.

## Recap

- CRM Analytics is a separate analytics platform that works on prepared, stored datasets, not live queries
- The core assets are datasets, lenses, dashboards, and apps, all found in Analytics Studio
- Apps are the unit of sharing
- Names have changed repeatedly, so verify against current documentation

## Check yourself

A colleague says the numbers in a CRM Analytics dashboard are a few hours behind the Opportunity records in Salesforce. Given how the platform works, what is the most likely explanation?
