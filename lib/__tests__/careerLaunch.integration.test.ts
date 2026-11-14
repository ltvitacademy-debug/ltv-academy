// Career Launch Netlify Functions, exercised through the real handlers
// against the local dev SQLite database — same pattern as
// adminPendingCredits.integration.test.ts. devStudentEmail is used
// throughout since vitest runs with NODE_ENV !== "production", exactly the
// dev-mode fallback lib/careerLaunchAuth.ts documents.
import { describe, it, expect, afterAll, beforeEach, afterEach } from "vitest";
import { prisma } from "../db";
import { signAdminSessionToken } from "../adminAuth";
// @ts-expect-error — .mts extension import, consistent with other Netlify Function tests in this project
import profileHandler from "../../netlify/functions/career-launch-profile.mts";
// @ts-expect-error
import resumeHandler from "../../netlify/functions/career-launch-resume.mts";
// @ts-expect-error
import applicationsHandler from "../../netlify/functions/career-launch-applications.mts";
// @ts-expect-error
import adminReviewHandler from "../../netlify/functions/career-launch-admin-review.mts";

function uniqueEmail(label: string) {
  return `career-launch-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

function jsonReq(url: string, method: string, body?: unknown, headers: Record<string, string> = {}) {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json", ...headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

describe("career-launch-profile", () => {
  const email = uniqueEmail("profile");

  afterAll(async () => {
    const student = await prisma.student.findUnique({ where: { wixMemberId: `dev:${email}` } });
    if (student) {
      await prisma.careerProfile.deleteMany({ where: { studentId: student.id } });
      await prisma.student.delete({ where: { id: student.id } });
    }
  });

  it("GET returns null before any profile exists", async () => {
    const res = await profileHandler(new Request(`http://localhost/api/career-launch-profile?devStudentEmail=${email}`));
    const data = await res.json();
    expect(data.profile).toBeNull();
  });

  it("PUT creates the profile, GET then returns it with the same shape", async () => {
    const putRes = await profileHandler(
      jsonReq("http://localhost/api/career-launch-profile", "PUT", {
        devStudentEmail: email,
        targetRoles: ["Data Engineer", "Analytics Engineer"],
        locations: ["Remote", "Atlanta, GA"],
        compFloor: 90000,
        workAuth: "US Citizen",
        excludedCompanies: ["Former Employer Inc"],
        weeklyTarget: 8,
        startAvailability: "Immediately",
      })
    );
    expect(putRes.status).toBe(200);
    const putData = await putRes.json();
    expect(putData.profile).toMatchObject({
      targetRoles: ["Data Engineer", "Analytics Engineer"],
      locations: ["Remote", "Atlanta, GA"],
      compFloor: 90000,
      workAuth: "US Citizen",
      excludedCompanies: ["Former Employer Inc"],
      weeklyTarget: 8,
      startAvailability: "Immediately",
      baseResumeText: null,
      baseResumeApprovedAt: null,
    });

    const getRes = await profileHandler(new Request(`http://localhost/api/career-launch-profile?devStudentEmail=${email}`));
    const getData = await getRes.json();
    expect(getData.profile).toEqual(putData.profile);
  });

  it("400s a PUT missing required fields", async () => {
    const res = await profileHandler(jsonReq("http://localhost/api/career-launch-profile", "PUT", { devStudentEmail: email }));
    expect(res.status).toBe(400);
  });
});

