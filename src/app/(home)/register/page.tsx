import { MultiStep } from '@/components/MultiStep'
import { RegisterForm } from '@/components/RegisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crie uma conta',
}

export default function Register() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px]">
      <header className="px-6 py-0">
        <strong className="text-2xl text-white">
          Bem-vindo ao Ignite Call!
        </strong>
        <p className="mb-6 text-base text-gray-200">
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </p>
        <MultiStep size={4} currentStep={1} />
      </header>

      <RegisterForm />
    </main>
  )
}
