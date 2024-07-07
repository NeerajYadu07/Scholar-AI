/*
  Warnings:

  - The values [gpt_4_0125_preview,gpt_4_turbo_preview,gpt_4_1106_preview,gpt_4_vision_preview,gpt_4_1106_vision_preview,gpt_4,gpt_4_0613,gpt_4_32k,gpt_4_32k_0613,gpt_3__5_turbo_0125,gpt_3__5_turbo,gpt_3__5_turbo_1106,gpt_3__5_turbo_instruct,gpt_3__5_turbo_16k,gpt_3__5_turbo_0613,gpt_3__5_turbo_16k_0613] on the enum `AIModel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AIModel_new" AS ENUM ('gemma_7b_it', 'llama3_70b_8192', 'llama3_8b_8192', 'mixtral_8x7b_32768', 'whisper_large_v3');
ALTER TABLE "User" ALTER COLUMN "currentModel" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "currentModel" TYPE "AIModel_new" USING ("currentModel"::text::"AIModel_new");
ALTER TABLE "Message" ALTER COLUMN "model" TYPE "AIModel_new" USING ("model"::text::"AIModel_new");
ALTER TABLE "Transaction" ALTER COLUMN "model" TYPE "AIModel_new" USING ("model"::text::"AIModel_new");
ALTER TYPE "AIModel" RENAME TO "AIModel_old";
ALTER TYPE "AIModel_new" RENAME TO "AIModel";
DROP TYPE "AIModel_old";
ALTER TABLE "User" ALTER COLUMN "currentModel" SET DEFAULT 'llama3_70b_8192';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "currentModel" SET DEFAULT 'llama3_70b_8192';
