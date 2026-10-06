# Lesson 7 — Making Your First GET Request · Voiceover script

Segments map 1:1 to slides. Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 7 of 19.

---

## S1 · TITLE CARD

Every GET request has the same three pieces: the method, the full URL, and a set of headers. Put those three together correctly and Oracle Fusion sends back data; get one wrong and you get an error instead.

## S2 · STEPS CARD

The method is GET, which only reads data and never changes anything. The URL is the full resource path — pod hostname, fscmRestApi, the version, and the resource name. The headers carry Authorization, so Fusion knows who's asking, and Accept: application/json, so it answers in JSON instead of another format.

## S3 · CODE CARD

Here's a real GET call written as curl, a common command-line tool for testing APIs. The dash-u flag sends Basic Authentication — username and password — and the Accept header asks for JSON back. The limit parameter caps the response at five records, which the next lesson covers in depth.

## S4 · CODE CARD

What comes back is a JSON object, not just a bare list. The actual invoice records sit inside an items array. Alongside them, count, hasMore, limit, and offset describe the page of data you got — hasMore being true means there are more records beyond this page. A links array also comes back, pointing to related resources.

## S5 · OUTRO CARD

Method, URL, headers, and a response shaped around items plus paging metadata — that's a complete GET request and response. Next lesson, we use q, finder, and the paging parameters to get back exactly the records you actually need.
