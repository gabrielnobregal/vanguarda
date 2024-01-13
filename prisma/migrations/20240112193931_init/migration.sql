/*
  Warnings:

  - You are about to drop the `PlayerRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PlayerRequests";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EventNotifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "player_response" TEXT NOT NULL,
    CONSTRAINT "EventNotifications_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventNotifications_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
