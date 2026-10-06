# Script — Oracle Fusion Security Model Overview

## Segment 1 (title)

Welcome to Oracle Fusion Security, the first course in the Security and Implementation stage of the Oracle Fusion Financials Consultant path. Every course so far has shown you how to configure a module. This course asks a different question: how does Oracle Fusion decide who's allowed to do any of that?

## Segment 2 (steps)

Oracle Fusion never grants access directly to a person. Every grant goes to a role, and a person gets access only by having that role provisioned to their account. At our fictional company, Castellan Robotics, when a Payables Supervisor leaves and is replaced, the new hire is provisioned the same job role and inherits exactly that access. That indirection is called role based access control, and it's the foundation of every access decision in Fusion.

## Segment 3 (steps)

The model has four pieces. Users are the people who sign in, with no access on their own. Roles are what actually carry access. Privileges are the smallest unit of permission, like voiding a payment, and they're granted to roles, never to users directly. And data security policies decide which rows of data those privileges actually apply to. Two separate questions get asked for every access check: can you open the page at all, and of the data that exists, which rows can you see. Those are function security and data security, and you'll go deep on both starting in lesson five.

## Segment 4 (steps)

Almost everything in this course happens in one tool: the Security Console. It's where an administrator views and compares roles, builds custom roles, provisions roles to users, reviews a user's existing assignments, and simulates what a role can see before handing it out. You'll open it for the first time in the next lesson.

## Segment 5 (outro)

Hold onto that shape — users get roles, roles carry privileges and data security policies. Up next, lesson two: users and user accounts.
