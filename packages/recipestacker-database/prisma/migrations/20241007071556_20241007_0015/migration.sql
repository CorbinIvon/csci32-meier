/*
  Warnings:

  - Added the required column `quantity` to the `IngredientMeasurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IngredientMeasurement` ADD COLUMN `quantity` INTEGER NOT NULL;
