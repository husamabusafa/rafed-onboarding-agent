/*
  Warnings:

  - You are about to drop the column `name` on the `probation_milestones` table. All the data in the column will be lost.
  - Added the required column `nameAr` to the `probation_milestones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `probation_milestones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "probation_milestones" DROP COLUMN "name",
ADD COLUMN     "nameAr" TEXT NOT NULL,
ADD COLUMN     "nameEn" TEXT NOT NULL;