describe("career-launch-resume", () => {
  const email = uniqueEmail("resume");

  afterAll(async () => {
    const student = await prisma.student.findUnique({ where: { wixMemberId: `dev:${email}` } });
    if (student) {
      await prisma.careerProfile.deleteMany({ where: { studentId: student.id } });
      await prisma.student.delete({ where: { id: student.id } });
    }
  });

  it("400s approving with no resume text yet", async () => {
    const res = await resumeHandler(
      jsonReq("http://localhost/api/career-launch-resume", "POST", { devStudentEmail: email, action: "approve" })
    );
    expect(res.status).toBe(400);
  });

  it("PUT sets resume text with no approval, POST approve stamps approvedAt, editing clears it again", async () => {
    const putRes = await resumeHandler(
      jsonReq("http://localhost/api/career-launch-resume", "PUT", { devStudentEmail: email, baseResumeText: "Jordan Alvarez — Data Engineer." })
    );
    const putData = await putRes.json();
    expect(putData.baseResumeApprovedAt).toBeNull();

    const approveRes = await resumeHandler(
      jsonReq("http://localhost/api/career-launch-resume", "POST", { devStudentEmail: email, action: "approve" })
    );
    const approveData = await approveRes.json();
    expect(approveData.baseResumeApprovedAt).not.toBeNull();

    const editRes = await resumeHandler(
      jsonReq("http://localhost/api/career-launch-resume", "PUT", { devStudentEmail: email, baseResumeText: "Jordan Alvarez — Senior Data Engineer." })
    );
    const editData = await editRes.json();
    expect(editData.baseResumeApprovedAt).toBeNull(); // editing the approved text requires re-approval
  });
});

describe("career-launch-applications + career-launch-admin-review", () => {
  const email = uniqueEmail("applications");
  const ORIGINAL_SECRET = process.env.ADMIN_SESSION_SECRET;
  let studentId: string;
  let postingId: string;
  let applicationId: string;

  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
  });
  afterEach(() => {
    process.env.ADMIN_SESSION_SECRET = ORIGINAL_SECRET;
  });

  afterAll(async () => {
    await prisma.jobApplication.deleteMany({ where: { studentId } });
    await prisma.jobPosting.delete({ where: { id: postingId } }).catch(() => {});
    await prisma.student.delete({ where: { id: studentId } }).catch(() => {});
  });

  it("sets up a student, a posting, and a tailored application", async () => {
    const student = await prisma.student.create({ data: { wixMemberId: `dev:${email}`, email } });
    studentId = student.id;
    const posting = await prisma.jobPosting.create({
      data: {
        sourceSite: "linkedin",
        sourceUrl: `https://www.linkedin.com/jobs/view/test-${Date.now()}`,
        company: "Acme Co",
        title: "Data Engineer",
        location: "Remote",
        remote: true,
        rawSummary: "Build pipelines.",
      },
    });
    postingId = posting.id;
    const application = await prisma.jobApplication.create({
      data: {
        studentId,
        postingId,
        status: "tailored",
        matchScore: 88,
        tailoredResumeText: "Tailored resume text.",
        coverLetterText: "Dear hiring manager...",
      },
    });
    applicationId = application.id;
  });

  it("the student sees their own application via career-launch-applications", async () => {
    const res = await applicationsHandler(new Request(`http://localhost/api/career-launch-applications?devStudentEmail=${email}`));
    const data = await res.json();
    expect(data.applications).toHaveLength(1);
    expect(data.applications[0]).toMatchObject({ status: "tailored", matchScore: 88, posting: { company: "Acme Co" } });
  });

  it("403s the admin review queue without a valid admin token", async () => {
    const res = await adminReviewHandler(new Request("http://localhost/api/career-launch-admin-review"));
    expect(res.status).toBe(403);
  });

  it("staff sees it in the review queue and can approve it", async () => {
    const token = signAdminSessionToken({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin" });
    if (!token) throw new Error("expected a token");

    const listRes = await adminReviewHandler(new Request("http://localhost/api/career-launch-admin-review", { headers: { authorization: `Bearer ${token}` } }));
    const listData = await listRes.json();
    expect(listData.applications.some((a: { id: string }) => a.id === applicationId)).toBe(true);

    const approveRes = await adminReviewHandler(
      jsonReq(
        "http://localhost/api/career-launch-admin-review",
        "POST",
        { applicationId, decision: "approve", adminName: "Bill" },
        { authorization: `Bearer ${token}` }
      )
    );
    const approveData = await approveRes.json();
    expect(approveData.application.status).toBe("submitted");

    const after = await prisma.jobApplication.findUnique({ where: { id: applicationId } });
    expect(after?.reviewedByAdminId).toBe("admin-1");
    expect(after?.reviewedAt).not.toBeNull();
  });
});
