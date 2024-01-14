-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventNotifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "delivered_date" DATETIME,
    "viewed_date" DATETIME,
    "discarded" BOOLEAN NOT NULL DEFAULT false,
    "discarded_reason" TEXT,
    "player_response" TEXT,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventNotifications_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EventNotifications_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventNotifications" ("creation_date", "delivered_date", "event_id", "id", "player_id", "player_response", "viewed_date") SELECT "creation_date", "delivered_date", "event_id", "id", "player_id", "player_response", "viewed_date" FROM "EventNotifications";
DROP TABLE "EventNotifications";
ALTER TABLE "new_EventNotifications" RENAME TO "EventNotifications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
