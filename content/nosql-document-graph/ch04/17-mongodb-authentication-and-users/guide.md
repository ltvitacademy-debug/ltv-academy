# MongoDB Authentication & Users

Chapter Three finished with performance: reading query plans, knowing when an index is
doing its job. Chapter Four turns to a different DBA responsibility — securing and
administering the server itself, starting with the single most important fact in this
lesson: a fresh MongoDB install has **authentication disabled by default**. Anyone who can
reach the port can read and write everything, with no username or password required, until
you turn authentication on yourself.

## What you'll learn

- Why authentication is off by default on a new MongoDB install, and why that matters
- How to create the first user and enable authentication safely
- SCRAM, MongoDB's default authentication mechanism

## The default-off gotcha

Install MongoDB, start `mongod` with no extra flags, and connect with `mongosh` — no
credentials asked, full read/write access. This isn't a bug; it's the historical default,
meant to make local development frictionless. It is also a real, well-documented cause of
exposed databases: MongoDB instances left reachable on the public internet with
authentication never turned on have been a recurring, real-world security story for years.
The lesson for a DBA: authentication is something you must deliberately enable, on every
instance, before it goes anywhere near a network you don't fully control.

## Creating the first user and enabling auth

Because auth starts disabled, you create your first administrative user *while it's still
off*, then turn auth on:

```
use admin
db.createUser({
  user: "dbAdmin",
  pwd: passwordPrompt(),
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
})
```

`passwordPrompt()` interactively prompts for a password rather than putting it in plain
text in your shell history — the safer real-world habit. Then enable authentication, either
as a startup flag:

```
mongod --auth
```

or, more commonly in production, as a setting in `mongod.conf`:

```
security:
  authorization: enabled
```

After restarting with authentication enabled, every connection — including local ones —
must authenticate:

```
mongosh -u dbAdmin -p --authenticationDatabase admin
```

`--authenticationDatabase` matters: MongoDB users are created *in* a specific database
(the `admin` database, by convention, for administrative users), and you must tell
`mongosh` which database to check credentials against.

## Application users and SCRAM

Administrative users aside, day-to-day application access uses its own narrower users,
created the same way but scoped to the databases they actually need:

```
use salesDB
db.createUser({
  user: "salesApp",
  pwd: passwordPrompt(),
  roles: [{ role: "readWrite", db: "salesDB" }]
})
```

The mechanism behind all of this is **SCRAM** (Salted Challenge Response Authentication
Mechanism) — MongoDB's default authentication protocol since version 3.0, using
`SCRAM-SHA-256` by default since version 4.0. The password itself is never sent over the
wire; the client and server exchange salted, hashed challenge-response values instead. This
is conceptually the same goal as SQL Server's login authentication — prove identity without
exposing the credential — implemented with a different, industry-standard protocol.

## Key terms

| Term | Meaning |
|---|---|
| `security.authorization` | The `mongod.conf` setting that enables authentication (`enabled`/`disabled`) |
| `db.createUser()` | Command that creates a MongoDB user, scoped to the database it's run in |
| SCRAM | Salted Challenge Response Authentication Mechanism — MongoDB's default auth protocol |
| `--authenticationDatabase` | Tells the client which database to check credentials against on login |
| `passwordPrompt()` | Interactively prompts for a password instead of exposing it in shell history |

## Check yourself

A teammate spins up a new MongoDB instance for a quick prototype, connects with `mongosh`
with no username or password, and it just works. Why does that happen by default, and what
real-world risk does this lesson say it creates?
