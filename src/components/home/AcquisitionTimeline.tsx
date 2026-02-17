"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, CheckCircle, CreditCard, Zap } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Descobrir & Visitar",
    description: "Visite o stand, sinta as vibrações. Uma visita prévia para tornar a sua futura máquina sua.",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    number: "02",
    title: "Inspeção Final",
    description: "Preparamos e apresentamos. Inspeção final para garantir máxima qualidade e segurança.",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    number: "03",
    title: "Financiamento Fácil",
    description: "Tratamos da documentação e trabalhamos na legalização do financiamento de forma transparente.",
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    number: "04",
    title: "Estrada à Frente",
    description: "A chave é sua. Arranque e comece a escrever a sua história nas estradas.",
    icon: <Zap className="w-6 h-6" />,
  },
];

export function AcquisitionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-zinc-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
            Processo Simplificado
          </span>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-zinc-900">
            A Sua Moto em 4 Passos Simples
          </h2>
          <p className="text-zinc-600 text-lg">
            Como Adquirir a Sua Moto
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
          {/* Desktop Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-600 transform -translate-x-1/2 hidden md:block"
            style={{ transformOrigin: "top" }}
          />

          {/* Mobile Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-600 md:hidden" />

          {/* Timeline Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.number}
                step={step}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// TimelineStep Component
function TimelineStep({
  step,
  index,
  isLeft,
}: {
  step: Step;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex items-center"
    >
      {/* Desktop Layout - Alternating */}
      <div className="hidden md:flex w-full items-center">
        {isLeft ? (
          <>
            {/* Left Side - Card */}
            <div className="w-1/2 pr-12 flex justify-end">
              <StepCard step={step} />
            </div>
            {/* Center - Circle */}
            <div className="flex-shrink-0">
              <StepCircle number={step.number} />
            </div>
            {/* Right Side - Empty */}
            <div className="w-1/2 pl-12" />
          </>
        ) : (
          <>
            {/* Left Side - Empty */}
            <div className="w-1/2 pr-12" />
            {/* Center - Circle */}
            <div className="flex-shrink-0">
              <StepCircle number={step.number} />
            </div>
            {/* Right Side - Card */}
            <div className="w-1/2 pl-12">
              <StepCard step={step} />
            </div>
          </>
        )}
      </div>

      {/* Mobile Layout - Single Column */}
      <div className="flex md:hidden w-full items-start gap-4">
        <StepCircle number={step.number} isMobile />
        <div className="flex-1 pt-2">
          <StepCard step={step} />
        </div>
      </div>
    </motion.div>
  );
}

// StepCircle Component
function StepCircle({ 
  number, 
  isMobile = false 
}: { 
  number: string;
  isMobile?: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ scale: 1.1 }}
      className={`${isMobile ? "w-16 h-16" : "w-20 h-20"} flex-shrink-0 rounded-full bg-white border-4 border-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 relative z-10 cursor-pointer transition-all duration-300 hover:border-[6px]`}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-red-600`}
      >
        {number}
      </motion.span>
    </motion.div>
  );
}

// StepCard Component
function StepCard({ step }: { step: Step }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 group max-w-md w-full"
    >
      {/* Icon Circle */}
      <motion.div 
        whileHover={{ rotate: 5, scale: 1.05 }}
        className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4 transition-transform duration-300"
      >
        {step.icon}
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-zinc-900 mb-3">
        {step.title}
      </h3>
      <p className="text-zinc-600 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}
