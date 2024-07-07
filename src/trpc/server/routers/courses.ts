import { formSchemaCreateCourse, formSchemaID, formSchemaUpdateCourse } from '@/forms/schemas'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

export const coursesRoutes = createTRPCRouter({
  courses: publicProcedure.query(({ ctx }) =>
    ctx.db.course.findMany({
      include: {
        Chapters: { select: { id: true }, orderBy: { createdAt: 'asc' } },
      },
    })
  ),
  course: publicProcedure.input(formSchemaID).query(async ({ input, ctx }) => {
    return ctx.db.course.findUnique({
      where: { id: input.id },
      include: { Chapters: { select: { title: true, id: true } } },
    })
  }),
  create: protectedProcedure('admin')
    .input(formSchemaCreateCourse)
    .mutation(async ({ input, ctx }) => {
      const { chapters, ...courseInput } = input

      return ctx.db.course.create({
        data: {
          ...courseInput,
          Admin: { connect: { id: ctx.userId } },
          Chapters: {
            create: chapters.map((chapter) => ({
              title: chapter.title,
              content: chapter.content,
              Questions: {
                create: chapter.questions.map((question) => ({
                  question: question.question,
                  Answer: {
                    create: {
                      answer: question.answer,
                      explanation: question.explanation,
                    },
                  },
                })),
              },
            })),
          },
        },
      })
    }),
  
  updateCourse : protectedProcedure('admin')
  .input(formSchemaUpdateCourse)
  .mutation(async ({ input, ctx }) => {
    const {chapters, ...courseInput } = input;

    return ctx.db.course.update({
      where: { id:courseInput.id },
      data: {
        ...courseInput,
        Chapters: {
          upsert: chapters.map((chapter) => ({
            where: { id: chapter.id || -1}, // Assuming 'id' is available for existing chapters
            update: {
              title: chapter.title,
              content: chapter.content,
              Questions: {
                upsert: chapter.questions.map((question) => ({
                  where: { id: question.id || -1}, // Assuming 'id' is available for existing questions
                  update: {
                    question: question.question,
                    Answer: {
                      upsert: {
                        where: { id: question.id || -1}, // Assuming 'answerId' is available for existing answers
                        update: {
                          answer: question.answer,
                          explanation: question.explanation,
                        },
                        create: {
                          answer: question.answer,
                          explanation: question.explanation,
                        },
                      },
                    },
                  },
                  create: {
                    question: question.question,
                    Answer: {
                      create: {
                        answer: question.answer,
                        explanation: question.explanation,
                      },
                    },
                  },
                })),
              },
            },
            create: {
              title: chapter.title,
              content: chapter.content,
              Questions: {
                create: chapter.questions.map((question) => ({
                  question: question.question,
                  Answer: {
                    create: {
                      answer: question.answer,
                      explanation: question.explanation,
                    },
                  },
                })),
              },
            },
          })),
        }
    }})
  }),



  getCourse: protectedProcedure('admin')
    .input(formSchemaID)
    .query(({ input, ctx }) => {
      const courseData = ctx.db.course.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id:true,
          title:true,
          description: true,
          published: true,
          image:true,
          Chapters: {
            include: {
              Questions: {
                include: {
                  Answer: true,
                },
              },
            },
          },
        },
      })
      // console.log(courseData?.title)
      return courseData
      
    }),
    
  delete: protectedProcedure('admin')
    .input(formSchemaID)
    .mutation(({ input, ctx }) => {
      return ctx.db.course.delete({
        where: { id: input.id },
      })
      
    }),
})
