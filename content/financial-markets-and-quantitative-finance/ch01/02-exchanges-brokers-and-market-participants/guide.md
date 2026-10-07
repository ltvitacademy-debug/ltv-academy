# Exchanges, Brokers & Market Participants

Every trade needs a venue to happen on and a cast of participants to make it happen. Lesson 1 mapped what gets traded; this lesson maps who trades it and where. By the end, you'll be able to name the role each type of market participant plays and trace the path an order takes from an investor's decision to a filled trade.

## What you'll learn

- The difference between exchanges and over-the-counter (OTC) venues, including ECNs and dark pools
- Brokers vs. dealers, and buy-side vs. sell-side
- What market makers do and why they exist
- The role of clearinghouses (CCPs) and novation in making trades safe to settle

## Exchanges and alternative venues

A **stock exchange** — the New York Stock Exchange (NYSE) or Nasdaq, for example — is a centralized, regulated venue where buyers and sellers meet and trade under a common rulebook. Exchanges publish prices continuously and are subject to regulatory oversight (in the US, the SEC).

Not all trading happens on exchanges. An **ECN** (electronic communication network) is an automated system that matches buy and sell orders electronically, often for a narrower slice of the market or specific client types, and competes with exchanges for order flow. A **dark pool** is a private trading venue where buy and sell orders are matched without displaying the order book publicly before execution — useful for institutions that want to trade a large block without moving the price against themselves by revealing their intent. Collectively, trading that happens away from public exchanges is called **over-the-counter (OTC)** trading.

## Brokers vs. dealers

A **broker** acts as an agent: they execute a trade on a client's behalf and connect buyers with sellers, typically earning a commission, but they don't take the other side of the trade themselves. A **dealer** (or market maker — see below) acts as a principal: they trade from their own account, buying from one client and selling to another (or to the market) and taking on the position in between. Many firms do both and are called **broker-dealers**.

## Buy-side vs. sell-side

The **sell-side** consists of firms that sell financial products and services to other institutions — investment banks, broker-dealers, and market makers. The **buy-side** consists of firms that buy securities to manage money on behalf of others or themselves — mutual funds, pension funds, hedge funds, and insurance companies. A sell-side analyst's research is distributed broadly to generate trading commissions; a buy-side analyst's research is proprietary, used only inside their own fund to make investment decisions.

## Retail vs. institutional

A **retail investor** is an individual trading their own money, typically in smaller sizes through a brokerage app or platform. An **institutional investor** — a pension fund, mutual fund, or hedge fund — trades in much larger size and often needs to worry about market impact (Lesson 5) in a way retail investors rarely do.

## Market makers

A **market maker** is a firm (often a dealer) that continuously quotes both a buy price (bid) and a sell price (ask) for a security, standing ready to trade either side. This provides **liquidity** — other participants can trade immediately rather than waiting for a natural counterparty to show up. Market makers earn their living from the **bid-ask spread**, the small gap between their buy and sell quotes, which compensates them for the risk of holding inventory and the risk of trading against better-informed counterparties. Market microstructure — exactly how that compensation works — is the subject of Lesson 4.

## Clearinghouses and novation

Once two parties agree to a trade, someone has to guarantee it actually settles — that the buyer gets the security and the seller gets the cash, even if one side later defaults. That's the job of a **central counterparty (CCP)**, or clearinghouse. Through a process called **novation**, the clearinghouse inserts itself between the original buyer and seller immediately after a trade is agreed, becoming the seller to the original buyer and the buyer to the original seller. Each party now faces the CCP's credit risk instead of each other's, which is a major reason modern exchange-traded markets are considered safe to trade on even between strangers.

## Key terms

| Term | Meaning |
|---|---|
| Exchange | A centralized, regulated venue for trading (e.g., NYSE, Nasdaq) |
| ECN / dark pool | Alternative electronic venues that match orders away from a public exchange |
| Broker | Agent who executes trades on a client's behalf for a commission |
| Dealer / market maker | Principal who trades from their own account and quotes bid/ask prices |
| Buy-side / sell-side | Firms that manage money vs. firms that sell products/services to them |
| CCP (clearinghouse) | Guarantees trade settlement via novation, standing between buyer and seller |

## Recap

Trading happens on exchanges and in OTC venues like ECNs and dark pools, is intermediated by brokers (agents) and dealers (principals), and is organized into buy-side and sell-side roles. Market makers provide liquidity by continuously quoting both sides of the market, and clearinghouses make settlement safe through novation. Next up, Lesson 3: order types and how the limit order book actually works.
