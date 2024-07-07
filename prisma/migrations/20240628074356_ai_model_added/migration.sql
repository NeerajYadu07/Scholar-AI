-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AIModel" ADD VALUE 'gpt_4_0125_preview';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_turbo_preview';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_1106_preview';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_vision_preview';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_1106_vision_preview';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_0613';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_32k';
ALTER TYPE "AIModel" ADD VALUE 'gpt_4_32k_0613';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo_0125';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo_1106';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo_instruct';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo_16k';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo_0613';
ALTER TYPE "AIModel" ADD VALUE 'gpt_3__5_turbo_16k_0613';
