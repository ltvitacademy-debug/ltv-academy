# Lesson 10 — Connecting to Web, JSON & REST API Data

**Chapter 2 · Connecting to Data · Lesson 5 of 6**

## What you'll learn

- How the Web connector turns a web page's tables into Power BI tables
- The five authentication types, including the one built for REST APIs
- How to reach a JSON file (or API response) with the exact same connector
- When to reach for Advanced instead of Basic

## The same connector, three different jobs

The Web connector handles more ground than its name suggests: ordinary web
pages, JSON files, and REST APIs all go through it. Start simple — **Basic**
mode just wants a URL:

![Screenshot of the From Web dialog in Basic mode with a Wikipedia URL entered.](/courses/power-bi/ch02/10-connecting-to-web-json-rest/web-basic-url.png)
*Basic mode: one field, one URL. This example points at a Wikipedia page listing U.S. states.*

## Authentication, including one built for APIs

First connection to a new site, Power BI asks how to authenticate:

![Screenshot of the Access Web content dialog with Anonymous, Windows, Basic, Web API, and Organizational account options listed.](/courses/power-bi/ch02/10-connecting-to-web-json-rest/web-credentials.png)
*Five options. Web API — built specifically for sites that authenticate with an API key — is the one that matters most once you start working with real REST APIs.*

| Method | Use it when |
|---|---|
| Anonymous | The page or API needs no credentials at all |
| Windows | It requires your Windows login |
| Basic | It requires a plain username and password |
| Web API | It authenticates with an API key |
| Organizational account | It requires your work/school account sign-in |

Once you set a method for a site's address, every page under that same
address reuses it — you won't be asked again.

## Landing in Navigator — with a web-page twist

For a page with tables, Navigator lists every table it found, and offers a
**Web View** tab so you can see exactly where each one came from on the page:

![Screenshot of the Navigator dialog with a list of detected HTML tables on the left and a preview of the selected "States of the United States of America" table on the right.](/courses/power-bi/ch02/10-connecting-to-web-json-rest/web-navigator.png)
*22 tables detected on one Wikipedia page. Table View shows the data; Web View (the other tab) highlights where each table sits on the actual page — useful when it's not obvious which one you want.*

## Reaching a JSON file — or an API endpoint

Point the exact same connector at a `.json` URL instead of a web page, and
Power BI treats it as structured data automatically:

![Screenshot of the From Web dialog in Basic mode with a URL to a JSON file entered.](/courses/power-bi/ch02/10-connecting-to-web-json-rest/web-json.png)
*Same Basic dialog, a JSON URL instead of a page. Power BI wraps the response as a JSON document and hands it to Power Query automatically — no separate "JSON mode" to find.*

A REST API endpoint that returns JSON works exactly the same way: the URL
just happens to be an API call instead of a static file.

## When you need Advanced instead

Switch to **Advanced** when a single URL box isn't enough — building a URL
from separate pieces, adding request headers, or extending how long Power BI
waits for a response:

![Screenshot of the From Web dialog in Advanced mode, showing URL parts, a URL preview, a command timeout field, and HTTP request header parameters.](/courses/power-bi/ch02/10-connecting-to-web-json-rest/web-advanced-url.png)
*URL parts let you assemble a URL from pieces (handy with parameters, in Chapter 3). Request headers are where an API key often actually gets sent — check the specific API's documentation for what it expects.*

## Key terms

| Term | Meaning |
|---|---|
| Basic mode | The simple From Web dialog: one URL field |
| Advanced mode | URL assembly, command timeout, and HTTP request headers |
| Web API auth | Authentication type built for sites/APIs using an API key |
| Web View | Navigator's tab showing where each detected table sits on the actual page |

## Lab

1. Open **Get data > Web**, choose Basic, and enter a URL to any public page
   that contains at least one table (a Wikipedia article works well).
2. In Navigator, switch between Table View and Web View to see how they
   relate to each other.
3. Try pointing the Web connector at a JSON URL (a public API's endpoint, or
   any `.json` file link) and notice you use the exact same dialog.

## Check yourself

You're ready for Lesson 11 when you can explain why the Web connector works
for a Wikipedia page, a JSON file, and a REST API — using the same dialog
for all three.
