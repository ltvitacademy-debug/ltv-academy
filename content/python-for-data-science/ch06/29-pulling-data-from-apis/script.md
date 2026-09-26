# Script — Pulling Data From APIs

Not all data sits in files or databases. Weather, exchange rates, public records, and company systems are often available through an API, a web address that returns data instead of a web page. In this lesson you'll pull data from one and turn it into a DataFrame.

We'll use JSONPlaceholder, a free public practice API that needs no account or key and returns made-up data. With the requests library, call get on the address. Set a timeout so your code never hangs. The status code 200 means success, and the json method turns the response body into Python lists and dictionaries. Here we get a list of ten users.

That list of nested dictionaries is exactly what json normalize was made for. One call flattens it into a DataFrame, with nested fields like address city becoming their own columns. Now everything from the pandas chapters applies: filter, group, merge, clean.

APIs usually limit how much they return at once, so you request data in pages. Pass query parameters with the params dictionary rather than building the address by hand. Loop over the pages, call raise for status so any failure stops the loop loudly, collect each page into a list, and combine them with concat. Three pages of ten gave us thirty posts.

Be a good API citizen. Check the status code: a 404 means not found, and a 401 or 403 means you're not allowed. Always set a timeout. Respect rate limits, which many APIs enforce by returning 429, too many requests, so pause between calls. Read the provider's terms, and save responses to disk so you don't ask twice.

Some APIs need a key. Never type it into your notebook or commit it to a repository. Read it from an environment variable and send it in a header. This snippet is illustrative, since it needs an account. And avoid paid services until you understand the costs, since some bill per request.

Next up, Lesson 30: web scraping basics.
