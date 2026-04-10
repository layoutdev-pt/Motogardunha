import Hotspots from "./Hotspots";
import Image from "next/image";
import { RichSection } from "@/types";
import SliderGallery from "./SliderGallery";

export default function RichSectionRenderer({ section }: { section: RichSection }) {
  
  // 1. Agrupamos text_image e text_video para usar a mesma estrutura visual
  if (section.type === "text_image" || section.type === "text_video") {
    
    // Verifica se é vídeo baseado no tipo ou na extensão do arquivo (caso você mande no json)
    // Assume que a URL pode vir em section.video ou section.image
    const mediaUrl = section.video || section.image; 
    const isVideo = section.type === "text_video" || (mediaUrl && mediaUrl.endsWith('.mp4'));

    return (
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${section.reversed ? 'md:flex-row-reverse' : ''}`}>
            
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {section.description}
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)]">
                {mediaUrl && (
                  isVideo ? (
                    /* Renderiza tag de Vídeo se for vídeo */
                    <video
                      src={mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    /* Renderiza Next Image se for imagem */
                    <Image
                      src={mediaUrl}
                      alt={section.title || "Imagem de destaque"}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (section.type === "gallery" && section.items && section.items.length >= 3) {
    return (
      <div className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 relative h-[300px] md:h-full rounded-2xl overflow-hidden group shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
              <Image src={section.items[0]} alt="Galeria 1" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            </div>
            
            <div className="flex flex-col gap-4 h-[600px] md:h-full">
              <div className="relative flex-1 rounded-2xl overflow-hidden group shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
                <Image src={section.items[1]} alt="Galeria 2" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="relative flex-1 rounded-2xl overflow-hidden group shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
                <Image src={section.items[2]} alt="Galeria 3" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (section.type === "hotspots" && section.items) {
    return (
      <Hotspots
        title={section.title}
        image={section.image || ""}
        items={section.items}
      />
    );
  }

  if (section.type === "slider" && section.items) {
    return <SliderGallery items={section.items} />;
  }

  return null;
}