# Script — A Simple Express Server

## Segment 1 (title)

Everything from this chapter comes together here: Node, npm, environment config, and now a real HTTP server with an actual on-chain route.

## Segment 2 (code: the minimal server)

Install express, create an app, register a route with app.get, and call app.listen on a port read from process.env.PORT with a fallback — the exact same environment-variable pattern from two lessons ago, just read on the server side instead of in a script.

## Segment 3 (code: a real balance route)

Add a route with an address segment in its path. req.params.address pulls that value out. Validate it with isAddress before ever touching the network — the same instinct from typing blockchain data structures and schema-validating config, just applied to HTTP input this time. Then call provider.getBalance and send the formatted result back as JSON.

## Segment 4 (steps: error-handling middleware)

An async route handler that throws doesn't automatically produce a clean response. Wrap the risky call in a try-catch and call next with the error. Register one final error-handling middleware, after every route, recognized by Express because it takes four arguments instead of three — it logs the error and sends a clean 500 with a JSON body, instead of hanging the request or crashing the whole server for every other request in flight.

## Segment 5 (outro)

Chapter 6 is done. The capstone starts next: putting every lesson since Chapter 5 together into one real, typed script that reads live blockchain data.
