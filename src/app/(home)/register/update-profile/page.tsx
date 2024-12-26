import { MultiStep } from '@/components/MultiStep'
import { UpdateProfileForm } from '@/components/UpdateProfileForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atualize seu perfil',
}

export default async function UpdateProfile() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-[572px]">
      <header className="px-6 py-0">
        <strong className="text-2xl text-white">
          Defina sua disponibilidade
        </strong>
        <p className="mb-6 text-base text-gray-200">
          Por último, uma breve descrição e uma foto de perfil.
        </p>
        <MultiStep size={4} currentStep={4} />
      </header>

      <UpdateProfileForm />
    </main>
  )
}
