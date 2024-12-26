'use client'

import { MultiStep } from '@/components/MultiStep'

import { ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   title: 'Conecte sua agenda do Google',
// }

export default function ConnectCalendar() {
  const session = useSession()
  const querryParmas = useSearchParams()
  const Router = useRouter()

  const queryRouter = querryParmas.get('error')
  const hasAuthError = !!queryRouter
  const isSignedIn = session.status === 'authenticated'

  async function handleSignIn() {
    await signIn('google')
  }

  function handleNextStep() {
    Router.push('/register/time-intervals')
  }

  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px]">
      <header className="px-6 py-0">
        <strong className="text-2xl text-white">Conecte sua agenda!</strong>
        <p className="mb-6 text-base text-gray-200">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
        <MultiStep size={4} currentStep={2} />
      </header>

      <div className="mt-6 flex flex-col items-start gap-4 rounded-md border border-gray-600 bg-gray-800 p-6">
        <div className="flex w-full items-center justify-between rounded-md border border-gray-600 px-6 py-4">
          <strong className="text-base text-gray-100">Google Agenda</strong>
          {isSignedIn ? (
            <button
              disabled
              className="flex items-center gap-2 rounded-md border-2 border-gray-200 px-4 py-2 text-sm text-white"
            >
              Conectado <Check size={16} />
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="flex items-center gap-2 rounded-md border-2 border-green-500 px-4 py-2 text-sm text-green-500 hover:bg-green-500 hover:text-white"
            >
              Conectar
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {hasAuthError && (
          <p className="mb-2 text-sm text-red-300">{queryRouter}</p>
        )}

        <button
          onClick={handleNextStep}
          className="flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-green-500 text-sm text-gray-100 disabled:bg-gray-200"
          disabled={!isSignedIn}
        >
          Próximo passo <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
