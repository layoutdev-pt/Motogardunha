// src/app/familia/[slug]/page.tsx
import { getAllMotorcycles } from "@/lib/data/motorcycles";
import { getFamilyBySlug } from "@/lib/data/families";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { X } from "lucide-react";
import Hotspots from "@/components/stand/premium/Hotspots";

// 1. Adicionamos o 'async' e alteramos a tipagem do params para Promise
export default async function FamilyPage({ params }: { params: Promise<{ slug: string }> }) {
  // 2. Fazemos o destructuring com 'await'
  const { slug } = await params;
  
  const family = getFamilyBySlug(slug);
  
  if (!family) notFound();

  // Filtra as versões correspondentes na base de dados de motas principal
  const versions = getAllMotorcycles().filter(m => m.brand === family.brand && m.name.includes(family.name));

  return (
    <div className="bg-white min-h-screen pt-24 relative z-0">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[70vh] w-full bg-zinc-950 flex items-center justify-center overflow-hidden">
        <Image src={family.hero_image} alt={family.name} fill className="object-cover opacity-60" priority />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-display font-black text-white uppercase tracking-tight mb-4">
            {family.name}
          </h1>
          <p className="text-xl md:text-2xl text-white font-medium uppercase tracking-widest">
            {family.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-xl text-gray-600 leading-relaxed font-medium">{family.description}</p>
      </div>

      {/* 2. SECÇÃO DE VERSÕES (Ligação ao Stand) */}
      <div className="bg-zinc-50 py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-black text-zinc-900 mb-2">Descobre as versões</h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-12">Escolhe a tua motorização</p>

          <div className="flex flex-wrap justify-center gap-8">
            {versions.map((version) => (
              <Link key={version.id} href={`/stand/${version.slug}`} className="group w-72 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-40 mb-6">
                  <Image src={version.cover_image} alt={version.name} fill className="object-contain group-hover:scale-105 transition-transform" />
                </div>
                {version.rich_content?.colors && (
                  <div className="flex justify-center gap-1.5 mb-4">
                    {version.rich_content.colors.map((c: any, i: number) => (
                      <div key={i} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} title={c.name} />
                    ))}
                  </div>
                )}
                <h3 className="font-bold text-primary group-hover:text-primary-dark transition-colors mb-1">{version.name}</h3>
                <p className="text-zinc-900 font-bold">{formatPrice(version.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BLOCOS FLEXÍVEIS (Lidos do JSON) */}
      {family.blocks?.map((block: any, index: number) => {
        
        // Renderizador: Feature Standard (Metade Imagem / Metade Texto)
        if (block.type === 'feature') {
          return (
            <div key={index} className={`max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="group w-full md:w-1/2 relative h-[350px] sm:h-[450px] rounded-3xl bg-zinc-50 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer overflow-hidden">
                <Image src={block.image} alt={block.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />              </div>
              <div className="w-full md:w-1/2 space-y-5 px-4 sm:px-0">
                <h3 className="text-4xl sm:text-5xl font-display font-black text-zinc-900 tracking-tight">{block.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{block.description}</p>
              </div>
            </div>
          );
        }

        // Renderizador: Full-Width Background (Para Piaggio 1, etc.)
        if (block.type === 'fullwidth') {
          return (
            <div key={index} className="w-full py-24 px-6 flex items-center" style={{ backgroundColor: block.bg_color || '#1A1A1A' }}>
               <div className={`max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 space-y-4 text-white">
                    <h3 className="text-4xl font-display font-black">{block.title}</h3>
                    <p className="text-lg opacity-90 leading-relaxed">{block.description}</p>
                  </div>
                  <div className="group w-full md:w-1/2 relative h-[400px]">
                    <Image src={block.image} alt={block.title} fill className="object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>
               </div>
            </div>
          );
        }

        // Renderizador: Hotspots Globais (Reutiliza o componente Premium)
        if (block.type === 'hotspots') {
          return <Hotspots key={index} title={block.title} image={block.image} items={block.items} />;
        }

        // Renderizador: Galeria Mosaico (Grid)
        if (block.type === 'gallery') {
          return (
             <div key={index} className="max-w-7xl mx-auto px-6 py-20">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {block.items.map((img: string, i: number) => (
                    <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'}`}>
                      <Image src={img} alt="Galeria" fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
               </div>
             </div>
          );
        }

        // Renderizador: Slider Lifestyle (Carrossel Horizontal)
        if (block.type === 'slider') {
          return (
            <div key={index} className="w-full py-20 overflow-hidden bg-zinc-950">
               {block.title && (
                 <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-12 text-center">
                   {block.title}
                 </h3>
               )}
               <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory px-6 md:px-20 scrollbar-hide">
                 {block.items.map((img: string, i: number) => (
                    <div key={i} className="relative w-[85vw] md:w-[800px] h-[300px] md:h-[500px] flex-shrink-0 snap-center rounded-2xl overflow-hidden">
                      <Image src={img} alt="Lifestyle" fill className="object-cover" />
                    </div>
                 ))}
               </div>
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
}