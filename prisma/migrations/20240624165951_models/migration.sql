-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "startIn" TIMESTAMP(3) NOT NULL,
    "endIn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "cardText" TEXT NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "chosenAnswer" TEXT NOT NULL,
    "impact" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats_modification" (
    "id" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "production" INTEGER NOT NULL,
    "logistics" INTEGER NOT NULL,
    "economy" INTEGER NOT NULL,
    "satisfaction" INTEGER NOT NULL,

    CONSTRAINT "stats_modification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actions" ADD CONSTRAINT "actions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stats_modification" ADD CONSTRAINT "stats_modification_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "actions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
