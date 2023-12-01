import { SideBarMenu } from "@/components/SideBarMenu";

export default function Home() {
  return (
   <div className="grid grid-cols-7">
    <SideBarMenu />
    <div className="col-span-4 flex flex-col justify-start px-4 ">
      <h1 className=" text-xl">Sistema de Manutenção e Informatização de Processos Escolares</h1>
      <p className="text-5xl mt-16 justify-center items-center">Em contrução...</p>
    </div>
   </div>
  )
}
