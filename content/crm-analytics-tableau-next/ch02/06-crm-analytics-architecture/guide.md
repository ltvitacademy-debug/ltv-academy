# CRM Analytics Architecture

Chapter 1 gave you the wide-angle view of the ecosystem. From here on we zoom in on **CRM Analytics** itself. Before you build anything, you need a mental model of how the platform is put together, because almost every decision later, from refresh schedules to security to performance, follows from that structure.

## What you'll learn

- The end-to-end journey of data through CRM Analytics: connect, prepare, store, explore, share
- What Analytics Studio and Data Manager are each for
- How a dashboard widget actually gets its numbers
- Why architecture drives freshness, scale, and security

## The journey of data

Salesforce's own introductory material summarizes the platform in three ideas, which the diagram on the slide shows: **connect any data**, **explore and visualize**, and **share the story**.

1. **Connect.** Data is brought in from Salesforce objects and external sources. Common routes are Data Sync (for Salesforce objects), connectors to outside systems, CSV upload, and APIs.
2. **Prepare.** Raw data is cleaned, joined, and reshaped, with recipes in Data Prep or with the older dataflow tool. Both are covered in the next lessons.
3. **Store as a dataset.** The result is a dataset, held inside CRM Analytics in a compressed, indexed form built for fast aggregation. It is not a Salesforce object, and it does not appear in your object manager or in native reports.
4. **Explore and visualize.** Lenses and dashboards query datasets.
5. **Share.** Dashboards and lenses live in apps, and sharing is controlled at the app level. Users can also share to other places such as Chatter.

## Two places you will work

**Analytics Studio** is where people consume and build content: Home, Browse, and Favorites, plus a Create button. Its left navigation also links to the Learning Center, Data Manager, the Template Gallery, and Model Manager.

**Data Manager** is the operations side. You monitor data jobs, prepare datasets with recipes and dataflows, and manage connections there. When a dashboard looks stale, Data Manager's monitor view is where you go to see whether the last run succeeded.

Keeping these two roles separate helps. Studio is about the assets people look at. Data Manager is about the pipelines that feed them.

## How a widget gets its numbers

Every chart, number, or table on a CRM Analytics dashboard is powered by a **step**, which is a query against a dataset. The queries are expressed in a language called SAQL, and you will learn it in Chapter 3. For now the key idea is the chain:

Widget, then step (a query), then dataset. Nothing on a dashboard talks to Salesforce objects at view time. That is why dashboards can be fast and interactive, and also why their data is only as current as the dataset's last load.

## Why architecture matters

- **Freshness** depends on the schedule of the pipeline that builds each dataset.
- **Scale** benefits from the dataset format, which is why large data is a CRM Analytics strength.
- **Security** has to be designed on the dataset, because dataset data is copied out of the objects. Native record sharing does not automatically apply to it. Chapter 8 covers this properly.

## Recap

- Data moves connect, prepare, store as a dataset, explore, and share
- Analytics Studio is for consuming and building; Data Manager is for data pipelines
- Widgets run steps, which are queries against datasets
- Freshness, scale, and security all follow from this design

## Check yourself

A user asks why a field they can see in Salesforce is missing from a dashboard. Using the architecture above, where in the journey would you look first?
