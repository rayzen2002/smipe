import UserAuthForm from '@/components/user-auth-form'
import { School } from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-green-700 h-screen">
          <div className="flex h-screen flex-col justify-between">
            <div className="flex flex-row items-center justify-start mt-6 ml-6 gap-1">
              <School className="w-12 h-12" />
              <h1 className="text-5xl font-medium">Smipe</h1>
            </div>
            <p className="text-lg font-medium text-inherit mb-1 ml-6">
              Smipe - Sistema de Manutenção e Informatização de Processos
              Escolares
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1>Faça Login</h1>
          <UserAuthForm />
        </div>
      </div>
    </>
  )
}
