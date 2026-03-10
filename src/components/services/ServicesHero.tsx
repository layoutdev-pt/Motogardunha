"use client";

import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <div className="relative h-[50vh] min-h-[380px] overflow-hidden bg-gray-900">
      <img
        alt="Oficina Motogardunha"
        className="w-full h-full object-cover opacity-30"
        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      {/* Red accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary font-bold text-sm tracking-widest uppercase mb-3"
        >
          Serviços Premium
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-6xl text-white mb-4 uppercase"
        >
          Os Nossos Serviços
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-gray-300 text-lg max-w-xl"
        >
          Da manutenção ao restauro completo, cuidamos da sua moto como se fosse nossa.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 h-0.5 w-24 bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
