# HTTP & HTTPS

Almost every page a shopper sees on northbridgeretail.com, and almost every call one internal service makes to another, happens over HTTP: the request-response protocol that runs on top of TCP. HTTPS is that same protocol with an encryption layer wrapped around it. Understanding the plain-text shape of an HTTP exchange makes it much easier to reason about what HTTPS is actually protecting, and why.

## What you'll learn

- The basic request-response shape of HTTP, and why it rides on top of TCP
- The common HTTP methods and status codes you'll see constantly in practice
- What HTTPS actually adds on top of plain HTTP, and why that addition matters
- How to read a raw HTTP request and response block

## The request-response shape

HTTP is deliberately simple: a client sends a **request** — a method, a path, and a set of headers — and the server sends back a **response** with a status code, its own headers, and (usually) a body. Every page load, every image fetch, and every API call a browser makes to northbridgeretail.com is one of these exchanges, often dozens of them per page. Because HTTP rides on top of TCP, the three-way handshake and reliable delivery from the previous lesson already happened before a single HTTP byte is sent.

## Methods and status codes

A handful of HTTP methods cover nearly everything a web application does: **GET** retrieves something (loading a product page), **POST** creates something (submitting a new order), **PUT** or **PATCH** update something (editing a saved shipping address), and **DELETE** removes something (clearing an item from a saved wishlist). The server's response always starts with a three-digit status code that tells the client, at a glance, what happened: **200** means success, **301**/**302** mean "look somewhere else instead," **404** means "nothing exists at that path," and **500** means the server itself hit an error trying to handle the request.

## What HTTPS actually adds

Plain HTTP sends everything — the request, the headers, the response body — as readable text over the network. Anyone positioned between the shopper and Northbridge Retail's server, such as on a shared coffee-shop Wi-Fi network, could read a plain HTTP exchange in full, including anything typed into a form. HTTPS solves this by wrapping the entire HTTP exchange inside a **TLS** encrypted tunnel (the subject of the next lesson) before any of it leaves the device. The request and response still have exactly the same shape — same methods, same status codes — but everything is encrypted in transit, so an eavesdropper sees only unreadable ciphertext. That's why a checkout form, a login page, or anything collecting a password must run on HTTPS, never plain HTTP.

## Reading a raw exchange

Stripped down, a request to view a product on Northbridge Retail's site looks like a short block of text: the method and path on the first line, followed by headers like `Host` and `User-Agent`. The response that comes back starts with the status line, followed by its own headers like `Content-Type`, and then the actual page content. Seeing this raw shape makes status codes and headers far less abstract — they're just lines of text traveling inside that TCP connection.

## Key terms

| Term | Meaning |
|---|---|
| HTTP | The request-response protocol browsers and apps use to talk to web servers |
| HTTPS | HTTP sent inside an encrypted TLS tunnel |
| Status code | A three-digit number in an HTTP response indicating the outcome (e.g. 200, 404, 500) |
| Method | The action a request is asking for — GET, POST, PUT, PATCH, or DELETE |
