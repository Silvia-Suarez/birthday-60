import { useState } from "react";
import { motion } from "motion/react";
import "./PartyDetails.css";

const PartyDetails = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });


  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;
    setPos({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });
  };

  return (
    <>
      <section
        className="relative py-16 party-section bg-deep-blue flex justify-center items-center"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        style={
          {
            "--x": `${pos.x}px`,
            "--y": `${pos.y}px`,
          } as React.CSSProperties
        }
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="sparkle sparkle1"></div>
          <div className="sparkle sparkle2"></div>
          <div className="sparkle sparkle3"></div>
        </div>

        <motion.div
          className="relative w-[90%] max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white-ivory font-poppins shadow-2xl party-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-7xl font-bold font-dancing mb-8 text-center text-gold">
            La gran celebración
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-xl text-center md:text-left">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[130px] font-bold text-coral">03</p>
              <p className="uppercase tracking-wide">Noviembre</p>
              <p className="text-lg">Domingo</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>
                🕖 <span className="font-semibold">Hora:</span> 8:00 PM
              </p>
              <p>
                📍 <span className="font-semibold">Lugar:</span> San Martin,
                Cesar
              </p>
              <p>
                🥂 <span className="font-semibold">Habrá:</span> música, baile,
                comida deliciosa y muchas sorpresas
              </p>
              <p>
                👔 <span className="font-semibold">Dress code:</span> ¡Alegría
                obligatoria!
              </p>
            </div>
          </div>
        </motion.div>
        <div className="overlay"></div>
      </section>
    </>
  );
};

export default PartyDetails;
