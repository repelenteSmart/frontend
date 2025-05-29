import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-black">
        <Image 
          src="/logo.svg"
          alt="Logo do Repelente Inteligente" 
          width={500}  // Defina a largura desejada
          height={400} // Defina a altura desejada
          priority    // Opcional: carrega com prioridade se for a imagem principal
        />
        <h1 className="text-7xl font-montserrat-alt font-light text-white">Repelente Smart</h1>
      </div>
      <div>
        <h1>Sobre o projeto</h1>
        <h1>Sobre nós</h1>
      </div>
      
      
    </div>
  );
}
