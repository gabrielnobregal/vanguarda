/*
  Warnings:

  - You are about to drop the column `email` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `nick` on the `Events` table. All the data in the column will be lost.
  - Added the required column `nick` to the `Players` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Players" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "steamId" TEXT NOT NULL,
    "email" TEXT,
    "social_credits" REAL NOT NULL,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Players" ("creation_date", "email", "id", "name", "phone", "social_credits", "steamId", "type") SELECT "creation_date", "email", "id", "name", "phone", "social_credits", "steamId", "type" FROM "Players";
DROP TABLE "Players";
ALTER TABLE "new_Players" RENAME TO "Players";
CREATE UNIQUE INDEX "Players_phone_key" ON "Players"("phone");
CREATE UNIQUE INDEX "Players_steamId_key" ON "Players"("steamId");
CREATE UNIQUE INDEX "Players_email_key" ON "Players"("email");
CREATE TABLE "new_Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "checkin_limit_date" DATETIME NOT NULL,
    "player_id" INTEGER NOT NULL,
    "player_reminder" BOOLEAN NOT NULL DEFAULT false,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Events_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Events" ("checkin_limit_date", "creation_date", "description", "end_date", "id", "name", "player_id", "player_reminder", "start_date") SELECT "checkin_limit_date", "creation_date", "description", "end_date", "id", "name", "player_id", "player_reminder", "start_date" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
