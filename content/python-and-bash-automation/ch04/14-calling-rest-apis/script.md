# Script — Calling REST APIs

## Segment 1 (title)

Northbridge Retail's fulfillment team doesn't want to log into the carrier's web portal every morning just to check shipment status. The carrier exposes that data through a REST API, and in this lesson you'll use Python's requests library to call it — sending GET and POST requests, checking status codes, and reading paginated results.

## Segment 2 (code)

A GET request reads data without changing anything, so filtering happens through query parameters, not the body. Pass a dictionary to the params argument and requests builds the query string for you. Setting a timeout matters too — without one, a hung connection to the carrier can block your script indefinitely. Call raise_for_status right after, so a bad response from the carrier raises an exception instead of silently handing you garbage.

## Segment 3 (code)

A POST request creates or changes something — here, registering a new shipment — so the data belongs in a JSON body instead of the URL. Passing a dictionary to json= serializes it and sets the content type header automatically, saving you from building that string by hand. Checking the response afterward still matters, since the carrier can reject a request even when your Python code runs fine and the HTTP call itself succeeds.

## Segment 4 (steps)

The carrier never returns every shipment in one response — it caps each page and includes a next link when more exist. The safe pattern is a loop: request the current page, extend your results list with what came back, and keep following next until the API tells you there isn't one left.

## Segment 5 (outro)

You've made real API calls now — GET for reading, POST for writing, status codes for catching failures, and a pagination loop for complete results. Next up, lesson fifteen: authenticating those calls properly instead of assuming the carrier's API is open to anyone who asks.
