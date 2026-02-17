"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineItem {
  step: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  items: TimelineItem[];
}

export function ProcessTimeline({ items }: ProcessTimelineProps) {
  return (
    <section className="py-20 bg-background-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">
            Processo Simples
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-black text-foreground">
            Como Funciona
          </h2>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, idx) => {
            const ref = useRef<HTMLDivElement>(null);
            const isInView = useInView(ref, { once: true, margin: "-100px" });
            
            return (
              <motion.div
                key={item.step}
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="flex gap-6 items-start"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 cursor-pointer"
                  >
                    {item.step}
                  </motion.div>
                  {idx < items.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 + 0.4 }}
                      className="w-0.5 h-12 bg-gray-200 mt-2"
                      style={{ transformOrigin: "top" }}
                    />
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                  className="pb-4"
                >
                  <h3 className="font-bold text-lg text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
