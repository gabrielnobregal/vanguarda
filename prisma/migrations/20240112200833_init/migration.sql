/*
  Warnings:

  - You are about to drop the column `description` on the `PlayerStates` table. All the data in the column will be lost.
  - Added the required column `state` to the `PlayerStates` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerStates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player_id" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "motive" TEXT,
    CONSTRAINT "PlayerStates_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Players" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PlayerStates" ("creation_date", "id", "player_id") SELECT "creation_date", "id", "player_id" FROM "PlayerStates";
DROP TABLE "PlayerStates";
ALTER TABLE "new_PlayerStates" RENAME TO "PlayerStates";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
