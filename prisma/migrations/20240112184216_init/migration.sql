-- CreateTable
CREATE TABLE "Players" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "phone" BIGINT NOT NULL,
    "steamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "social_credits" REAL NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "email" TEXT,
    "description" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "checkin_limit_date" DATETIME NOT NULL,
    "player_id" INTEGER NOT NULL,
    "player_reminder" BOOLEAN NOT NULL DEFAULT false,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Events_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerStates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player_id" INTEGER NOT NULL,
    "description" TEXT,
    CONSTRAINT "PlayerStates_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerRequests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    CONSTRAINT "PlayerRequests_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Players_email_key" ON "Players"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Players_phone_key" ON "Players"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Players_steamId_key" ON "Players"("steamId");
