"use client";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import curiosities from "../data/fun-facts.json";

export default function FunFacts() {
  const [selected, setSelected] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const nextCard = () => {
    if (selected === null) return;
    setSelected((selected + 1) % curiosities.length);
  };

  const prevCard = () => {
    if (selected === null) return;
    setSelected((selected - 1 + curiosities.length) % curiosities.length);
  };
  console.log(window.screen.width, "window.screenX");

  // const randomized = useMemo(() => {
  //   const maxElementWidth = 192; // en píxeles
  //   const maxX = window.innerWidth > maxElementWidth ? window.innerWidth - maxElementWidth : 0;

  //   return curiosities.map(() => ({
  //     rotate: Math.floor(Math.random() * 90 - 30),
  //     x: Math.floor(Math.random() * maxX), // -600 a 800 px
  //     y: Math.floor(Math.random() * 350 - 100), // -200 a 200 px
  //   }));
  // }, [curiosities]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Función de limpieza para remover el listener cuando el componente se desmonte
    return () => window.removeEventListener("resize", handleResize);
  }, []); // El array vacío asegura que esto se ejecute solo al montar y desmontar

  const randomized = useMemo(() => {
    // Ancho máximo aproximado de tus imágenes (ajusta este valor)
    const maxElementWidth = 192; // px

    // El área segura máxima para 'x'
    const maxX =
      windowWidth > maxElementWidth ? windowWidth - maxElementWidth : 0;

    return curiosities.map(() => ({
      rotate: Math.floor(Math.random() * 90 - 30), // -30° a 30°
      x: Math.floor(Math.random() * maxX - (maxX / 1.8)), // Centrado horizontalmente
      y: Math.floor(Math.random() * 350 - 100), // -100 a 250 px
    }));
  }, [curiosities, windowWidth]);
  return (
    <section className="py-32 bg-red-50 relative">
      <h2 className="text-9xl absolute z-50 font-montserrat w-full mx-auto top-1/3 drop-shadow-black drop-shadow-2xl font-bold text-white-ivory text-center">
        1965
      </h2>

      <div className="relative flex flex-wrap justify-center h-96 gap-6 px-4">
        {curiosities.map((c, i) => {
          const { rotate, x, y } = randomized[i];
          return (
            <motion.div
              key={`id-${i}`}
              className="w-48 h-64 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
              style={{
                rotate: rotate,
                position: "absolute",
                x: x,
                y: y,
              }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: i * 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 50 }}
              onClick={() => setSelected(i)}
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm py-1">
                {c.title}
              </div>
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
              className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full"
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
