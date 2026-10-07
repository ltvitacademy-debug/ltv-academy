# Script — HTTP & HTTPS

## Segment 1 (title)

Almost every page a shopper sees, and almost every call one service makes to another, happens over HTTP — the request-response protocol that rides on top of TCP. HTTPS is that same protocol wrapped in encryption.

## Segment 2 (steps)

The shape never changes. A client sends a request: a method, a path, and some headers. That travels over the TCP connection already established. The server processes it and sends back a response: a status code, its own headers, and usually a body with the actual content.

## Segment 3 (steps)

A handful of methods cover nearly everything. GET retrieves something, like a product page. POST creates something, like a new order. PUT, PATCH, and DELETE update or remove something. And the response's status code tells you the outcome at a glance — 200 for success, 404 when nothing exists at that path, 500 when the server itself errored out.

## Segment 4 (code)

Stripped down, a request is just a few lines of text: the method and path, then headers like Host and User-Agent. The response that comes back starts with its status line, then its own headers, then the content. HTTPS sends that exact same text — same methods, same status codes — but encrypted inside a TLS tunnel first, so anyone intercepting it sees only ciphertext.

## Segment 5 (outro)

That's why anything collecting a password or payment detail has to run on HTTPS, never plain HTTP. Up next, lesson fourteen: TLS and certificates, which is what actually makes that encryption — and that trust — possible.
