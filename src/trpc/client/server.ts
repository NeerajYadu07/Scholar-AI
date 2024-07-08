import 'server-only'

import { cookies, headers } from 'next/headers'
import { createTRPCContext } from '../server'
import { TRPCClientError, createTRPCProxyClient } from '@trpc/client'
import { type AppRouter, appRouter } from '../server/routers'
import { type TRPCErrorResponse } from '@trpc/server/rpc'
import { NextRequest } from 'next/server'
import { getAuth } from '@clerk/nextjs/server'

import { observable } from '@trpc/server/observable'
import { callProcedure } from '@trpc/server'
import { cache } from 'react'
import { getBaseUrl } from './shared'

const createContext = cache(() => {
  const url = getBaseUrl()
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      'x-trpc-source': 'rsc',
    }),
    auth: getAuth(new NextRequest(url, { headers: headers() })),
  })
})

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op: { input, path, type } }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                ctx,
                path,
                type,
                rawInput: input,
                procedures: appRouter._def.procedures,
              })
            })
            .then((data) => {
              observer.next({ result: { data } })
              observer.complete()
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause))
            })
        }),
  ],
})
