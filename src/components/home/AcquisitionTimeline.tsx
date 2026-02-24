"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Eye, CheckCircle, FileText, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Descobrir & Visitar",
    description: "Visite o stand, sinta as vibrações e encontre a sua futura máquina.",
    icon: Eye,
    color: "from-red-500 to-red-700",
    glow: "shadow-red-500/30",
  },
  {
    number: "02",
    title: "Inspeção Final",
    description: "Preparamos e inspecionamos para garantir qualidade e segurança máximas.",
    icon: CheckCircle,
    color: "from-orange-500 to-red-600",
    glow: "shadow-orange-500/30",
  },
  {
    number: "03",
    title: "Documentação",
    description: "Tratamos de toda a documentação e legalização de forma rápida.",
    icon: FileText,
    color: "from-red-600 to-rose-700",
    glow: "shadow-rose-500/30",
  },
  {
    number: "04",
    title: "Estrada à Frente",
    description: "A chave é sua. Arranque e comece a escrever a sua história.",
    icon: Zap,
    color: "from-red-500 to-orange-600",
    glow: "shadow-red-600/30",
  },
];

export function AcquisitionTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-red-500 font-semibold text-xs uppercase tracking-[0.2em] mb-3 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5"
          >
            Processo Simplificado
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            A Sua Moto em{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              4 Passos
            </span>
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              className="h-full bg-gradient-to-r from-red-600/20 via-red-500 to-red-600/20"
              style={{ transformOrigin: "left" }}
            />
          </div>

          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isActive={activeStep === index}
              onHover={setActiveStep}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  isActive,
  onHover,
}: {
  step: typeof steps[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative flex flex-col items-center text-center group cursor-default"
    >
      {/* Step number bubble */}
      <motion.div
        animate={isActive ? { scale: 1.15, y: -4 } : { scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.glow} mb-5 z-10`}
      >
        {/* Pulse ring */}
        {isActive && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color}`}
          />
        )}
        <Icon className="w-8 h-8 text-white relative z-10" />

        {/* Step number badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center">
          <span className="text-[10px] font-bold text-red-400">{step.number}</span>
        </div>
      </motion.div>

      {/* Connector dot for mobile */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12 + 0.3 }}
          className="md:hidden w-px h-6 bg-gradient-to-b from-red-500/60 to-transparent mb-1"
          style={{ transformOrigin: "top" }}
        />
      )}

      {/* Text content */}
      <motion.div
        animate={isActive ? { y: -2 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-red-400 transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-300 px-2">
          {step.description}
        </p>
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3 }}
        className={`mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r ${step.color}`}
      />
    </motion.div>
  );
}
