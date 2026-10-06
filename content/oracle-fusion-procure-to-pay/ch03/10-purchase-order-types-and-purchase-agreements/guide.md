# Purchase Order Types and Purchase Agreements

Marcus has a draft document referencing Dana's requisition line. Before building it out, you need to know which of Oracle Fusion's purchasing document types it actually is, and why that choice matters.

## What you'll learn

- The three main purchasing document types in Oracle Fusion Cloud
- When each type is the right choice
- Why Dana's bearing purchase becomes a standard purchase order
- How agreements and standard purchase orders relate to each other

## Three purchasing document types

Oracle Fusion Purchasing supports three main document types:

- **Standard purchase order** — used for a one-time purchase where the buyer already knows the item or service, the estimated cost, the quantity, and the delivery schedule. This is the right choice when a specific, defined need exists right now, which is exactly Dana's situation: 50 bearings, needed by a specific date, at a known price.
- **Blanket purchase agreement (BPA)** — used when a company knows it will buy from a specific supplier repeatedly over a period of time, with negotiated prices for specific items, but does not yet know the exact delivery schedule or total quantity up front. A BPA is not itself an order; releases are issued against it as actual needs arise, each release behaving like its own smaller purchase order.
- **Contract purchase agreement (CPA)** — a longer-term legal agreement with a supplier, often covering terms and conditions, without necessarily specifying particular items or prices. A CPA can exist on its own, or standard purchase orders can reference it so that agreed-upon contract terms automatically apply.

Blanket purchase agreements and contract purchase agreements are both categorized as **supplier agreements** — long-term arrangements, as distinct from the one-time commitment of a standard purchase order.

## Why Dana's purchase becomes a standard purchase order

LTV Manufacturing Corporation already has a pricing relationship with Meridian Bearing Supply Co. for pump bearings, but for this course's transaction, the specific order for 50 units is a one-time, fully defined need — a known item, known quantity, known price, known delivery date. That is the exact profile of a standard purchase order, so Marcus processes Dana's requisition line into one. If LTV instead ran high volumes of recurring bearing purchases against a negotiated blanket agreement, Marcus might instead issue a **blanket release** against an existing BPA rather than create a new standalone standard purchase order — functionally similar from a receiving and invoicing perspective, but tied back to the agreement's terms.

## How these types interact in practice

A company frequently uses all of these together: a contract purchase agreement might set master legal terms with Meridian, a blanket purchase agreement might lock in pricing for the bearing part number over the year, and a flow of releases or, in simpler setups, standard purchase orders fulfill actual delivery needs as they arise. Recognizing which document type you are looking at — and why — is one of the most common things a consultant is asked to explain when a client says "why do we have two different kinds of purchase orders with this supplier?"

## Recap

Standard purchase orders are for one-time, fully defined needs; blanket purchase agreements lock in pricing with a supplier over time without a known schedule, fulfilled by releases; contract purchase agreements cover longer-term legal terms. Dana's fully defined, one-time bearing order becomes a standard purchase order. Next up, lesson 11: building that purchase order field by field.
