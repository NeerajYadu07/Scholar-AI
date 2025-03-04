import { z } from 'zod'

export const formSchemaID = z.object({
  id: z.number(),
})

export const formSchemaQuestion = z.object({
  id: z.number().optional(),
  question: z.string(),
  answer: z.string(),
  explanation: z.string().optional(),
})

export const formSchemaCreateChapter = z.object({
  id :z.number().optional(),
  title: z.string(),
  content: z.string(),
  questions: z.array(formSchemaQuestion),
})

export const formSchemaCreateCourse = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  published: z.boolean(),
  image: z.any().optional(),
  chapters: z.array(formSchemaCreateChapter),
})
export const formSchemaUpdateCourse = z.object({
  id:z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
  published: z.boolean(),
  image: z.any().optional(),
  chapters: z.array(formSchemaCreateChapter),
})

export const schemaPayment = z.object({
  userId: z.string(),
  creditsCount: z.coerce.number().min(1),
})

export const schemaDoubt = z.object({
  chapterId: z.number(),
  doubt: z.string(),
})

export const schemaSubmitTest = z.object({
  testId: z.number(),
  answers: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      userAnswer: z.string().optional().nullable(),
    }),
  ),
})
