# curl, netstat & ss

The previous lesson covered checking reachability and DNS. This one moves a layer up — once a host responds to ping, is the actual service answering correctly, and what's listening locally on the machine itself?

## What you'll learn

- What curl actually shows beyond "the page loaded"
- How netstat and ss reveal which ports are listening and which connections are active
- Reading an HTTP status code and response headers as a troubleshooting signal
- Why "the server pings but the app doesn't work" is such a common failure shape

## curl: talking to the application directly

Where ping only tests whether a host responds to ICMP, curl makes an actual HTTP request and shows the real response — status code, headers, and body — exactly as the application returned it, with none of a browser's rendering or caching in the way. Running curl against checkout.northbridgeretail.com with the verbose flag shows the full request going out and the full response coming back, which is often the fastest way to tell "the network is fine but the application is returning an error" from "the application is fine but something else is broken."

## Reading a curl response

A 200 status code means the request succeeded. A 404 means the specific path doesn't exist on an otherwise-working server. A 500 means the server itself hit an internal error while trying to handle a request it did receive. A connection that times out or gets refused outright means the problem is lower than the application — network or firewall territory, back to the previous chapter's tools.

| Status | Meaning |
|---|---|
| 200 | Request succeeded |
| 404 | Path not found on a working server |
| 500 | Server-side error handling the request |
| Connection refused / timeout | Never reached the application at all |

## netstat and ss: what's listening, right here

curl tests a connection from the outside. netstat and ss answer a related question from inside the machine itself: which ports is this server actually listening on, and which connections are currently open? ss is the modern, faster replacement for the older netstat command, and on most current Linux systems it's the one actually installed, though the two produce very similar output. Running either on Northbridge Retail's checkout server can confirm whether the application is actually bound to port 443 at all — if nothing is listening there, no firewall rule or load balancer configuration will ever make it reachable.

## A common failure shape

One of the most common troubleshooting situations is a server that responds fine to ping but refuses every connection to the actual application port. ping succeeds because the host answers ICMP; curl to the app fails because nothing is listening on that port, or a local firewall rule is blocking it specifically. Checking with ss on the server itself usually settles the question immediately: either the process isn't running and isn't bound to the port, or it is, and the problem is somewhere else — back out to the network.

## Key terms

| Term | Meaning |
|---|---|
| curl | A command-line tool that makes an actual HTTP request and shows the raw response |
| HTTP status code | A three-digit code in the response indicating success, client error, or server error |
| ss | A modern command showing which sockets are listening and which connections are active |
| netstat | An older command with the same basic purpose as ss, still common on many systems |
