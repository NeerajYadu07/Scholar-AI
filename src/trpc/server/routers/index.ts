import { createTRPCRouter } from '..'
import { adminRoutes } from './admins'
import { coursesRoutes } from './courses'
import { chapterRoutes } from './chapters'
import { aiModelRoutes } from './aiModel'
import { stripeRoutes } from './stripe'
import { creditBalanceRoutes } from './creditBalance'
import { studentRoutes } from './students'
import { testRoutes } from './tests'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  courses: coursesRoutes,
  chapters: chapterRoutes,
  aiModel: aiModelRoutes,
  stripe: stripeRoutes,
  creditBalance: creditBalanceRoutes,
  students: studentRoutes,
  tests: testRoutes,
})

export type AppRouter = typeof appRouter
