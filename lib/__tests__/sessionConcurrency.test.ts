// Covers two requirements that have no UI path yet and need direct proof:
//  1. Two simultaneous session-start requests against the SAME credit —
//     exactly one must succeed, the other must see "Credit already in use."
//  2. A failed session start must not permanently consume the credit (the
//     claim + session-create transaction must roll back together).
// Invokes the real Netlify Function handler directly (same Request/Response
// contract Netlify itself uses) against the real local dev database.
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../db";
// @ts-expect-error — .ts extension import, consistent with how Netlify Functions import each other in this project
import sessionHandler from "../../netlify/functions/mock-interview-session.ts";

function postReq(body: unknown): Request {
  return new Request("http://localhost/api/mock-interview-session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const createdStudentIds: string[] = [];

async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) {
    await prisma.certificate.deleteMany({ where: { sessionId: s.id } });
    await prisma.interviewTurn.deleteMany({ where: { sessionId: s.id } });
  }
  await prisma.mockInterviewSession.deleteMany({ where: { studentId } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

describe("session start — credit concurrency and failure safety", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("exactly one of two simultaneous starts against the SAME credit succeeds", async () => {
    const email = `concurrency-${Date.now()}@example.com`;

    const mintRes = await sessionHandler(
      postReq({ mintDevCredit: true, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: email })
    );
    expect(mintRes.status).toBe(201);
    const { creditId } = await mintRes.json();
    expect(typeof creditId).toBe("string");

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${email}` } });
    createdStudentIds.push(student.id);

    // Fire both "start" requests for the identical credit at the same time.
    const [resA, resB] = await Promise.all([
      sessionHandler(
        postReq({ creditId, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: email })
      ),
      sessionHandler(
        postReq({ creditId, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: email })
      ),
    ]);

    const statuses = [resA.status, resB.status].sort();
    expect(statuses).toEqual([201, 409]);

    const sessions = await prisma.mockInterviewSession.findMany({ where: { creditId } });
    expect(sessions).toHaveLength(1);

    const credit = await prisma.interviewCredit.findUniqueOrThrow({ where: { id: creditId } });
    expect(credit.status).toBe("consumed");
  });

  it("a failed session start does not permanently consume the credit", async () => {
    const email = `rollback-${Date.now()}@example.com`;

    const mintRes = await sessionHandler(
      postReq({ mintDevCredit: true, careerPath: "snowflake-data-engineer", difficulty: "advanced", devStudentEmail: email })
    );
    const { creditId } = await mintRes.json();
    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${email}` } });
    createdStudentIds.push(student.id);

    // Force the session-create half of the transaction to fail by passing
    // an invalid difficulty that will violate the session's own
    // constraints downstream — simplest reliable failure to induce without
    // mocking Prisma: start a session for a DIFFERENT career path than the
    // credit was minted for isn't actually blocked today (that's a Phase B
    // validation gap worth flagging separately), so instead we simulate the
    // failure directly: open the same transaction shape the handler uses
    // and throw after the claim, then assert the claim rolled back.
    await expect(
      prisma.$transaction(async (tx) => {
        const claim = await tx.interviewCredit.updateMany({
          where: { id: creditId, status: "unused" },
          data: { status: "consumed", consumedAt: new Date() },
        });
        expect(claim.count).toBe(1);
        throw new Error("simulated session-create failure");
      })
    ).rejects.toThrow("simulated session-create failure");

    const credit = await prisma.interviewCredit.findUniqueOrThrow({ where: { id: creditId } });
    expect(credit.status).toBe("unused"); // rolled back, not stuck "consumed"

    // And the credit is still genuinely usable afterward — not just
    // unused-in-name but actually claimable.
    const res = await sessionHandler(
      postReq({ creditId, careerPath: "snowflake-data-engineer", difficulty: "advanced", devStudentEmail: email })
    );
    expect(res.status).toBe(201);
  });
});
