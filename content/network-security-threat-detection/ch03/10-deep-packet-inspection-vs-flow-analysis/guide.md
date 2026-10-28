# Lesson 10 — Deep Packet Inspection vs. Flow Analysis

**Chapter 3 · Network Traffic Analysis · Lesson 2 of 4**

## What you'll learn

- What **Deep Packet Inspection (DPI)** actually examines, and how that's different from the flow metadata from Lesson 9
- Why DPI's thoroughness makes it too expensive to run on every link in a network
- The practical way SOCs combine both: flow data for broad visibility, DPI for deep investigation
- How to decide which tool to reach for first, given a specific scenario

## DPI: opening the payload, not just reading the label

Lesson 9's NetFlow record told you that 5.1 MB moved between two hosts over 41 seconds — the label on the envelope, not what's inside it. **Deep Packet Inspection** opens the envelope: it examines the actual payload content of packets crossing a device, not just their headers. The same depth you read by hand in Wireshark's packet details and bytes panes — breaking a packet out layer by layer, down to the raw bytes — is effectively what DPI does automatically, inline, for every packet that crosses it, at full network speed.

Where NetFlow can only say *who talked to whom, how much, and for how long*, DPI can say *what the application actually did*: this connection was an HTTP POST uploading a ZIP file, this one carried a database query, this one matches a known malware signature inside the payload itself.

**Concrete example:** NetFlow's record said 5.1 MB moved between two internal hosts over port 445. A DPI engine inspecting that same traffic can confirm it was a legitimate SMB file copy of a specific file type — or, in a more alarming case, that an outbound connection NetFlow logged as "80 KB to an external IP" is actually DNS traffic carrying encoded data disguised as a routine lookup.

## The cost of seeing everything

That thoroughness isn't free. To inspect payload content, a DPI engine has to buffer packets, reassemble them into application-layer data, and examine the actual bytes — work far more resource-intensive than reading header fields off a packet in passing. Running full DPI on every link across a large network, at full line rate, isn't realistic with normal hardware budgets. That's why DPI capability typically lives at specific **chokepoints** — a perimeter firewall, a segment boundary — rather than everywhere a flow collector can sit cheaply.

## The complementary model: breadth, then depth

In practice, a SOC doesn't choose one tool over the other — flow analysis and DPI do different jobs in the same workflow. Flow data (Lesson 9) gives broad, always-on visibility across the entire network cheaply enough to watch continuously. When something in that flow data looks off — a host suddenly sending to a destination it's never contacted, at a volume well outside its norm — that's the trigger to pull that specific host's traffic under DPI, or a full packet capture, for a detailed look at what's actually inside it.

Flow analysis tells you *where* to look. DPI tells you *what's actually there* once you're looking.

## Key terms

| Term | Meaning |
|---|---|
| Deep Packet Inspection (DPI) | Inspection of actual packet payload content, not just header fields |
| Payload | The application data carried inside a packet, beyond its headers |
| Chokepoint | A specific point in the network (e.g. perimeter firewall) where running DPI is practical |
| Complementary detection | Using flow data for broad visibility and DPI for targeted, detailed investigation |

## Check yourself

Flow data flags a host sending an unusual volume of traffic to a destination it's never contacted before. Why would an analyst pull that specific host's traffic under DPI next, instead of just running DPI on the whole network all the time?
