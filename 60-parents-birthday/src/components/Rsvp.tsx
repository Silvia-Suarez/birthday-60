import confetti from "canvas-confetti";
import { useEffect } from "react";

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
    <section className="bg-soft-pink py-16 font-montserrat text-center">
      <h2 className="text-5xl font-bold text-deep-blue mb-6">
        ¡Te esperamos!
        <p className="text-base pt-2">
          Haz clic en el botón para confirmar tu asistencia
        </p>
      </h2>
      <button
        id="celebrateBtn"
        onClick={() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          window.location.href =
            "https://wa.me/+573147105676?text=Confirmo%20mi%20asistencia%20al%20cumpleaños";
        }}
        className="px-6 py-3 bg-gold text-deep-blue font-bold text-lg rounded-full shadow-md hover:bg-deep-blue hover:text-gold transition"
      >
        ❤️ ¡Allá estaré!
      </button>
    </section>
  );
};

export default Rsvp;
