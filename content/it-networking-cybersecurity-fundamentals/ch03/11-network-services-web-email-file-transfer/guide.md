# Lesson 11 — Network Services: Web, Email, File Transfer

**Chapter 3 · Ports, Protocols & Network Services · Lesson 11 of 32**

## What you'll learn

- How a web browser and server actually exchange an HTTP/HTTPS request and response
- How sending email (SMTP) and retrieving email (POP3/IMAP) are split into two different jobs
- How FTP, SFTP, and SMB move files, and what separates the secure options from the insecure one
- Why these exact services — web, email, file transfer — are the ones attackers target most

## Web traffic: a request, then a response

HTTP (port 80) and HTTPS (port 443) both follow the same basic pattern: the client sends a
**request** (a method like `GET` or `POST`, a resource path, and headers), and the server sends
back a **response** (a status code like `200 OK` or `404 Not Found`, headers, and the actual
content). HTTPS wraps that exact same exchange inside a TLS-encrypted tunnel, so a party
intercepting the traffic sees only ciphertext, not the request or the response itself. The
difference between HTTP and HTTPS isn't a different conversation — it's the same conversation,
with or without a locked envelope around it.

## Email: sending and retrieving are two different jobs

Email is often misunderstood as one protocol, but it's actually two separate jobs handled by
different protocols. **SMTP** (Simple Mail Transfer Protocol, port 25) is the protocol that
*sends* mail — it's how your mail server hands a message off to the recipient's mail server, and
it's also how mail servers relay messages to each other across the internet. Retrieving mail you've
already received is a completely different job, handled by **POP3** (port 110) or **IMAP** (port
143). POP3 downloads messages to one device, typically removing them from the server afterward;
IMAP instead keeps the mailbox synced across every device you check it from, which is why IMAP is
the default in almost every modern mail client.

## File transfer: FTP, SFTP, and SMB

**FTP** (File Transfer Protocol, ports 20/21) moves files between a client and server, but it
sends everything — including login credentials — in plaintext, which is why it's considered
insecure on any untrusted network today. **SFTP** (SSH File Transfer Protocol) does the same job
but tunnels it through SSH's encryption, so credentials and file contents are protected in
transit; it's the secure replacement most organizations use in FTP's place. **SMB** (Server
Message Block, port 445) is Windows' native file and printer sharing protocol — it's how a mapped
network drive actually works under the hood, and it's also one of the most frequently targeted
protocols for lateral movement once an attacker is already inside a network.

## Why these specific services get attacked the most

Web, email, and file transfer aren't just common services — they're the services every
organization exposes to the widest possible audience, which makes them the largest attack
surface by far. Web applications accept input from anyone on the internet, which is exactly what
makes injection and cross-site scripting attacks possible (covered in Chapter 6). Email is the
single most common delivery mechanism for phishing and malware attachments, because it's designed
to let strangers send you a message with one click. File-sharing protocols like SMB get targeted
for lateral movement because, once an attacker has one foothold, SMB is often how they reach
every other machine on the same network — exactly how ransomware worms like WannaCry spread in
2017.

## Key terms

| Term | Meaning |
|---|---|
| HTTP/HTTPS | Web request-response protocol; HTTPS wraps the same exchange in TLS encryption |
| SMTP | Sends and relays email between mail servers (port 25) |
| POP3 / IMAP | Retrieve already-sent email — POP3 downloads to one device, IMAP syncs across devices |
| SFTP | SSH-encrypted file transfer; the secure replacement for plaintext FTP |

## Check yourself

Why does sending an email (SMTP) require a completely different protocol from retrieving one
(POP3 or IMAP), rather than one protocol handling both directions?
