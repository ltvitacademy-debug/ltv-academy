# Script — TLS & Certificates

## Segment 1 (title)

HTTPS wraps an HTTP exchange inside an encrypted tunnel, but that only explains half the picture. TLS is what actually builds that tunnel and makes sure the browser is talking to the right server in the first place.

## Segment 2 (steps)

The handshake happens before any HTTP data moves. The browser sends a hello listing the encryption methods it supports. The server replies with its own hello and its certificate, which carries its public key and identity. The browser verifies that certificate against a trusted authority, and then both sides use it to agree on a shared key for the rest of the session.

## Segment 3 (steps)

Encrypting a connection to the wrong server protects nobody, so the browser checks three things before trusting it. The certificate has to be signed by a Certificate Authority the browser already trusts. The domain on the certificate has to match the site actually being visited. And the certificate can't be expired. Fail any of those, and the browser warns instead of connecting quietly.

## Segment 4 (code)

A certificate itself is a small, structured document, not a password. It lists the domain it was issued for, the issuer who vouches for it, an expiration window, and the public key tied to that domain's private key.

## Segment 5 (outro)

Put it together: TCP gets a reliable connection open, TLS encrypts it and verifies identity, and HTTP carries the actual request and response inside. That's the full picture behind every secure page load. With the core protocols covered, the course moves on to the next chapter.
