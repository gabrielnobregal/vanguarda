-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "discord_user_name" TEXT NOT NULL DEFAULT '',
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
