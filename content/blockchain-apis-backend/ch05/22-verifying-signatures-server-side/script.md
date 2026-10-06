# Script — Verifying Signatures Server-Side

## Segment 1 (title)

It's tempting to think verification is just recovering the address from the signature. That's necessary but not sufficient — the message's fields are what make SIWE safe, and none of that matters if the server never checks them.

## Segment 2 (code: the real verify API)

The siwe library's verify does both halves at once. It resolves to success, data, and error. Passing the server's own session nonce is what connects the check back to the login attempt it was actually issued for.

## Segment 3 (steps: three things it confirms)

The signature recovers to the claimed address. The nonce matches what the server issued. The domain in the message matches this server. Each is a distinct failure mode — valid signature alone covers none of the other two.

## Segment 4 (code: what skipping the nonce check costs)

A backend that checks the signature and domain but never checks the nonce against anything server-issued lets a signed message get replayed indefinitely by anyone who ever saw it. The nonce is what turns a signature into a one-time credential.

## Segment 5 (outro)

Verification proves the user controls that address, once. It doesn't by itself keep them logged in. Lesson 23 covers turning that into an actual session.
