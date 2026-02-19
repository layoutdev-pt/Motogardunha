"use client";

import { BRANDS } from "@/lib/constants";
import SearchBar from "@/components/ui/SearchBar";

export default function HeroSection() {
  return (
    <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      {/* Background video */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80')"
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80"
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source
            src="/videos/hero/3936775-hd_1280_720_50fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-[#0F0F11]/60 to-[#0F0F11]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-center h-full pb-32">
        {/* Logo */}
        <div className="mb-0 mt-32 flex justify-center w-full">
          <img
            src="/images/branding/white_logo.svg"
            alt="Motogardunha"
            className="w-full max-w-[550px] h-auto"
          />
        </div>

        {/* Tagline */}
        <p className="text-white/80 text-sm md:text-base font-light tracking-widest mb-10">
          desde 1993
        </p>

        {/* Search bar */}
        <div className="w-full max-w-[550px] mx-auto mb-12">
          <SearchBar
            variant="hero"
            placeholder="Pesquisar por Marca, Modelo ou Estilo..."
          />
        </div>

        <div className="flex justify-center space-x-6 text-sm text-gray-400">
          <a
            className="hover:text-white border-b border-transparent hover:border-white transition-all pb-0.5"
            href="/stand"
          >
            Encontrar a Minha Moto
          </a>
          <span className="text-primary">•</span>
          <a
            className="hover:text-white border-b border-transparent hover:border-white transition-all pb-0.5"
            href="/contactos"
          >
            Agendar Test-Drive
          </a>
        </div>
      </div>

      {/* Brand bar - Infinite Scrolling Carousel */}
      <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm border-t border-white/5 py-6 overflow-hidden">
        <div className="relative w-full">
          <div className="flex animate-scroll-left">
            {/* First set of logos */}
            {[
              { name: "Aprilia", logo: "/images/partners/aprilia.png" },
              { name: "Kawasaki", logo: "/images/partners/Kawasaki-2024-Logo-Vector.svg- (1).png" },
              { name: "Piaggio", logo: "/images/partners/Piaggio-Motorcycle-Logo.png" },
              { name: "Moto Guzzi", logo: "/images/partners/moto-guzzi-100-years-logo-F9C81E40D7-seeklogo.com_.png" },
              { name: "Segway", logo: "/images/partners/segway logo.png" },
              { name: "Vespa", logo: "/images/partners/vespa-7-logo-black-and-white.png" },
              { name: "Zontes", logo: "/images/partners/Zontes_Brand_2019_white.png" },
              { name: "Polaris", logo: "/images/partners/Polaris-Logo.png" },
              { name: "Can-Am", logo: "/images/partners/can-am logo.png", invert: true },
              { name: "Morbidelli", logo: "/images/partners/morbidelli-footer.png" },
              { name: "UM", logo: "/images/partners/um logo.png" },
            ].map((brand, index) => (
              <img
                key={`${brand.name}-1-${index}`}
                src={brand.logo}
                alt={brand.name}
                className={`h-8 md:h-10 w-auto object-contain flex-shrink-0 mx-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${brand.invert ? 'invert' : ''}`}
              />
            ))}
            {/* Duplicate set for seamless loop */}
            {[
              { name: "Aprilia", logo: "/images/partners/aprilia.png" },
              { name: "Kawasaki", logo: "/images/partners/Kawasaki-2024-Logo-Vector.svg- (1).png" },
              { name: "Piaggio", logo: "/images/partners/Piaggio-Motorcycle-Logo.png" },
              { name: "Moto Guzzi", logo: "/images/partners/moto-guzzi-100-years-logo-F9C81E40D7-seeklogo.com_.png" },
              { name: "Segway", logo: "/images/partners/segway logo.png" },
              { name: "Vespa", logo: "/images/partners/vespa-7-logo-black-and-white.png" },
              { name: "Zontes", logo: "/images/partners/Zontes_Brand_2019_white.png" },
              { name: "Polaris", logo: "/images/partners/Polaris-Logo.png" },
              { name: "Can-Am", logo: "/images/partners/can-am logo.png", invert: true },
              { name: "Morbidelli", logo: "/images/partners/morbidelli-footer.png" },
              { name: "UM", logo: "/images/partners/um logo.png" },
            ].map((brand, index) => (
              <img
                key={`${brand.name}-2-${index}`}
                src={brand.logo}
                alt={brand.name}
                className={`h-8 md:h-10 w-auto object-contain flex-shrink-0 mx-8 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${brand.invert ? 'invert' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
