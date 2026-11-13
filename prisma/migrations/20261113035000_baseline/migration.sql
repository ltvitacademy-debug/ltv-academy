-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "wixMemberId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewCredit" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "wixOrderId" TEXT NOT NULL,
    "careerPath" TEXT NOT NULL,
    "difficulty" TEXT,
    "status" TEXT NOT NULL DEFAULT 'unused',
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockInterviewSession" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "creditId" TEXT NOT NULL,
    "careerPath" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "mode" TEXT NOT NULL DEFAULT 'text',
    "currentSection" TEXT NOT NULL DEFAULT 'technical-competency',
    "status" TEXT NOT NULL DEFAULT 'in-progress',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "voiceAgentSessionId" TEXT,
    "voiceAgentStatus" TEXT,

    CONSTRAINT "MockInterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewTurn" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "turnIndex" INTEGER NOT NULL,
    "section" TEXT NOT NULL,
    "competencyId" TEXT,
    "questionId" TEXT,
    "aiMessage" TEXT NOT NULL,
    "studentResponse" TEXT,
    "elapsedSeconds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewTurn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetencyResult" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "competencyId" TEXT NOT NULL,
    "met" BOOLEAN,
    "clarificationUsed" BOOLEAN NOT NULL DEFAULT false,
    "evidence" TEXT,

    CONSTRAINT "CompetencyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewReport" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "overallScore" INTEGER,
    "outcome" TEXT NOT NULL DEFAULT 'incomplete',
    "sectionScores" TEXT NOT NULL,
    "reportJson" TEXT NOT NULL,
    "disputed" BOOLEAN NOT NULL DEFAULT false,
    "adminReviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendingCreditVerification" (
    "id" TEXT NOT NULL,
    "wixOrderId" TEXT NOT NULL,
    "wixMemberId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "planId" TEXT,
    "payloadStatus" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3) NOT NULL,
    "lastError" TEXT,
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PendingCreditVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "certificateNumber" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "careerPath" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "passingScore" INTEGER NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_wixMemberId_key" ON "Student"("wixMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewCredit_wixOrderId_key" ON "InterviewCredit"("wixOrderId");

-- CreateIndex
CREATE INDEX "InterviewCredit_studentId_status_idx" ON "InterviewCredit"("studentId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "MockInterviewSession_accessToken_key" ON "MockInterviewSession"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "MockInterviewSession_creditId_key" ON "MockInterviewSession"("creditId");

-- CreateIndex
CREATE UNIQUE INDEX "MockInterviewSession_voiceAgentSessionId_key" ON "MockInterviewSession"("voiceAgentSessionId");

-- CreateIndex
CREATE INDEX "InterviewTurn_sessionId_turnIndex_idx" ON "InterviewTurn"("sessionId", "turnIndex");

-- CreateIndex
CREATE INDEX "CompetencyResult_sessionId_idx" ON "CompetencyResult"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetencyResult_sessionId_competencyId_key" ON "CompetencyResult"("sessionId", "competencyId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewReport_sessionId_key" ON "InterviewReport"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingCreditVerification_wixOrderId_key" ON "PendingCreditVerification"("wixOrderId");

-- CreateIndex
CREATE INDEX "PendingCreditVerification_status_nextAttemptAt_idx" ON "PendingCreditVerification"("status", "nextAttemptAt");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_sessionId_key" ON "Certificate"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");

-- AddForeignKey
ALTER TABLE "InterviewCredit" ADD CONSTRAINT "InterviewCredit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockInterviewSession" ADD CONSTRAINT "MockInterviewSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockInterviewSession" ADD CONSTRAINT "MockInterviewSession_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "InterviewCredit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewTurn" ADD CONSTRAINT "InterviewTurn_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MockInterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetencyResult" ADD CONSTRAINT "CompetencyResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MockInterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewReport" ADD CONSTRAINT "InterviewReport_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MockInterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MockInterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

