# Script — Authentication & Tokens

## Segment 1 (title)

Northbridge Retail's checkout service needs to call their payment processor's API to check transaction status, but that API won't answer anonymous requests. In this lesson you'll cover the three forms that proof takes in practice: a static API key, a bearer token, and a full OAuth2 client-credentials flow where your script requests its own temporary token.

## Segment 2 (code)

An API key is a long-lived secret sent in a header to identify the caller — nothing more. A bearer token rides in the Authorization header using the Bearer scheme, and it's usually short-lived, issued to you by the API rather than assigned once. Either way, that value comes from an environment variable, never a literal string in your source code.

## Segment 3 (code)

PaymentPro doesn't hand Northbridge a permanent key. Instead, Northbridge trades a client ID and client secret for a short-lived access token by posting to an OAuth token endpoint with grant type client credentials. Both the ID and secret are read from environment variables, and the response hands back the token along with how many seconds until it expires.

## Segment 4 (steps)

Requesting a brand-new token on every single call would work, but it's wasteful and eventually gets you rate-limited. The fix is a cache: store the token and its expiry timestamp in memory, reuse it on every call that comes in while it's still valid, and refresh it a little before the real expiry so a request never gets caught using a dead token.

## Segment 5 (outro)

API keys and bearer tokens both travel in a header, but a token issued through client-credentials needs to be cached and refreshed instead of hardcoded. Keep every credential in an environment variable, exactly like lesson twelve covered. Next up, lesson sixteen: using a cloud SDK instead of hand-rolling REST calls like these.
