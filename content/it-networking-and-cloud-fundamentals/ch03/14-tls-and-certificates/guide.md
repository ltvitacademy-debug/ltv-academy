# TLS & Certificates

The previous lesson said HTTPS wraps an HTTP exchange inside an encrypted tunnel, without explaining how that tunnel gets built or why a browser trusts it in the first place. Both answers come from TLS — Transport Layer Security — and the certificates that make it work. This lesson closes out the chapter by connecting encryption and trust into one picture.

## What you'll learn

- What problem TLS actually solves, beyond "it encrypts things"
- The basic shape of a TLS handshake and what it accomplishes before any data is encrypted
- What a certificate actually contains, and who a Certificate Authority is
- How a browser decides whether to trust a certificate at all

## What TLS actually solves

Encrypting traffic is only half the problem. Even if every byte between a shopper's browser and a server is scrambled, that's worthless if the shopper is actually talking to an impostor server pretending to be northbridgeretail.com. TLS solves two problems together: it encrypts the connection so eavesdroppers can't read it, and it verifies the identity of the server the browser is actually connecting to, so the encryption is protecting a conversation with the right party in the first place.

## The TLS handshake, at a high level

Before any HTTP data moves, the browser and server perform a TLS handshake on top of the TCP connection that was already established:

1. **Client Hello** — the browser says hello and lists which encryption methods it supports.
2. **Server Hello + certificate** — the server picks an encryption method and sends back its certificate, which contains its public key and identity information.
3. **Verification** — the browser checks that certificate against a trusted Certificate Authority before going any further.
4. **Key exchange** — the two sides use the certificate's public key to agree on a shared secret key, which both can use to encrypt the rest of the session efficiently.

Once that's done, every subsequent byte of the HTTP request and response from the previous lesson travels encrypted inside this now-established tunnel.

## What's actually inside a certificate

A certificate is a small, structured document, not just a password. It contains the domain it was issued for, an expiration date, the issuer who vouches for it, and a public key tied to that domain's private key. For northbridgeretail.com, the certificate's subject would list the domain itself, and its issuer would be a Certificate Authority (CA) — a trusted organization whose entire job is verifying that whoever requested the certificate actually controls that domain before signing off on it.

## Why the browser trusts any of this

Browsers and operating systems ship with a built-in list of trusted Certificate Authorities. When a server presents its certificate, the browser checks that it was signed by one of those trusted CAs (directly or through a chain), that the domain in the certificate matches the site being visited, and that it hasn't expired. If any of those checks fail — an expired certificate, a mismatched domain, or a CA the browser doesn't recognize — the browser shows a warning instead of silently connecting, because encrypting a connection to an unverified party doesn't actually protect anyone.

## Key terms

| Term | Meaning |
|---|---|
| TLS | Transport Layer Security — the protocol that encrypts a connection and verifies server identity |
| TLS handshake | The setup exchange that negotiates encryption and verifies the certificate before data flows |
| Certificate | A signed document containing a domain's identity and public key, issued by a CA |
| Certificate Authority (CA) | A trusted organization that verifies domain ownership and signs certificates |
