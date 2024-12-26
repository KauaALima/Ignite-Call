'use client'

import { SessionProvider } from 'next-auth/react'
import '../utils/dayjs'
import { QueryClientProvider } from '@tanstack/react-query'

import React from 'react'
import { queryClient } from '@/lib/react_querry'

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}

export default SessionWrapper
