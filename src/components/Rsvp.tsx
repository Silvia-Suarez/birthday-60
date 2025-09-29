import confetti from "canvas-confetti";
import { useEffect } from "react";
import { motion } from "motion/react";

const Rsvp = () => {
  useEffect(() => {
    const celebrateBtn = document.getElementById("celebrateBtn");

    if (celebrateBtn) {
      celebrateBtn.addEventListener("click", () => {
        // button animation
        celebrateBtn.style.transform = "scale(0.95)";
        setTimeout(() => {
          celebrateBtn.style.transform = "scale(1)";
        }, 100);
      });
    }
  }, []);
  return (
    <section className="relative py-20 font-montserrat overflow-hidden bg-gradient-to-b from-soft-pink via-white/40 to-soft-pink">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute w-64 h-64 bg-gold/20 rounded-full blur-3xl -top-16 -left-8" />
        <div className="absolute w-72 h-72 bg-deep-blue/10 rounded-full blur-3xl -bottom-24 -right-8" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl rounded-3xl px-8 py-10 md:px-12 md:py-12 text-deep-blue"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-dancing text-center text-deep-blue">
          ¡Te esperamos!
        </h2>
        <p className="mt-3 text-base md:text-lg text-deep-blue/80 text-center">
          Toca el botón para confirmar tu asistencia
        </p>

        <div className="mt-8 flex justify-center">
          <motion.button
            id="celebrateBtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              confetti({
                particleCount: 120,
                spread: 75,
                origin: { y: 0.6 },
              });
              window.location.href =
                "https://wa.me/+573147105676?text=Confirmo%20mi%20asistencia%20al%20cumpleaños";
            }}
            className="group relative px-8 py-4 rounded-full text-lg md:text-xl font-bold text-deep-blue bg-gold shadow-[0_10px_30px_rgba(255,215,0,0.4)] focus:outline-none focus:ring-4 focus:ring-gold/50"
          >
            <span className="mr-2">❤️</span> ¡Allá estaré!
            <span className="absolute inset-0 rounded-full ring-2 ring-white/60 opacity-0 group-hover:opacity-100 transition" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Rsvp;
