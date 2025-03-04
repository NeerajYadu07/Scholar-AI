import { createTRPCContext } from '@/trpc/server'
import { appRouter } from '@/trpc/server/routers'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
    auth: getAuth(req),
  })
}

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: () => createContext(req),
  })

export { handler as GET, handler as POST }
