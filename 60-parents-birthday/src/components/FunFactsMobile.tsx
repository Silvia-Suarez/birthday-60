"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import curiosities from "../data/fun-facts.json";

export default function FunFacts() {
  const [selected, setSelected] = useState<number | null>(null);

  const nextCard = () => {
    if (selected === null) return;
    setSelected((selected + 1) % curiosities.length);
  };

  const prevCard = () => {
    if (selected === null) return;
    setSelected((selected - 1 + curiosities.length) % curiosities.length);
  };

  return (
    <section className="py-16 bg-white-ivory relative md:hidden">
      <h2 className="text-4xl font-dancing text-deep-blue text-center mb-12">
        Datos curiosos de 1965
      </h2>

      <div className="flex relative py-10 overflow-x-auto justify-center">
        {curiosities.map((c, i) => {
          // const rotation = [-12, -6, -3, 4, 8][i % 5];

          return (
            <motion.div
              key={i}
              className="h-64 bg-white rounded-xl shadow-lg border-4 border-gold"
              // style={{ rotate: rotation }}
              // whileHover={{ rotate: 0, scale: 1.05, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setSelected(i)}
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover"
              />
              {/* <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm py-1">
                {c.title}
              </div> */}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={curiosities[selected].title}
              className="relative bg-white rounded-2xl shadow-2xl p-6 m-6 w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                onClick={() => setSelected(null)}
              >
                <X size={28} />
              </button>

              <img
                src={curiosities[selected].img}
                alt={curiosities[selected].title}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />

              <h3 className="text-xl font-bold text-coral mb-2">
                {curiosities[selected].title}
              </h3>
              <p className="text-deep-blue">{curiosities[selected].text}</p>

              <div className="flex justify-between mt-6">
                <button
                  onClick={prevCard}
                  className="bg-coral text-white p-2 rounded-full hover:bg-gold hover:text-deep-blue"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextCard}
                  className="bg-coral text-white p-2 rounded-full hover:bg-gold hover:text-deep-blue"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
