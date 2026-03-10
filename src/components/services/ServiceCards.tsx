"use client";

import { motion } from "framer-motion";
import { Wrench, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench,
  RotateCcw,
  ShieldCheck,
};

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  accent: string;
  iconBg: string;
  iconColor: string;
}

export default function ServiceCards({ services }: { services: Service[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
            O que fazemos
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
            Os Nossos Especialistas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-8 cursor-default overflow-hidden transition-all duration-300"
              >
                {/* Top accent line */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accent}`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 + 0.3 }}
                  style={{ transformOrigin: "left" }}
                />

                {/* Icon */}
                <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  {Icon && <Icon className={`w-8 h-8 ${service.iconColor}`} />}
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2.5">
                  {service.features.map((feat, fIdx) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.15 + fIdx * 0.07 + 0.4 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feat}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
