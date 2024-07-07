import { $Enums, AIModel } from '@prisma/client'

interface ModelCosts {
  promptTokenCost: number
  completionTokenCost: number
}

export const EXAM_MODEL: AIModel = 'llama3_70b_8192'
export const MARKS_PER_QUESTION = 20

export const MODEL_COSTS: Record<$Enums.AIModel, ModelCosts> = {
  [$Enums.AIModel.llama3_70b_8192]: {
    promptTokenCost: 0.01,
    completionTokenCost: 0.03,
  },
  [$Enums.AIModel.llama3_8b_8192]: {
    promptTokenCost: 0.03,
    completionTokenCost: 0.06,
  },
  [$Enums.AIModel.gemma_7b_it]: {
    promptTokenCost: 0.06,
    completionTokenCost: 0.12,
  },
  [$Enums.AIModel.mixtral_8x7b_32768]: {
    promptTokenCost: 0.0005,
    completionTokenCost: 0.0015,
  },
  [$Enums.AIModel.whisper_large_v3]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
}
