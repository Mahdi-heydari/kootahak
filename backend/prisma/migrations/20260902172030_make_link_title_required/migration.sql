/*
  Warnings:

  - Made the column `title` on table `links` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "links" ALTER COLUMN "title" SET NOT NULL;
