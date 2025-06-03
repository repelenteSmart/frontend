"use client";
import React from "react";
import { ContainerScroll } from "./Components/ui/container-scroll-animation";
import { Timeline } from "./Components/ui/timeline";
import Link from "next/link";
import { HoverEffect } from "./Components/ui/card-hover-effect";


export default function HeroScrollDemo() {

  const data = [
    {
      title: "2003",
      content: (
        <div className="flex gap-12">
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-10/12">
            A primeira versão do cigarro eletrônico é criada por Hon Lik, um farmacêutico chinês. A ideia era oferecer uma alternativa ao cigarro tradicional, com menos impacto à saúde — uma solução que logo se espalhou pelo mundo.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/VapeImg.png"
              alt="startup template"
              
              
              className="rounded-lg h-100 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            
          </div>
        </div>
      ),
    },
        {
      title: "2009",
      content: (
        <div>
          <p className="mb-4 text-4xl font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-10/12">
            A Anvisa reafirma a proibição da importação, comercialização e propaganda dos dispositivos eletrônicos para fumar (DEFs). Ainda assim, o uso cresce de forma clandestina. A falta de descarte adequado se torna um novo desafio ambiental.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKkRs0KxYtMgN69-AFfkzP41G3TN7fSo7bTg&usqp=CAU"
              alt="hero template"
              
              height={400}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6t_B9sWSN9KtEuu6BOX6vOlz6bZQmOi9Hrg&usqp=CAU"
              alt="hero template"
              
              height={400}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            
          </div>
        </div>
      ),
    },
    {
      title: "2010–2020",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-10/12">
            Com o aumento do uso entre jovens e a chegada de modelos mais modernos, os cigarros eletrônicos se tornam tendência. No entanto, surgem alertas sobre os danos à saúde, vício e impactos ambientais, especialmente por conta das baterias de lítio e resíduos eletrônicos.
          </p>
          
        </div>
      ),
    },

    {
  title: "2025",
  content: (
    <div className="flex">
      <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200 w-10/12">
        Durante um hackathon em 2025, a Receita Federal promove a reutilização de cigarros eletrônicos apreendidos. Nosso grupo desenvolve o "Repelente Smart", uma solução sustentável que transforma componentes de cigarros eletrônicos em dispositivos repelentes de insetos, reduzindo resíduos e promovendo inovação ambiental.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <img
          src="https://brainwork.com.br/wp-content/uploads/2025/05/1-Hackathon-Receita-Federal.png" // Hackathon collaboration
          alt="Participants collaborating at a hackathon"
          width={290}
          height={349}
          className="ml-7 rounded-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
        />
        
        
      </div>
    </div>
  ),
}
  ];
  return (
    <div className="flex flex-col">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white mt-20">
              Do descarte à inovação <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Repelente Smart
              </span>
            </h1>
          </>
        }
      >
        <Link href={'/ViewDevice'}>
          <img
          src={`/ViewDeviceImg.png`}
          alt="hero"
          height={780}
          width={1870}
          className="mx-auto rounded-2xl h-full w-full"
          draggable={false}
          />
        </Link>
      </ContainerScroll>

      <div className="relative w-full overflow-clip">
        <Timeline data={data} />
      </div>

      <div className="max-w-5xl mx-auto px-8">
        <h1 className="text-2xl">Integrantes</h1>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
export const projects = [
  {
    title: "Tobias Perassi",
    href: "integrantesImg/tobias.jpeg",
    link: "https://stripe.com",
  },
  {
    title: "Luciano Junior",
    href: "integrantesImg/luciano.jpeg",
    link: "https://netflix.com",
  },
  {
    title: "Rafael Pecorari",
    href: "integrantesImg/rafael.jpeg",
    link: "https://google.com",
  },
  {
    title: "Victor Geroto",
    href: "integrantesImg/victor.jpeg",
    link: "https://meta.com",
  },
  {
    title: "José Eduardo Oliveira",
    link: "https://amazon.com",
  },
  {
    title: "Giovani Miamoto",
    link: "https://microsoft.com",
  },
];