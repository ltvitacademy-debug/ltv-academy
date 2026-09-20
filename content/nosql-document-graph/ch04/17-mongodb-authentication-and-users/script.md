# Script — MongoDB Authentication & Users

## Segment 1 (title)

Chapter Three finished with performance. Chapter Four turns to securing and administering the server itself, starting with the single most important fact in this lesson: a fresh MongoDB install has authentication disabled by default.

## Segment 2 (code: the default-off gotcha)

Start mongod with no extra flags, connect with mongosh, and you get instant full read and write access — no username, no password. This isn't a bug, it's the historical default for frictionless local development, but it's also a real, well-documented cause of exposed databases left reachable on the open internet.

## Segment 3 (code: first user, then enabling auth)

Because auth starts off, you create your first administrative user while it's still disabled, using passwordPrompt so the password never lands in shell history. Then you enable authentication, either with the --auth flag or, more commonly in production, security colon authorization colon enabled in mongod.conf.

## Segment 4 (code: connecting once auth is on)

After restarting, every connection must authenticate, and you specify which database to check credentials against with --authenticationDatabase. The mechanism underneath is SCRAM — Salted Challenge Response Authentication Mechanism — SCRAM-SHA-256 by default since MongoDB 4.0, which proves identity without ever sending the password itself over the wire.

## Segment 5 (outro)

Authentication answers "who are you." Next up: role-based access control answers the next real question — now that MongoDB knows who you are, what exactly should you be allowed to do.
