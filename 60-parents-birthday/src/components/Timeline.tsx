"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import photo1 from "../assets/images/IMG-20201217-WA0050.jpg";
import photo2 from "../assets/images/Papas-nonos.jpg";
import photo3 from "../assets/images/Familia2.jpg";
import photo4 from "../assets/images/7.jpg";
import photo5 from "../assets/images/4.jpg";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    year: "1965",
    imgRoute: photo1,
    text: "Nacieron dos estrellas que iluminarían la vida de muchos.",
  },
  {
    year: "1992",
    imgRoute: photo2,
    text: "El destino los juntó y nació una historia de amor.",
  },
  {
    year: "2005",
    imgRoute: photo3,
    text: "Aventuras, hijos, familia y recuerdos que llenan el corazón.",
  },
  {
    year: "2015",
    imgRoute: photo4,
    text: "Años de viajes, trabajo duro y logros compartidos.",
  },
  {
    year: "2025",
    imgRoute: photo5,
    text: "¡60 años de vida, amor y alegría que queremos celebrar contigo!",
  },
];

const Timeline = () => {
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");

    cards.forEach((card, i) => {
      const multiplier = i % 2 ? -1 : 1;
      gsap.fromTo(
        card,
        { x: 200 * multiplier, rotate: 10 * multiplier, opacity: 0 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 100%",
            end: "bottom 60%",
            scrub: true,
            markers: false,
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-white-ivory py-16 text-center">
      <h2 className="text-6xl font-dancing text-deep-blue mb-10">
        Su historia 📖
      </h2>
      <div className="flex flex-col gap-12 max-w-3xl mx-auto">
        {events.map((e, i) => (
          <div
            key={i}
            className="timeline-card flex flex-col items-center gap-4 bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-3xl font-poppins font-bold text-coral">{e.year}</h3>
            <img
              src={e.imgRoute}
              alt="Foto de los cumpleañeros"
              className="w-96 h-full rounded-3xl border-4 border-gold shadow-lg"
            />
            <p className="text-deep-blue font-montserrat">{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
