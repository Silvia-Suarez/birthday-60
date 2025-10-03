// src/components/TimelineStacked.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import photo1 from "../assets/images/IMG-20201217-WA0050.jpg";
import photo2 from "../assets/images/Papas-nonos.jpg";
import photo3 from "../assets/images/Familia2.jpg";
import photo4 from "../assets/images/7.jpg";
import photo5 from "../assets/images/2.jpg";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: "1965", img: photo1, text: "Nacieron dos estrellas que iluminarían la vida de muchos" },
  { year: "1992", img: photo2, text: "El destino los juntó y nació una historia de amor" },
  { year: "2005", img: photo3, text: "Construyeron juntos un hogar, llegaron los hijos y con ellos nuevas aventuras." },
  { year: "2015", img: photo4, text: "Años de viajes, trabajo duro y logros compartidos." },
  { year: "2025", img: photo5, text: "El gran año: ¡celebramos 60 años de vida, amor y alegría!" },
];

export default function TimelineStacked() {
  const pinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
    gsap.set(cards, { autoAlpha: 0, y: 80, scale: 0.98 });

    cards.forEach((c, i) => gsap.set(c, { zIndex: i + 1 }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinEl,
        start: "top top",
        end: `+=${window.innerHeight * cards.length}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    const perCard = 1;
    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: perCard,
          ease: "power3.out",
        },
        i * perCard
      );
    });

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section className="relative bg-red-100 pb-12 text-center">
      <div style={{ height: `${events.length * 120}vh` }}>
        <div
          ref={pinRef}
          className="timeline-pin sticky top-0 h-screen flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex flex-col align-middle h-screen justify-center">
              <h2 className="z-0 text-7xl font-bold font-dancing text-deep-blue">
                Su historia
              </h2>
            </div>
            {events.map((e, i) => (
              <article
                key={i}
                className="timeline-card absolute w-full lg:w-[420px] bg-white rounded-2xl shadow-2xl p-6 text-center"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <h3 className="text-2xl font-semibold text-coral mb-4">
                  {e.year}
                </h3>
                <img
                  src={e.img}
                  alt={e.year}
                  className="mx-auto w-[340px] h-auto rounded-xl object-cover border-4 border-gold shadow-lg mb-4"
                />
                <p className="text-deep-blue">{e.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
