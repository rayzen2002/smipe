'use client'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from './ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { useRouter } from 'next/navigation'

export default function UserAuthForm() {
  const route = useRouter()
  const FormSchema = z.object({
    cpf: z.string().min(6, {
      message: 'Nome de usuário deve conter pelo menos 2 caracteres.',
    }),
    password: z.string().min(4, {
      message: 'Senha deve conter pelo menos 4 caracteres',
    }),
    code: z.string().min(6, {
      message: 'Código do censo escolar contem 6 dígitos',
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cpf: '',
      password: '',
      code: '',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const body = {
      code: parseFloat(data.code),
      cpf: data.cpf,
      password: data.password,
    }
    const loginRequest = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    )
    if (loginRequest.ok) {
      route.push('/dashboard')
      toast({
        title: 'Login Bem Sucedido!',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-green-800 p-4">
            <code className="text-white">Seja Bem-vindo</code>
          </pre>
        ),
      })
    }
    if (!loginRequest.ok) {
      toast({
        variant: 'destructive',
        title: 'Falha no Login!',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-white p-4">
            <code className="text-black">Verifique suas credenciais</code>
          </pre>
        ),
      })
      form.reset()
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="cpf"
          render={() => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="CPF do usuario" {...form.register('cpf')} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={() => (
            <FormItem>
              <FormLabel>Código do Censo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Código do Censo"
                  {...form.register('code')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={() => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Senha do usuario"
                  {...form.register('password')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    // <div className="flex flex-col gap-2 w-full px-20 my-20">
    //   <Input
    //     id="name"
    //     placeholder="Nome do usuário"
    //     type="name"
    //     autoCapitalize="none"
    //     autoCorrect="off"
    //     className=""
    //     // disabled={isLoading}
    //   />
    //   <Input
    //     id="password"
    //     placeholder="senha"
    //     type="password"
    //     autoCapitalize="none"
    //     autoCorrect="off"
    //     className=""

    //     // disabled={isLoading}
    //   />
    //   <Button>Login</Button>
    // </div>
  )
}
