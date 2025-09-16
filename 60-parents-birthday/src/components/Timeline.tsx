const events = [
  { year: "1965", text: "Nacieron dos estrellas que iluminarían la vida de muchos.", img: "/images/1965.jpg" },
  { year: "1985", text: "El destino los juntó y nació una historia de amor.", img: "/images/1985.jpg" },
  { year: "1990s", text: "Aventuras, hijos, familia y recuerdos que llenan el corazón.", img: "/images/1990s.jpg" },
  { year: "2025", text: "¡60 años de vida, amor y alegría que queremos celebrar contigo!", img: "/images/2025.jpg" },
];

const Timeline = () => {
  return (
    <section className="bg-white-ivory py-16 text-center">
      <h2 className="text-3xl font-playfair text-deep-blue mb-10">
        📖 Nuestra historia en 4 capítulos
      </h2>
      <div className="flex flex-col gap-8 md:gap-12 max-w-3xl mx-auto">
        {events.map((e, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <img src={e.img} alt={e.year} className="w-32 h-32 rounded-full border-4 border-gold object-cover" />
            <h3 className="text-xl font-bold text-coral">{e.year}</h3>
            <p className="text-deep-blue font-montserrat">{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
