# Script — Session Management for Web3 Apps

## Segment 1 (title)

Verify succeeding proves the user controlled that address at the moment they signed. It says nothing about the next request. HTTP is stateless — a session is the missing piece that ties later requests back to that proven identity.

## Segment 2 (code: server-side session)

After verify succeeds, the backend writes the address into a session store and sets a cookie. Its advantage is real, immediate revocation — delete the session, and the user is logged out on their next request.

## Segment 3 (code: JWT alternative)

A JWT bakes the address and an expiry into a signed token, nothing stored server-side. It scales without a shared store, but trades away real-time revocation — it's valid until it expires, full stop.

## Segment 4 (steps: Web3-specific invalidation)

A Web3 session has two extra triggers beyond logout: a wallet disconnecting, and a wallet switching accounts. Skip the second one and requests can appear to come from a new account's UI while still authorized as the old one.

## Segment 5 (outro)

Verification happens once; a session, and its expiry, is what carries it forward safely. Lesson 24 closes the chapter with a different backend-wallet problem: letting users transact without holding ETH for gas at all.
