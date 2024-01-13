-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventNotifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "player_response" TEXT,
    CONSTRAINT "EventNotifications_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventNotifications_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventNotifications" ("delivered", "event_id", "id", "player_id", "player_response", "viewed") SELECT "delivered", "event_id", "id", "player_id", "player_response", "viewed" FROM "EventNotifications";
DROP TABLE "EventNotifications";
ALTER TABLE "new_EventNotifications" RENAME TO "EventNotifications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
