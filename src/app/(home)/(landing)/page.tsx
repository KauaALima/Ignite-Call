import { ClaimUserNameForm } from '../../../components/ClaimUserNameForm'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Descomplique sua agenda',
}

export default function Home() {
  return (
    <div className="ml-auto flex h-screen max-w-res items-center gap-20">
      <div className="max-w-[480px] px-10 py-0">
        <h1 className="text-[64px] font-bold leading-[64px] text-white max-md:text-5xl">
          Agendamento descomplicado
        </h1>
        <p className="mt-2 text-xl font-normal text-gray-200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>
        <ClaimUserNameForm />
      </div>

      <div className="overflow-hidden pr-8 max-md:hidden">
        <Image
          src={'/CalendarImage.png'}
          alt="CalendarImage"
          width={840}
          height={400}
          quality={100}
          priority
        />
      </div>
    </div>
  )
}
